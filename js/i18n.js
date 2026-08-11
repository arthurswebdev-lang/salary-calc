/**
 * Internationalization (i18n) System
 * Supports: English, Armenian (Hayeren), Russian
 * Static translations with support for dynamic language switching
 */

const translations = {
    en: {
        // Header & Navigation
        back: 'Back',

        // Home Page
        welcome: 'Welcome to Salary Calculator',
        selectWorkType: 'Select your work type to get started',

        // Work Types
        individual: 'Individual Entrepreneur',
        individualDesc: 'Self-employed, freelancer',
        registered: 'Registered Worker',
        registeredDesc: 'Employee with employment contract',

        // Individual Entrepreneur Sections
        incomeCalculation: 'Income Calculation',
        taxCalculation: 'Tax Calculation',
        deductions: 'Deductions & Benefits',
        summary: 'Summary & Report',

        // Registered Company Sections
        revenueCalculation: 'Revenue Calculation',
        expenseManagement: 'Expense Management',
        payroll: 'Payroll & Employees',
        corporateTaxes: 'Corporate Taxes',
        financialReports: 'Financial Reports',
    },

    hy: {
        // Header & Navigation
        back: 'Հետ',

        // Home Page
        welcome: 'Բարի գալուստ Պաշտոնային Հաշվիչ',
        selectWorkType: 'Ընտրեք ձեր աշխատանքի տեսակը',

        // Work Types
        individual: 'Անհատ Ձեռնարկատեր',
        individualDesc: 'Ինքնազբաղված, ֆրիլանսեր',
        registered: 'Գրանցված Աշխատող',
        registeredDesc: 'Աշխատանքային պայմանագրով աշխատող',

        // Individual Entrepreneur Sections
        incomeCalculation: 'Եկամուտի Հաշվարկ',
        taxCalculation: 'Հարկի Հաշվարկ',
        deductions: 'Վճարազերծումներ & Առավելություններ',
        summary: 'Ամփոփում & Հաշվետվություն',

        // Registered Company Sections
        revenueCalculation: 'Հասույթի Հաշվարկ',
        expenseManagement: 'Ծախսերի Կառավարում',
        payroll: 'Պաշտոնային Ցուցակ & Աշխատողներ',
        corporateTaxes: 'Կորպորատիվ Հարկեր',
        financialReports: 'Ֆինանսական Հաշվետվություններ',
    },

    ru: {
        // Header & Navigation
        back: 'Назад',

        // Home Page
        welcome: 'Добро пожаловать в калькулятор зарплаты',
        selectWorkType: 'Выберите тип вашей работы',

        // Work Types
        individual: 'Индивидуальный предприниматель',
        individualDesc: 'Самозанятый, фрилансер',
        registered: 'Зарегистрированный работник',
        registeredDesc: 'Работник по трудовому договору',

        // Individual Entrepreneur Sections
        incomeCalculation: 'Расчет дохода',
        taxCalculation: 'Расчет налогов',
        deductions: 'Вычеты и льготы',
        summary: 'Итоговый отчет',

        // Registered Company Sections
        revenueCalculation: 'Расчет дохода',
        expenseManagement: 'Управление расходами',
        payroll: 'Зарплата и сотрудники',
        corporateTaxes: 'Корпоративные налоги',
        financialReports: 'Финансовые отчеты',
    }
};

class I18n {
    constructor() {
        this.storageAvailable = this.checkStorageAvailable();
        const stored = this.getStoredLanguage();
        this.currentLanguage = stored || 'en';
        console.log('i18n init - stored:', stored, '- using:', this.currentLanguage);
        this.init();
    }

    checkStorageAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage not available:', e);
            return false;
        }
    }

    getStoredLanguage() {
        try {
            return localStorage.getItem('language');
        } catch (e) {
            console.warn('Error reading from localStorage:', e);
            return null;
        }
    }

    setLanguage(lang) {
        console.log('setLanguage:', lang);
        if (translations[lang]) {
            this.currentLanguage = lang;

            try {
                localStorage.setItem('language', lang);
                console.log('✅ Saved to localStorage:', localStorage.getItem('language'));
            } catch (e) {
                console.warn('Error saving to localStorage:', e);
            }

            this.updateUI();
            return true;
        }
        console.log('❌ Invalid language:', lang);
        return false;
    }

    getTranslation(key) {
        return translations[this.currentLanguage][key] ||
               translations['en'][key] ||
               key;
    }

    updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        console.log('UI updated for language:', this.currentLanguage);
    }

    init() {
        console.log('i18n.init() - current language:', this.currentLanguage);
        this.updateUI();
    }

    /**
     * TODO: Add support for:
     * - Date/number formatting based on locale
     * - RTL language support
     * - Translation file loading from external source
     * - Pluralization rules
     * - Context-based translations
     */
}

// Global instance
const i18n = new I18n();
