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

        // Periods
        hour: '⏰ Hour',
        month: '📅 Month',
        year: '📊 Year',
        perHour: 'per hour',
        perMonth: 'per month',
        perYear: 'per year',

        // Currencies
        rub: 'RUB (₽)',
        usd: 'USD ($)',
        amd: 'AMD (֏)',

        // Salary Input - Specific combinations
        enterSalaryPerHourInUSD: 'Enter salary per hour in USD',
        enterSalaryPerHourInRUB: 'Enter salary per hour in RUB',
        enterSalaryPerHourInAMD: 'Enter salary per hour in AMD',
        enterSalaryPerMonthInUSD: 'Enter salary per month in USD',
        enterSalaryPerMonthInRUB: 'Enter salary per month in RUB',
        enterSalaryPerMonthInAMD: 'Enter salary per month in AMD',
        enterSalaryPerYearInUSD: 'Enter salary per year in USD',
        enterSalaryPerYearInRUB: 'Enter salary per year in RUB',
        enterSalaryPerYearInAMD: 'Enter salary per year in AMD',

        selectSalaryPer: 'Select salary per',

        // Taxes
        taxes: 'Taxes',
        addTax: '+ Add tax',
        selectTaxType: 'Select tax type',
        fixed: '💰 Fixed',
        percentage: '📊 Percentage',
        payPer: 'Pay per',
        selectCurrency: 'Select currency',

        // Tax Form
        label: 'Label',
        description: 'Description',
        amount: 'Amount',
        percentageSymbol: 'Percentage (%)',
        saveTax: 'Save',
        updateTax: 'Update',
        deleteTax: 'Delete',

        // Results
        showInCurrency: 'Show in currency',
        netMonthly: 'net monthly:',
        netYearly: 'net yearly:',
        grossMonthly: 'gross monthly:',
        grossYearly: 'gross yearly:',
        monthlyTaxes: 'monthly taxes:',
        yearlyTaxes: 'yearly taxes:',

        // Template
        useArmenianTemplate: '📋 Use Armenian Template',
        confirmTemplate: 'Are you sure? This will add 6 Armenian taxes',
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

        // Periods
        hour: '⏰ Ժամ',
        month: '📅 Ամիս',
        year: '📊 Տարի',
        perHour: 'ժամում',
        perMonth: 'ամսում',
        perYear: 'տարում',

        // Currencies
        rub: 'RUB (₽)',
        usd: 'USD ($)',
        amd: 'AMD (֏)',

        // Salary Input - Specific combinations
        enterSalaryPerHourInUSD: 'Մուտքագրեք աշխատավարձ ժամում USD',
        enterSalaryPerHourInRUB: 'Մուտքագրեք աշխատավարձ ժամում RUB',
        enterSalaryPerHourInAMD: 'Մուտքագրեք աշխատավարձ ժամում AMD',
        enterSalaryPerMonthInUSD: 'Մուտքագրեք աշխատավարձ ամսում USD',
        enterSalaryPerMonthInRUB: 'Մուտքագրեք աշխատավարձ ամսում RUB',
        enterSalaryPerMonthInAMD: 'Մուտքագրեք աշխատավարձ ամսում AMD',
        enterSalaryPerYearInUSD: 'Մուտքագրեք աշխատավարձ տարում USD',
        enterSalaryPerYearInRUB: 'Մուտքագրեք աշխատավարձ տարում RUB',
        enterSalaryPerYearInAMD: 'Մուտքագրեք աշխատավարձ տարում AMD',

        selectSalaryPer: 'Ընտրել աշխատավարձի չափը',

        // Taxes
        taxes: 'Հարկեր',
        addTax: '+ Ավելացնել հարկ',
        selectTaxType: 'Ընտրեք հարկի տեսակը',
        fixed: '💰 Ֆիքսված',
        percentage: '📊 Տոկոս',
        payPer: 'Վճարել ըստ',
        selectCurrency: 'Ընտրեք արժույթ',

        // Tax Form
        label: 'Պիտակ',
        description: 'Նկարագրություն',
        amount: 'Գումար',
        percentageSymbol: 'Տոկոս (%)',
        saveTax: 'Պահել',
        updateTax: 'Թարմացնել',
        deleteTax: 'Ջնջել',

        // Results
        showInCurrency: 'Ցուցադրել արժույթով',
        netMonthly: 'զուտ ամսական:',
        netYearly: 'զուտ տարեկան:',
        grossMonthly: 'համախառն ամսական:',
        grossYearly: 'համախառն տարեկան:',
        monthlyTaxes: 'ամսական հարկեր:',
        yearlyTaxes: 'տարեկան հարկեր:',

        // Template
        useArmenianTemplate: '📋 Օգտագործել հայկական կաղապար',
        confirmTemplate: 'Համաձայն՞ եք: Սա կավելացնի 6 հայկական հարկ',
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

        // Periods
        hour: '⏰ Час',
        month: '📅 Месяц',
        year: '📊 Год',
        perHour: 'в час',
        perMonth: 'в месяц',
        perYear: 'в год',

        // Currencies
        rub: 'RUB (₽)',
        usd: 'USD ($)',
        amd: 'AMD (֏)',

        // Salary Input - Specific combinations
        enterSalaryPerHourInUSD: 'Введите зарплату в час в USD',
        enterSalaryPerHourInRUB: 'Введите зарплату в час в RUB',
        enterSalaryPerHourInAMD: 'Введите зарплату в час в AMD',
        enterSalaryPerMonthInUSD: 'Введите зарплату в месяц в USD',
        enterSalaryPerMonthInRUB: 'Введите зарплату в месяц в RUB',
        enterSalaryPerMonthInAMD: 'Введите зарплату в месяц в AMD',
        enterSalaryPerYearInUSD: 'Введите зарплату в год в USD',
        enterSalaryPerYearInRUB: 'Введите зарплату в год в RUB',
        enterSalaryPerYearInAMD: 'Введите зарплату в год в AMD',

        selectSalaryPer: 'Выберите размер оклада',

        // Taxes
        taxes: 'Налоги',
        addTax: '+ Добавить налог',
        selectTaxType: 'Выберите тип налога',
        fixed: '💰 Фиксированный',
        percentage: '📊 Процент',
        payPer: 'Платить за',
        selectCurrency: 'Выберите валюту',

        // Tax Form
        label: 'Название',
        description: 'Описание',
        amount: 'Сумма',
        percentageSymbol: 'Процент (%)',
        saveTax: 'Сохранить',
        updateTax: 'Обновить',
        deleteTax: 'Удалить',

        // Results
        showInCurrency: 'Показать в валюте',
        netMonthly: 'чистый ежемесячно:',
        netYearly: 'чистый ежегодно:',
        grossMonthly: 'валовой ежемесячно:',
        grossYearly: 'валовой ежегодно:',
        monthlyTaxes: 'ежемесячные налоги:',
        yearlyTaxes: 'ежегодные налоги:',

        // Template
        useArmenianTemplate: '📋 Использовать армянский шаблон',
        confirmTemplate: 'Вы уверены? Это добавит 6 армянских налогов',
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
        console.log('🔄 updateUI called, currentLanguage:', this.currentLanguage);

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.getTranslation(key);
        });

        // Update the salary input label when language changes
        const salaryInputLabel = document.getElementById('salaryInputLabel');
        if (salaryInputLabel && window.app && window.app.selectedPeriod && window.app.selectedCurrency) {
            const periodCapitalized = window.app.selectedPeriod.charAt(0).toUpperCase() + window.app.selectedPeriod.slice(1);
            const salaryLabelKey = `enterSalaryPer${periodCapitalized}In${window.app.selectedCurrency}`;
            const translation = this.getTranslation(salaryLabelKey);
            salaryInputLabel.textContent = translation;
            console.log(`✅ Updated salary input label to: ${translation}`);
        }

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        console.log('✅ UI updated for language:', this.currentLanguage);
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
