# Local Development Setup

## Prerequisites

- Any text editor (VS Code, Sublime, etc.)
- Web browser with DevTools (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- Python or Node.js (for local server)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/salary-calc.git
cd salary-calc
```

### 2. Start Local Server

#### Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Or Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
npx http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

### 3. Open in Browser

```
http://localhost:8000
```

---

## Development Workflow

### Editing Files

```
salary-calc/
├── index.html              # UI structure
├── js/
│   ├── app.js             # Main app logic
│   ├── calculator.js      # Calculation engine
│   ├── i18n.js            # Language translations
│   └── db.js              # Database operations
├── sw.js                  # Service Worker
└── manifest.json          # PWA configuration
```

### Real-Time Testing

1. **Make changes** to any file
2. **Save the file**
3. **Hard refresh** browser (Ctrl+Shift+R or Cmd+Shift+R)
4. **Check browser console** (F12) for errors

### Testing Features

#### Test Multilingual Support
```javascript
// In browser console
i18n.setLanguage('hy')  // Armenian
i18n.setLanguage('ru')  // Russian
i18n.setLanguage('en')  // English
```

#### Test Offline Mode
1. Open DevTools (F12)
2. Go to **Application** → **Service Workers**
3. Check "Offline" checkbox
4. App continues to work!

#### Test Calculations
```javascript
// In browser console
const calc = new SalaryCalculator(app.exchangeRates);

// Test monthly conversion
calc.calculateAverageGrossMonthlySalary(24, 'hour', [], 'USD', 'AMD');

// Test yearly conversion
calc.getGrossYearlySalary(24, 'hour', [], 'USD', 'AMD');
```

#### Test Database
```javascript
// In browser console
db.getAllRecords('individual_taxes').then(taxes => console.log(taxes));
```

---

## Common Development Tasks

### Add a New Translation

Edit `js/i18n.js`:

```javascript
const translations = {
    en: { /* English */ },
    hy: { /* Armenian */ },
    ru: { /* Russian */ },
    fr: { /* NEW LANGUAGE */
        back: 'Retour',
        welcome: 'Bienvenue',
        // ... add all keys
    }
};
```

### Add a New Tax Type

Edit `js/app.js` in `seedArmenianTaxes()`:

```javascript
{
    "type": "fixed",
    "payPer": "month",
    "currency": "AMD",
    "label": { "en": "New Tax", "hy": "Նոր հարկ" },
    "description": {},
    "value": 1000,
    "workType": "individual",
    "id": 7  // New ID
}
```

### Modify Styling

Edit inline styles in `index.html` or add to `<style>` section

### Add New Calculation

Edit `js/calculator.js`:

```javascript
class SalaryCalculator {
    // Add new method
    calculateNetSalary(salary, period, taxes, currency, showInCurrency) {
        // Implementation
    }
}
```

---

## Debugging Tips

### Enable Detailed Logging

All console logs use emoji prefixes:
- 💰 Salary calculations
- 💸 Tax calculations
- 📊 Exchange rates
- 🏷️ Tax display
- ✅ Success operations
- ❌ Errors

Filter by prefix in DevTools console.

### Check Service Worker

1. Open DevTools → **Application**
2. Click **Service Workers**
3. Check registration status
4. View cached files in **Cache Storage**

### Monitor IndexedDB

1. Open DevTools → **Application**
2. Click **IndexedDB** → **salary-calc**
3. View data in stores:
   - `individual_taxes`
   - `individual_income`
   - etc.

### Clear Everything & Start Fresh

```javascript
// In console
// Clear localStorage
localStorage.clear();

// Clear IndexedDB
indexedDB.deleteDatabase('salary-calc');

// Unregister Service Worker
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});

// Then refresh page
location.reload();
```

---

## Testing on Mobile

### iOS
1. On your Mac, start local server: `python -m http.server 8000`
2. Get your Mac's IP: `ipconfig getifaddr en0`
3. On iPhone: Safari → `http://YOUR_MAC_IP:8000`
4. Tap Share → Add to Home Screen

### Android
1. On your PC/Mac, start server: `python -m http.server 8000`
2. Get your PC/Mac IP
3. On Android: Chrome → `http://YOUR_IP:8000`
4. Menu → Install app / Add to Home Screen

---

## Performance Testing

### Lighthouse Audit

1. Open DevTools → **Lighthouse**
2. Select "PWA" category
3. Click **Analyze page load**
4. View performance metrics

### Bundle Size

Current sizes:
- HTML: ~30KB
- JS: ~15KB
- CSS: ~5KB
- **Total**: ~50KB

### Load Time

- First load: 2-3 seconds
- Cached load: <1 second
- Offline load: Instant

---

## Code Style Guidelines

### JavaScript
```javascript
// Use consistent naming
const functionName = () => { }
const variableName = 'value'
const CONSTANT_NAME = 100

// Use template literals
const message = `Hello ${name}`

// Use async/await
async function loadData() {
    const data = await fetchData()
    return data
}
```

### HTML
```html
<!-- Use semantic HTML -->
<button id="myBtn">Click</button>

<!-- Use data attributes for JS hooks -->
<div data-tax-type="fixed"></div>

<!-- Use comments for sections -->
<!-- Tax Section -->
```

### CSS
```css
/* Use CSS variables for colors */
:root {
    --primary-color: #1f2937;
    --secondary-color: #6366f1;
}

/* Mobile-first approach */
@media (min-width: 768px) {
    /* Desktop styles */
}
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push to origin
git push origin feature/my-feature

# Create Pull Request on GitHub
# Then merge to main after review
```

---

## Useful Resources

- [MDN Web Docs](https://developer.mozilla.org/) - JS, CSS, HTML reference
- [GitHub Pages Docs](https://docs.github.com/en/pages) - Deployment
- [Web App Manifest Spec](https://www.w3.org/TR/appmanifest/) - PWA
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Database
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) - Offline

---

## Need Help?

1. **Check browser console** - Look for error messages
2. **Read comments in code** - Lots of documentation
3. **Check documentation** - README.md, TAX_STRUCTURE.md, DEPLOYMENT.md
4. **Search GitHub Issues** - See if problem was reported
5. **Create new Issue** - For bugs or feature requests

---

**Happy coding! 🚀**
