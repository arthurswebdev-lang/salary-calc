/**
 * Salary Calculator - Calculation Logic
 * Handles all salary calculations and exchange rates
 */

/**
 * Exchange Rate Manager
 * Fetches and caches exchange rates from Ameriabank
 */
class ExchangeRateManager {
    constructor() {
        this.rates = {
            USD: { buy: null, sell: null },
            EUR: { buy: null, sell: null },
            RUB: { buy: null, sell: null },
            GBP: { buy: null, sell: null },
            AMD: { buy: 1, sell: 1 } // Base currency
        };
        this.lastUpdated = null;
        this.updateInterval = 3600000; // 1 hour cache
    }

    /**
     * Fetch exchange rates from Ameriabank
     * TODO: Implement actual API call or web scraping
     * Currently returns mock data - replace with real implementation
     */
    async fetchRates() {
        try {
            // TODO: Replace with actual API call to Ameriabank
            // For now, returning cached rates
            // Real implementation would fetch from: https://ameriabank.am/en/exchange-rates

            console.log('📊 Fetching exchange rates from Ameriabank...');

            // Mock data - TODO: Replace with actual data
            this.rates = {
                USD: {
                    buy: 363.50,
                    sell: 368.50
                },
                EUR: {
                    buy: 395.00,
                    sell: 405.00
                },
                RUB: {
                    buy: 3.80,
                    sell: 4.20
                },
                GBP: {
                    buy: 455.00,
                    sell: 465.00
                },
                AMD: {
                    buy: 1,
                    sell: 1
                }
            };

            this.lastUpdated = new Date();
            console.log('✅ Exchange rates updated:', this.rates);
            return this.rates;
        } catch (error) {
            console.error('❌ Error fetching exchange rates:', error);
            return null;
        }
    }

    /**
     * Get exchange rate for a specific currency pair
     * @param {string} from - Source currency (e.g., 'USD')
     * @param {string} to - Target currency (e.g., 'AMD')
     * @param {boolean} isSell - Use sell rate if true, buy rate if false
     * @returns {number} Exchange rate
     */
    getRate(from, to, isSell = false) {
        if (from === to) return 1;

        const fromRate = this.rates[from];
        const toRate = this.rates[to];

        if (!fromRate || !toRate) {
            console.warn(`Exchange rate not found for ${from} or ${to}`);
            return null;
        }

        const rateKey = isSell ? 'sell' : 'buy';
        const rate = fromRate[rateKey];

        if (rate === null || rate === undefined) {
            console.warn(`Rate not available for ${from} (${rateKey})`);
            return null;
        }

        // If both are base currency (AMD)
        if (from === 'AMD' && to === 'AMD') return 1;

        // From AMD to other currency
        if (from === 'AMD') {
            return 1 / toRate[rateKey];
        }

        // To AMD from other currency
        if (to === 'AMD') {
            return fromRate[rateKey];
        }

        // Between two non-AMD currencies
        return fromRate[rateKey] / toRate[rateKey];
    }

    /**
     * Convert amount from one currency to another
     * @param {number} amount - Amount to convert
     * @param {string} from - Source currency
     * @param {string} to - Target currency
     * @param {boolean} isSell - Use sell rate
     * @returns {number} Converted amount
     */
    convert(amount, from, to, isSell = false) {
        const rate = this.getRate(from, to, isSell);
        if (rate === null) return null;
        return amount * rate;
    }
}

/**
 * Salary Calculator
 * Main calculation engine for salary computations
 */
class SalaryCalculator {
    constructor(exchangeRates) {
        this.exchangeRates = exchangeRates;
    }

    /**
     * Calculate average gross monthly salary
     * Converts input salary to average monthly gross amount
     *
     * @param {number} salary - Input salary amount
     * @param {string} period - Input period: 'hour', 'month', 'year'
     * @param {array} taxes - Array of tax objects (currently for reference, not applied to gross)
     * @param {string} currency - Input currency code
     * @param {string} showInCurrency - Display/result currency code
     * @returns {number} Average gross monthly salary in display currency
     */
    calculateAverageGrossMonthlySalary(salary, period, taxes, currency, showInCurrency) {
        console.log('💰 Calculating average gross monthly salary:', { salary, period, taxes: taxes?.length, currency, showInCurrency });

        // Use reusable function to convert to monthly
        const grossMonthlySalary = this.convertSalaryPeriod(salary, period, 'month');
        console.log(`  📊 Gross monthly salary: ${grossMonthlySalary.toFixed(2)} ${currency}`);

        // Convert to display currency
        const result = this.convertToCurrency(grossMonthlySalary, currency, showInCurrency);
        console.log(`  ✅ Result in ${showInCurrency}: ${result.toFixed(2)}`);
        return result;
    }

    /**
     * Calculate gross yearly salary
     * Converts input salary to annual gross amount
     *
     * @param {number} salary - Input salary amount
     * @param {string} period - Input period: 'hour', 'month', 'year'
     * @param {array} taxes - Array of tax objects (currently for reference, not applied to gross)
     * @param {string} currency - Input currency code
     * @param {string} showInCurrency - Display/result currency code
     * @returns {number} Gross yearly salary in display currency
     * TODO: Implement calculation logic
     */
    getGrossYearlySalary(salary, period, taxes, currency, showInCurrency) {
        console.log('📈 Calculating gross yearly salary:', { salary, period, taxes: taxes?.length, currency, showInCurrency });

        // Use reusable function to convert to yearly
        const grossYearlySalary = this.convertSalaryPeriod(salary, period, 'year');
        console.log(`  📊 Gross yearly salary: ${grossYearlySalary.toFixed(2)} ${currency}`);

        // Convert to display currency
        const result = this.convertToCurrency(grossYearlySalary, currency, showInCurrency);
        console.log(`  ✅ Result in ${showInCurrency}: ${result.toFixed(2)}`);
        return result;
    }

    /**
     * Convert salary from one period to another
     * Reusable helper function for period conversions
     *
     * @param {number} salary - Input salary amount
     * @param {string} fromPeriod - Input period: 'hour', 'month', 'year'
     * @param {string} toPeriod - Target period: 'hour', 'month', 'year'
     * @returns {number} Converted salary in target period
     */
    convertSalaryPeriod(salary, fromPeriod, toPeriod) {
        if (fromPeriod === toPeriod) return salary;

        // First convert to yearly
        let yearlyAmount = 0;
        if (fromPeriod === 'year') {
            yearlyAmount = salary;
        } else if (fromPeriod === 'month') {
            yearlyAmount = salary * 12;
        } else if (fromPeriod === 'hour') {
            const totalWorkingDaysInYear = this.getWorkingDaysPerMonth().reduce((sum, days) => sum + days, 0);
            yearlyAmount = 8 * salary * totalWorkingDaysInYear;
        }

        // Then convert to target period
        if (toPeriod === 'year') {
            return yearlyAmount;
        } else if (toPeriod === 'month') {
            return yearlyAmount / 12;
        } else if (toPeriod === 'hour') {
            const totalWorkingDaysInYear = this.getWorkingDaysPerMonth().reduce((sum, days) => sum + days, 0);
            return yearlyAmount / (8 * totalWorkingDaysInYear);
        }

        return yearlyAmount;
    }

    /**
     * Calculate tax amount for a single tax
     * Reusable helper function for individual tax calculations
     *
     * @param {object} tax - Tax object with type, value, currency, payPer
     * @param {number} grossSalary - Gross salary to apply tax to
     * @param {string} inputCurrency - Input currency code
     * @returns {number} Tax amount in input currency
     */
    calculateTaxAmount(tax, grossSalary, inputCurrency) {
        if (!tax || !tax.type || tax.value === undefined) {
            console.warn('⚠️  Invalid tax object:', tax);
            return 0;
        }

        let taxAmount = 0;

        if (tax.type === 'percentage') {
            // Percentage tax: apply to gross salary
            taxAmount = grossSalary * (tax.value / 100);
        } else if (tax.type === 'fixed') {
            // Fixed tax: use the value directly
            taxAmount = tax.value;

            // If tax currency differs from input currency, convert it
            if (tax.currency && tax.currency !== inputCurrency) {
                taxAmount = this.convertToCurrency(taxAmount, tax.currency, inputCurrency);
            }
        }

        return taxAmount;
    }

    /**
     * Calculate total taxes for a given gross salary
     * Reusable helper function for summing all taxes
     *
     * @param {array} taxes - Array of tax objects
     * @param {number} grossSalary - Gross salary to apply taxes to
     * @param {string} currency - Input currency code
     * @returns {number} Total tax amount in input currency
     */
    calculateTotalTaxes(taxes, grossSalary, currency) {
        if (!taxes || taxes.length === 0) {
            return 0;
        }

        let totalTaxes = 0;
        taxes.forEach(tax => {
            const taxAmount = this.calculateTaxAmount(tax, grossSalary, currency);
            totalTaxes += taxAmount;
        });

        return totalTaxes;
    }

    /**
     * Calculate average monthly taxes based on gross salary
     * Applies all taxes (fixed and percentage) to monthly income
     *
     * @param {number} salary - Input salary amount
     * @param {string} period - Input period: 'hour', 'month', 'year'
     * @param {array} taxes - Array of tax objects with type, value, currency
     * @param {string} currency - Input currency code
     * @param {string} showInCurrency - Display/result currency code
     * @returns {number} Average monthly taxes in display currency
     */
    getMonthlyTaxes(salary, period, taxes, currency, showInCurrency) {
        console.log('💸 Calculating average monthly taxes:', { salary, period, taxes: taxes?.length, currency, showInCurrency });

        // Step 1: Convert salary to monthly
        const monthlyGrossSalary = this.convertSalaryPeriod(salary, period, 'month');
        console.log(`  📊 Gross monthly salary: ${monthlyGrossSalary.toFixed(2)} ${currency}`);

        // Step 2: Calculate all taxes on monthly salary
        const totalMonthlyTaxes = this.calculateTotalTaxes(taxes, monthlyGrossSalary, currency);
        console.log(`  💰 Total monthly taxes: ${totalMonthlyTaxes.toFixed(2)} ${currency}`);

        // Step 3: Convert to display currency
        const result = this.convertToCurrency(totalMonthlyTaxes, currency, showInCurrency);
        console.log(`  ✅ Result in ${showInCurrency}: ${result.toFixed(2)}`);
        return result;
    }

    /**
     * Calculate yearly taxes based on gross salary
     * Applies all taxes (fixed and percentage) to annual income
     *
     * @param {number} salary - Input salary amount
     * @param {string} period - Input period: 'hour', 'month', 'year'
     * @param {array} taxes - Array of tax objects with type, value, currency
     * @param {string} currency - Input currency code
     * @param {string} showInCurrency - Display/result currency code
     * @returns {number} Total yearly taxes in display currency
     */
    getYearlyTaxes(salary, period, taxes, currency, showInCurrency) {
        console.log('💸 Calculating yearly taxes:', { salary, period, taxes: taxes?.length, currency, showInCurrency });

        // Step 1: Convert salary to yearly
        const yearlyGrossSalary = this.convertSalaryPeriod(salary, period, 'year');
        console.log(`  📊 Gross yearly salary: ${yearlyGrossSalary.toFixed(2)} ${currency}`);

        // Step 2: Calculate all taxes on yearly salary
        const totalYearlyTaxes = this.calculateTotalTaxes(taxes, yearlyGrossSalary, currency);
        console.log(`  💰 Total yearly taxes: ${totalYearlyTaxes.toFixed(2)} ${currency}`);

        // Step 3: Convert to display currency
        const result = this.convertToCurrency(totalYearlyTaxes, currency, showInCurrency);
        console.log(`  ✅ Result in ${showInCurrency}: ${result.toFixed(2)}`);
        return result;
    }

    /**
     * Get number of working days (Mon-Fri) for each month
     * Uses current year for calculation
     * @returns {array} Array of 12 values representing working days per month
     */
    getWorkingDaysPerMonth() {
        const currentYear = new Date().getFullYear();
        const workingDaysPerMonth = [];

        for (let month = 0; month < 12; month++) {
            let workingDays = 0;
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();

            // Count weekdays (Monday=1 to Friday=5) in the month
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentYear, month, day);
                const dayOfWeek = date.getDay();

                // 0 = Sunday, 1 = Monday, 5 = Friday, 6 = Saturday
                if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                    workingDays++;
                }
            }

            workingDaysPerMonth.push(workingDays);
        }

        console.log('📅 Working days per month:', workingDaysPerMonth);
        return workingDaysPerMonth;
    }

    /**
     * Convert amount from one currency to another
     * @param {number} amount - Amount to convert
     * @param {string} fromCurrency - Source currency
     * @param {string} toCurrency - Target currency
     * @returns {number} Converted amount
     */
    convertToCurrency(amount, fromCurrency, toCurrency) {
        // If same currency, return as is
        if (fromCurrency === toCurrency) {
            return amount;
        }

        // Convert using exchange rates
        const convertedAmount = this.exchangeRates.convert(amount, fromCurrency, toCurrency, false);

        if (convertedAmount === null) {
            console.warn(`Unable to convert from ${fromCurrency} to ${toCurrency}`);
            return amount; // Return original if conversion fails
        }

        return convertedAmount;
    }
}
