/**
 * Fetches current AMD exchange rates from Ameriabank's public rates page
 * and writes them to rates.json at the repo root.
 *
 * Run by .github/workflows/update-rates.yml on a schedule. The client app
 * (js/calculator.js) fetches rates.json from its own origin at runtime,
 * which avoids the CORS restriction on ameriabank.am.
 */

const fs = require('fs');
const path = require('path');

const SOURCE_URL = 'https://ameriabank.am/en/exchange-rates';

// Currencies the app supports, mapped to their row label in the source table
const TRACKED_CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP'];

// One row looks like:
// <tr class="Item"><td align="center">USD</td><td align="right">360.50</td>
// <td align="right">365.50</td><td align="right">360.50</td><td align="right">365.50</td></tr>
// Columns are: currency, cash buy, cash sell, non-cash buy, non-cash sell.
const ROW_PATTERN = /<tr class="Item">\s*<td align="center">([A-Z]{3})<\/td>\s*<td align="right">([^<]*)<\/td>\s*<td align="right">([^<]*)<\/td>\s*<td align="right">([^<]*)<\/td>\s*<td align="right">([^<]*)<\/td>/g;

function parseCell(raw) {
    const cleaned = raw.replace(/&nbsp;/g, '').trim();
    if (!cleaned) return null;
    const value = parseFloat(cleaned);
    return Number.isFinite(value) ? value : null;
}

function parseRates(html) {
    const rates = {};
    let match;

    while ((match = ROW_PATTERN.exec(html)) !== null) {
        const [, currency, cashBuy, cashSell, nonCashBuy, nonCashSell] = match;
        if (!TRACKED_CURRENCIES.includes(currency)) continue;

        // Prefer non-cash (transfer) rates since salaries are paid by transfer;
        // fall back to cash rates if non-cash is missing for that currency.
        const buy = parseCell(nonCashBuy) ?? parseCell(cashBuy);
        const sell = parseCell(nonCashSell) ?? parseCell(cashSell);

        if (buy !== null && sell !== null) {
            rates[currency] = { buy, sell };
        }
    }

    return rates;
}

async function main() {
    console.log(`Fetching ${SOURCE_URL} ...`);
    const response = await fetch(SOURCE_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; salary-calc-rate-fetcher/1.0)' }
    });

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const rates = parseRates(html);

    const missing = TRACKED_CURRENCIES.filter(c => !rates[c]);
    if (missing.length > 0) {
        throw new Error(`Could not parse rates for: ${missing.join(', ')}. Source page structure may have changed.`);
    }

    rates.AMD = { buy: 1, sell: 1 };

    const output = {
        lastUpdated: new Date().toISOString(),
        source: SOURCE_URL,
        rateType: 'non-cash',
        rates
    };

    const outPath = path.join(__dirname, '..', 'rates.json');
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
    console.log('Wrote', outPath);
    console.log(JSON.stringify(output, null, 2));
}

main().catch(err => {
    console.error('Failed to update rates:', err.message);
    process.exit(1);
});
