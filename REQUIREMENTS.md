# Requirements & Workflow

## UI Philosophy

- **Navigation-Based**: Step-by-step navigation instead of complex menus
- **Minimal Forms**: Show only relevant inputs for current step, not all categories at once
- **Buttons as Navigation**: Each decision point offers clear button choices
- **Mobile First**: Simple, clean design optimized for mobile devices
- **Light Colors**: Use very light, subtle background colors for buttons

## Work Types

### Individual Entrepreneur
- Full implementation in progress
- Currency selection: RUB, USD, AMD
- Salary periods: Per hour, Per month, Per year
- Salary input form
- Taxes management system

### Registered Worker
- TODO: Not implemented yet
- Shows "TODO: Registered Worker" placeholder when selected

## Language Support

- **Supported Languages**: English (en), Armenian (hy), Russian (ru)
- **Default**: English
- **Selection**: Flag icons in header (🇺🇸 🇦🇲 🇷🇺)
- **Static Translations**: Prepared infrastructure for future dynamic loading
- **Fallback Logic**: When changing language, uses fallback to English if translation missing

## Individual Entrepreneur - Workflow

### Step 1: Select Currency
- Options: RUB (🇷🇺), USD (🇺🇸), AMD (🇦🇲)
- Navigation: Individual Entrepreneur button → Currency page
- Back button: Returns to home

### Step 2: Select Salary Period
- Options: Per hour (⏰), Per month (📅), Per year (📊)
- Navigation: After currency selection
- Back button: Returns to currency

### Step 3: Enter Salary Amount
- Input field for salary value
- Label shows: "Enter salary [period] in [currency]"
- Next button proceeds to taxes
- Back button: Returns to period selection

### Step 4: Manage Taxes
- Display list of configured taxes
- Each tax shown as a button with:
  - Label (with language fallback)
  - Description (optional, with language fallback)
- "+" button to add new tax
- Save button to confirm
- Back button: Returns to salary input

### Step 5: Add New Tax (Multi-step)

#### 5a. Select Tax Type
- Options: Fixed (💰), Percentage (📊)
- Back: Returns to taxes

#### 5b. Select Pay Period
- Options: Month, Year
- Back: Returns to tax type selection
- Note: Used to normalize fixed amounts (e.g., yearly tax divided by 12 for monthly calculation)

#### 5c. Enter Tax Details
- Form fields with validation:
  - **Label** (required, multilingual)
    - English (required)
    - Armenian (fallback to English if empty)
    - Russian (fallback to English if empty)
  - **Amount** (required)
    - Value for the tax (fixed amount or percentage)
  - **Description** (optional, multilingual)
    - English (optional)
    - Armenian (optional)
    - Russian (optional)
- Buttons:
  - Cancel: Discards and returns to taxes page
  - Save: Stores tax in IndexedDB and returns to taxes page

## Tax Data Structure

```javascript
{
  id: auto-increment,
  type: "fixed" | "percentage",        // Tax calculation type
  fixedBySalary: true | false,          // TODO: For fixed type, whether based on salary
  payPer: "month" | "year",             // Payment period for normalization
  label: {
    en: "string",    // Required, at least one language
    hy: "string",    // Optional, fallback to en
    ru: "string"     // Optional, fallback to en
  },
  description: {
    en: "string",    // Optional
    hy: "string",    // Optional
    ru: "string"     // Optional
  },
  amount: number,                       // Tax amount (fixed value or percentage)
  workType: "individual" | "registered" // Associated work type
}
```

## Data Storage

- **Technology**: IndexedDB
- **Database Name**: SalaryCalc
- **Stores**:
  - `individual_taxes`: Tax records for Individual Entrepreneur
  - `individual_income`: TODO: Income records
  - `individual_settings`: TODO: User preferences
  - `registered_taxes`: TODO: Tax records for Registered Worker
  - `registered_*`: TODO: Other stores for Registered Worker

## UI Components

### Header
- Fixed at top, 50px height
- Left: Back button (hidden on home page, visible on other pages)
- Right: Language flags

### Pages
- All pages centered content at top
- Consistent spacing and alignment
- Fade-in animation when switching pages

### Buttons
- Consistent style: Light background, icon + text
- Options:
  - Main buttons (home): Icon + Text
  - Currency/Period: Flag/Icon + Text
  - Tax items: Label + Description
  - Action buttons: Save/Cancel (dark text/background)

## Not Yet Implemented (TODO)

### Individual Entrepreneur
- Income tracking and calculation
- Tax calculation logic
- Salary summary and reports
- Data export (JSON/CSV)
- Visualization (charts)

### Registered Worker
- Complete feature set
- All workflow steps

### General
- Cloud synchronization
- Multi-user support
- Analytics
- Data backup/restore
- Cross-tab sync
- Progressive Web App notifications

## Development Notes

- **No Frameworks**: Pure JavaScript for speed and simplicity
- **Mobile Priority**: Test on actual devices
- **Language-First**: All new features must support all 3 languages
- **Wait for Instructions**: Do not implement features beyond current scope without explicit request
- **Minimal Implementation**: Focus on core features first
