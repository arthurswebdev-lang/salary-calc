# Development Guide

## Quick Start

1. **View the app in browser**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```
   Then open `http://localhost:8000` in your browser.

2. **Test on mobile**:
   - Use Chrome DevTools mobile emulation (F12)
   - Or connect actual device and visit your machine's IP

3. **Install as PWA**:
   - On desktop: Look for install icon in address bar
   - On iOS: Safari → Share → Add to Home Screen
   - On Android: Chrome menu → Install app

## Code Structure Overview

### index.html
- Single-page app with hidden sections (pages)
- Header with language selector
- Three main pages: home, individual entrepreneur, registered company
- Each page has TODO badges for incomplete sections

### js/i18n.js
- Translation management system
- Supports English, Armenian, Russian
- Stores language preference in localStorage
- Auto-updates UI when language changes

### js/db.js
- IndexedDB wrapper class
- Creates stores for both work types
- Methods: add, update, get, getAll, query, delete, clear

### js/app.js
- Main application controller
- Navigation between pages
- Event listener setup
- Service Worker registration

### sw.js
- Service Worker for offline support
- Caches assets on install
- Serves from cache with network fallback

## Adding a New Feature

### 1. Add Translation Strings
Edit `js/i18n.js` - add to `translations` object:

```javascript
translations = {
    en: {
        myNewFeature: 'My New Feature',
        myDescription: 'Description here',
    },
    hy: {
        myNewFeature: 'Իմ նոր գործառույթ',
        myDescription: 'Նկարագրություն այստեղ',
    },
    ru: {
        myNewFeature: 'Моя новая функция',
        myDescription: 'Описание здесь',
    }
}
```

### 2. Create UI Element
Edit `index.html` - add button with `data-i18n`:

```html
<button class="nav-btn" id="myFeatureBtn">
    <span data-i18n="myNewFeature">My New Feature</span>
    <span class="nav-btn-arrow">→</span>
</button>
```

### 3. Add Event Handler
Edit `js/app.js` - in `setupEventListeners()`:

```javascript
document.getElementById('myFeatureBtn').addEventListener('click', () => {
    this.navigateToSection('individual', 'myFeature');
});
```

### 4. Mark as TODO
Add TODO badge where not yet implemented:

```html
<span class="todo-badge">TODO</span>
```

## Adding Database Records

### Save Data
```javascript
await db.addRecord('individual_income', {
    date: new Date().toISOString(),
    amount: 50000,
    description: 'Freelance work'
});
```

### Retrieve Data
```javascript
// Get all records
const records = await db.getAllRecords('individual_income');

// Get by ID
const record = await db.getRecord('individual_income', 1);

// Query by index
const monthRecords = await db.queryByIndex(
    'individual_income',
    'month',
    '2024-01'
);
```

## Styling Guidelines

### Light Theme (Current)
- Primary: #2563eb (blue)
- Secondary: #10b981 (green)
- Background: #ffffff (white)
- Surface: #f8f9fa (light gray)
- Text: #1f2937 (dark gray)

### Mobile-First Approach
- Start with mobile styles
- Use `@media` queries for larger screens
- Touch targets minimum 44x44px
- Safe areas for notch/home indicator

### Button Styling
- Primary (blue) - main actions
- Secondary (green) - alternative actions
- Surface (gray) - back/secondary options

## Adding a New Language

1. **Add translations in `js/i18n.js`**:
```javascript
translations = {
    // ... existing languages
    fr: {
        welcome: 'Bienvenue',
        // ... all keys
    }
}
```

2. **Add language option in `index.html`**:
```html
<button class="language-option" data-lang="fr">Français</button>
```

3. **Update manifest.json** - add language code if needed

## Testing Checklist

- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile browsers (iOS Safari, Chrome Android)
- [ ] Language switching works
- [ ] Offline functionality (DevTools - offline mode)
- [ ] Form inputs are mobile-friendly
- [ ] Touch targets are large enough (44px minimum)
- [ ] No console errors
- [ ] Data persists after page reload
- [ ] Service Worker is registered

## Performance Tips

1. **Lazy load sections** - only load data when needed
2. **Debounce events** - avoid too frequent updates
3. **Index key fields** - in IndexedDB for faster queries
4. **Cache aggressively** - Service Worker handles it
5. **Minimize re-renders** - manual DOM updates only when needed

## Debugging

### View Stored Data
```javascript
// In browser console
db.getAllRecords('individual_income').then(records => {
    console.log(records);
});
```

### Check Service Worker
- DevTools → Application → Service Workers
- DevTools → Application → Cache Storage

### Check IndexedDB
- DevTools → Application → IndexedDB
- See stored databases and records

### Check Local Storage
```javascript
// In browser console
localStorage.getItem('language');
```

## Common Issues

### Service Worker Not Updating
- Clear cache: DevTools → Application → Clear Storage
- Unregister SW: Right-click on SW, select "Unregister"
- Restart dev server

### IndexedDB Quota Exceeded
- Clear old data: `db.clearStore('storeName')`
- Check quota: `navigator.storage.estimate()`

### Language Not Changing
- Check localStorage: `localStorage.getItem('language')`
- Verify translation keys exist
- Check console for errors

## Next Steps

1. Implement Individual Entrepreneur sections
2. Add form pages for data input
3. Create calculation logic for taxes
4. Add data validation
5. Build export functionality
6. Add charts/visualizations
7. Implement registered company features

## Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
