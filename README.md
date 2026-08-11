# Salary Calculator 💰

A progressive web app for calculating salaries for **Individual Entrepreneurs** and **Registered Companies** in Armenia.

## Features

- 📱 **Mobile-First Design**: Optimized for iOS/Android home screen installation
- 🌍 **Multilingual**: English, Armenian (Հայերեն), Russian (ready for expansion)
- 💾 **Offline-First**: IndexedDB for data persistence, Service Worker for offline support
- 🎯 **Navigation-Based UI**: Button-driven navigation with minimal forms
- 🔍 **No Complex Menus**: Step-by-step workflow with clear navigation paths

## Project Structure

```
salary-calc/
├── index.html           # Main HTML file
├── manifest.json        # PWA manifest for app installation
├── sw.js               # Service Worker for offline support
├── js/
│   ├── app.js          # Main application logic
│   ├── i18n.js         # Internationalization system
│   └── db.js           # IndexedDB database manager
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## Work Types

### 1. Individual Entrepreneur (TODO)
- **Income Calculation**: Track and calculate earnings
- **Tax Calculation**: Compute tax liabilities
- **Deductions & Benefits**: Manage deductions and benefits
- **Summary & Report**: Generate comprehensive reports

### 2. Registered Company (TODO)
- **Revenue Calculation**: Track company revenue
- **Expense Management**: Manage business expenses
- **Payroll & Employees**: Handle employee salaries
- **Corporate Taxes**: Calculate corporate tax liabilities
- **Financial Reports**: Generate financial statements

## Technical Stack

- **Frontend**: Vanilla JavaScript (no frameworks)
- **Storage**: IndexedDB for offline data persistence
- **PWA**: Service Worker, Web App Manifest
- **Internationalization**: Custom i18n system
- **Styling**: CSS3 with light theme (mobile-responsive)

## Database Structure

### Individual Entrepreneur Stores
- `individual_income`: Income records
- `individual_taxes`: Tax records
- `individual_settings`: User preferences

### Registered Company Stores
- `registered_revenue`: Revenue records
- `registered_expenses`: Expense records
- `registered_payroll`: Payroll records
- `registered_settings`: User preferences

### Global Stores
- `preferences`: Global user preferences

## Language Support

Currently implemented:
- 🇺🇸 English (en)
- 🇦🇲 Armenian (hy)
- 🇷🇺 Russian (ru)

Add new languages by updating `js/i18n.js` translations object.

## Installation

### For Desktop Development
```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Visit http://localhost:8000
```

### For iOS Home Screen
1. Open Safari on iOS
2. Visit the web app URL
3. Tap Share → Add to Home Screen
4. Open from home screen (standalone mode)

### For Android Home Screen
1. Open Chrome/Firefox on Android
2. Tap menu → Install app / Add to Home screen
3. Open from home screen (standalone mode)

## Development Roadmap

### Phase 1: Design & Structure ✅
- [x] Initial HTML structure
- [x] Navigation system
- [x] Multilanguage infrastructure
- [x] IndexedDB setup
- [x] Styling & mobile responsiveness

### Phase 2: Individual Entrepreneur (TODO)
- [ ] Income calculation form
- [ ] Tax calculation logic
- [ ] Deductions management
- [ ] Report generation
- [ ] Data validation

### Phase 3: Registered Company (TODO)
- [ ] Revenue tracking form
- [ ] Expense management
- [ ] Payroll system
- [ ] Corporate tax calculation
- [ ] Financial reports

### Phase 4: Enhancement (TODO)
- [ ] Export to CSV/PDF
- [ ] Data visualization (charts/graphs)
- [ ] Cloud sync
- [ ] Multi-user support
- [ ] Analytics
- [ ] Performance optimization

## Implementation Notes

### UI Philosophy
- **Buttons over Complex Menus**: Each decision point offers clear button choices
- **Minimal Forms**: Forms show only relevant fields based on user selections
- **Progressive Disclosure**: Information revealed step-by-step
- **Touch-Friendly**: Large tap targets for mobile devices

### Code Organization
- **No Framework**: Pure JavaScript for faster load and smaller bundle
- **Modular**: Separate concerns (i18n, db, app)
- **TODO Comments**: Mark unimplemented features clearly
- **Scalable**: Structure allows easy expansion

### Performance
- Service Worker caching for instant load
- IndexedDB for fast local data access
- Minimal CSS for quick rendering
- Lightweight JavaScript bundles

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 12+ (iOS 12+)
- Samsung Internet 12+

## TODO Items

See throughout code for specific TODOs:

**i18n.js**:
- Date/number formatting
- RTL support
- External translation loading
- Pluralization

**db.js**:
- Export/Import functionality
- Cloud sync
- Data migration

**app.js**:
- Session management
- Cross-tab sync
- Notifications
- Analytics
- PWA features

**sw.js**:
- Background sync
- Push notifications
- Advanced cache strategies

**General**:
- Individual Entrepreneur implementation
- Registered Company implementation
- Form validation
- Error handling
- Unit tests
- E2E tests

## Contributing

1. Maintain multilanguage support for all new features
2. Keep navigation button-based
3. Use minimal forms pattern
4. Add TODO comments for incomplete work
5. Test on mobile devices

## License

MIT License - Feel free to use and modify

## Contact

For questions or suggestions, contact: sargsyan.artur92@gmail.com
