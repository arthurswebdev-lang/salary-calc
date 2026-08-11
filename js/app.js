/**
 * Main Application Logic
 * Handles navigation, UI interactions, and event management
 */
class SalaryCalcApp {
    constructor() {
        this.currentPage = 'home';
        this.pages = ['home', 'registered', 'currency', 'period', 'taxes', 'addTaxType', 'addTaxPayper', 'addTaxCurrency', 'addTaxDetails', 'taxDetails', 'taxDeleteConfirm'];
        this.selectedWorkType = null;
        this.selectedCurrency = null;
        this.selectedPeriod = null;
        this.salary = null;
        this.taxes = [];
        this.currentTax = {};
        this.viewingTaxId = null;

        // Initialize exchange rates and calculator
        this.exchangeRates = new ExchangeRateManager();
        this.exchangeRates.fetchRates();
        this.calculator = new SalaryCalculator(this.exchangeRates);

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.registerServiceWorker();
        console.log('App initialized');
    }

    /**
     * Seed Armenian taxes for Individual Entrepreneur
     * Uses fixed IDs to prevent duplicate seeding
     */
    async seedArmenianTaxes() {
        const armenianTaxes = [
            {
                "type": "fixed",
                "payPer": "month",
                "currency": "AMD",
                "label": { "hy": "սոց վճար" },
                "description": {},
                "value": 5000,
                "workType": "individual",
                "id": 1
            },
            {
                "type": "fixed",
                "payPer": "year",
                "currency": "AMD",
                "label": { "hy": "առողջության ապահովագրություն" },
                "description": {},
                "value": 129600,
                "workType": "individual",
                "id": 2
            },
            {
                "type": "fixed",
                "payPer": "month",
                "currency": "AMD",
                "label": { "hy": "շահութահարկ" },
                "description": {},
                "value": 5000,
                "workType": "individual",
                "id": 3
            },
            {
                "type": "percentage",
                "label": { "hy": "Շրջանառության հարկ" },
                "description": {},
                "value": 1,
                "workType": "individual",
                "id": 4
            },
            {
                "type": "fixed",
                "payPer": "year",
                "currency": "AMD",
                "label": { "hy": "դրոշմանիշային վճար" },
                "description": {},
                "value": 18000,
                "workType": "individual",
                "id": 5
            },
            {
                "type": "fixed",
                "payPer": "month",
                "currency": "AMD",
                "label": { "hy": "Հաշվապահի ծառայություն" },
                "description": {},
                "value": 25000,
                "workType": "individual",
                "id": 6
            }
        ];

        try {
            const storeName = 'individual_taxes';
            let seededCount = 0;

            for (const tax of armenianTaxes) {
                try {
                    // Check if tax already exists
                    const existing = await db.getRecord(storeName, tax.id);
                    if (!existing) {
                        await db.addRecord(storeName, tax);
                        seededCount++;
                    }
                } catch (error) {
                    // Record doesn't exist, add it
                    await db.addRecord(storeName, tax);
                    seededCount++;
                }
            }

            if (seededCount > 0) {
                console.log(`✅ Seeded ${seededCount} Armenian taxes for individual`);
            }
        } catch (error) {
            console.error('❌ Error seeding Armenian taxes:', error);
        }
    }

    /**
     * Format number with European style: 1.320.000,00
     * @param {number} num - Number to format
     * @returns {string} Formatted number string
     */
    formatNumber(num) {
        if (typeof num !== 'number') return '0,00';
        return num.toLocaleString('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Set active flag based on loaded language
        this.updateActiveLanguageFlag();

        // Language flag selection
        const flagButtons = document.querySelectorAll('.flag-btn');
        flagButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });

        // Work type buttons
        document.getElementById('individualBtn').addEventListener('click', () => {
            this.selectedWorkType = 'individual';
            this.goToPage('currency');
        });

        document.getElementById('registeredBtn').addEventListener('click', () => {
            this.goToPage('registered');
        });

        // Header back button
        document.getElementById('headerBack').addEventListener('click', () => {
            if (this.currentPage === 'registered') {
                this.goToPage('home');
            } else if (this.currentPage === 'currency') {
                this.goToPage('home');
                this.selectedWorkType = null;
            } else if (this.currentPage === 'period') {
                this.goToPage('currency');
                this.selectedPeriod = null;
            } else if (this.currentPage === 'taxes') {
                this.goToPage('period');
            } else if (this.currentPage === 'addTaxType') {
                this.goToPage('taxes');
            } else if (this.currentPage === 'addTaxPayper') {
                this.currentTax.type = null;
                this.goToPage('addTaxType');
            } else if (this.currentPage === 'addTaxCurrency') {
                this.currentTax.payPer = null;
                this.goToPage('addTaxPayper');
            } else if (this.currentPage === 'addTaxDetails') {
                // If percentage, go back to type; if fixed, go back to currency
                if (this.currentTax.type === 'percentage') {
                    this.currentTax.type = null;
                    this.goToPage('addTaxType');
                } else {
                    this.currentTax.currency = null;
                    this.goToPage('addTaxCurrency');
                }
            } else if (this.currentPage === 'taxDetails') {
                this.goToPage('taxes');
                this.viewingTaxId = null;
            } else if (this.currentPage === 'taxDeleteConfirm') {
                this.goToPage('taxDetails');
            }
        });

        // Currency buttons - go to period selection
        document.querySelectorAll('[data-currency]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const currency = e.target.getAttribute('data-currency');
                this.selectCurrency(currency);
                this.goToPage('period');
            });
        });

        // Period buttons - go to taxes
        document.querySelectorAll('[data-period]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const period = e.target.getAttribute('data-period');
                this.selectPeriod(period);
                this.goToTaxesPage();
            });
        });

        // Add tax button
        document.getElementById('addTaxBtn').addEventListener('click', () => {
            this.currentTax = {};
            this.goToPage('addTaxType');
        });

        // Salary input change - calculate results
        document.getElementById('salaryInput').addEventListener('input', () => {
            this.updateSalaryResults();
        });

        // Result currency change - save preference
        const resultCurrencySelect = document.getElementById('resultCurrencySelect');
        if (resultCurrencySelect) {
            // Restore last selected currency
            const lastCurrency = localStorage.getItem('lastResultCurrency');
            if (lastCurrency) {
                resultCurrencySelect.value = lastCurrency;
            }

            // Save when changed
            resultCurrencySelect.addEventListener('change', () => {
                localStorage.setItem('lastResultCurrency', resultCurrencySelect.value);
                this.updateSalaryResults();
            });
        }

        // Add tax - Type selection
        document.querySelectorAll('[data-tax-type]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.getAttribute('data-tax-type');
                this.currentTax.type = type;

                // If percentage, skip to details; if fixed, go to payper
                if (type === 'percentage') {
                    this.goToPage('addTaxDetails');
                } else {
                    this.goToPage('addTaxPayper');
                }
            });
        });

        // Armenian taxes template button
        const armenianTemplateBtn = document.getElementById('armenianTemplateBtn');
        if (armenianTemplateBtn) {
            armenianTemplateBtn.addEventListener('click', async () => {
                const confirmed = confirm('Are you sure? This will add 6 Armenian taxes:\n\n1. սոց վճար\n2. առողջության ապահովագրություն\n3. շահութահարկ\n4. Շրջանառության հարկ\n5. դրոշմանիշային վճար\n6. Հաշվապահի ծառայություն');

                if (confirmed) {
                    await this.seedArmenianTaxes();
                    await this.loadTaxes();
                    this.goToPage('taxes');
                }
            });
        }

        // Add tax - PayPer selection
        document.querySelectorAll('[data-tax-payper]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTax.payPer = e.target.getAttribute('data-tax-payper');
                this.goToPage('addTaxCurrency');
            });
        });

        // Add tax - Currency selection
        document.querySelectorAll('[data-tax-currency]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTax.currency = e.target.getAttribute('data-tax-currency');
                this.goToPage('addTaxDetails');
            });
        });

        // Add tax - Save
        document.getElementById('saveTax').addEventListener('click', () => {
            this.saveTax();
        });

        document.getElementById('cancelAddTax').addEventListener('click', () => {
            this.goToPage('taxes');
            this.currentTax = {};
        });

        // Tax details buttons
        document.getElementById('updateTaxBtn').addEventListener('click', () => {
            if (this.viewingTaxId !== null) {
                this.currentTax = { ...this.taxes.find(t => t.id === this.viewingTaxId) };
                this.goToPage('addTaxType');
            }
        });

        document.getElementById('deleteTaxBtn').addEventListener('click', () => {
            this.goToPage('taxDeleteConfirm');
        });

        document.getElementById('cancelDeleteTaxBtn').addEventListener('click', () => {
            this.goToPage('taxDetails');
        });

        document.getElementById('confirmDeleteTaxBtn').addEventListener('click', async () => {
            await this.deleteTax(this.viewingTaxId);
        });

        console.log('Event listeners attached');
    }

    /**
     * Select currency
     */
    selectCurrency(currency) {
        this.selectedCurrency = currency;
        document.querySelectorAll('[data-currency]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-currency="${currency}"]`).classList.add('active');
        console.log('Selected currency:', currency);
    }

    /**
     * Select period
     */
    selectPeriod(period) {
        this.selectedPeriod = period;
        document.querySelectorAll('[data-period]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-period="${period}"]`).classList.add('active');
        console.log('Selected period:', period);
    }

    /**
     * Navigate to a page
     */
    goToPage(page) {
        if (!this.pages.includes(page)) {
            console.error('Invalid page:', page);
            return;
        }

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show selected page
        const pageElement = document.getElementById(`${page}Page`);
        if (pageElement) {
            pageElement.classList.add('active');
            this.currentPage = page;
            this.updateHeaderBackButton();

            // Initialize form for tax details page
            if (page === 'addTaxDetails') {
                this.initTaxDetailsForm();
            }

            console.log('Navigated to page:', page);
        }
    }

    /**
     * Update header back button visibility
     */
    updateHeaderBackButton() {
        const headerBack = document.getElementById('headerBack');
        if (this.currentPage === 'home') {
            headerBack.style.display = 'none';
        } else {
            headerBack.style.display = 'block';
        }
    }


    /**
     * Update which flag button is marked as active
     */
    updateActiveLanguageFlag() {
        const lang = i18n.currentLanguage;

        document.querySelectorAll('.flag-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    /**
     * Change language
     */
    changeLanguage(lang) {
        if (i18n.setLanguage(lang)) {
            // Update flag buttons active state
            document.querySelectorAll('.flag-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

            // Update period and currency labels
            const periodKeys = { hour: 'perHour', month: 'perMonth', year: 'perYear' };
            const salaryPeriodLabel = document.getElementById('salaryPeriodLabel');
            if (salaryPeriodLabel && this.selectedPeriod) {
                const translation = i18n.getTranslation(periodKeys[this.selectedPeriod]);
                console.log(`🌍 Updating period label to ${lang}: ${periodKeys[this.selectedPeriod]} → "${translation}"`);
                salaryPeriodLabel.textContent = translation;
            }

            // Refresh taxes display with new language
            if (this.currentPage === 'taxes') {
                this.displayTaxes();
            }
        }
    }

    /**
     * Go to taxes page with salary input at top
     */
    goToTaxesPage() {
        console.log(`📄 goToTaxesPage called:`);
        console.log(`   - selectedPeriod: ${this.selectedPeriod}`);
        console.log(`   - selectedCurrency: ${this.selectedCurrency}`);
        console.log(`   - i18n.currentLanguage: ${i18n.currentLanguage}`);

        // Build the key for the specific combination (e.g., enterSalaryPerMonthInUSD)
        if (!this.selectedPeriod || !this.selectedCurrency) {
            console.error('❌ Missing selectedPeriod or selectedCurrency');
            return;
        }

        const periodCapitalized = this.selectedPeriod.charAt(0).toUpperCase() + this.selectedPeriod.slice(1);
        const salaryLabelKey = `enterSalaryPer${periodCapitalized}In${this.selectedCurrency}`;
        const translation = i18n.getTranslation(salaryLabelKey);
        console.log(`   - salaryLabelKey: ${salaryLabelKey}`);
        console.log(`   - translation: "${translation}"`);

        const labelEl = document.getElementById('salaryInputLabel');
        if (!labelEl) {
            console.error('❌ salaryInputLabel element not found in DOM');
            return;
        }

        labelEl.textContent = translation || salaryLabelKey;
        console.log(`   - ✅ salaryInputLabel set to: "${labelEl.textContent}"`);

        const inputEl = document.getElementById('salaryInput');
        if (inputEl) {
            inputEl.value = this.salary || '';
        }

        this.goToPage('taxes');
        this.loadTaxes();
        this.updateSalaryResults();
    }

    /**
     * Update and display salary calculation results
     */
    updateSalaryResults() {
        const salaryInput = document.getElementById('salaryInput');
        const resultsContainer = document.getElementById('salaryResultsContainer');
        const resultCurrencySelect = document.getElementById('resultCurrencySelect');
        const salary = parseFloat(salaryInput.value) || 0;

        console.log('📊 updateSalaryResults:', { salary, selectedCurrency: this.selectedCurrency, selectedPeriod: this.selectedPeriod });

        if (salary <= 0 || !this.selectedCurrency || !this.selectedPeriod) {
            resultsContainer.style.display = 'none';
            return;
        }

        // Get selected display currency
        const displayCurrency = (resultCurrencySelect.value || '').trim().toUpperCase();
        console.log('💱 Display currency value:', resultCurrencySelect.value);
        console.log('💱 Display currency cleaned:', displayCurrency);

        if (!displayCurrency) {
            console.error('❌ No display currency selected');
            resultsContainer.style.display = 'none';
            return;
        }

        // Currency icons
        const currencyIcons = {
            RUB: '₽',
            USD: '$',
            AMD: '֏'
        };

        console.log('🎯 Currency icons:', currencyIcons);
        console.log('🔍 Looking for:', displayCurrency, '→', currencyIcons[displayCurrency]);

        // Calculate average gross monthly salary in display currency
        const monthlyAmount = this.calculator.calculateAverageGrossMonthlySalary(
            salary,
            this.selectedPeriod,
            this.taxes || [],
            this.selectedCurrency,
            displayCurrency
        ) || 0;

        // Calculate gross yearly salary in display currency
        const yearlyAmount = this.calculator.getGrossYearlySalary(
            salary,
            this.selectedPeriod,
            this.taxes || [],
            this.selectedCurrency,
            displayCurrency
        ) || 0;

        // Calculate yearly taxes in display currency
        const yearlyTaxesAmount = this.calculator.getYearlyTaxes(
            salary,
            this.selectedPeriod,
            this.taxes || [],
            this.selectedCurrency,
            displayCurrency
        ) || 0;

        // Get currency icon - ensure it's never undefined
        let currencyIcon = currencyIcons[displayCurrency];
        if (!currencyIcon) {
            console.warn('⚠️  Currency icon not found for:', displayCurrency, 'Available:', Object.keys(currencyIcons));
            currencyIcon = displayCurrency; // Fallback to currency code
        }
        console.log('💰 Currency icon resolved to:', currencyIcon, 'type:', typeof currencyIcon);

        // Calculate monthly taxes
        const monthlyTaxesAmount = this.calculator.getMonthlyTaxes(
            salary,
            this.selectedPeriod,
            this.taxes || [],
            this.selectedCurrency,
            displayCurrency
        ) || 0;

        // Calculate net salaries (gross - taxes)
        const netMonthlySalary = (monthlyAmount || 0) - monthlyTaxesAmount;
        const netYearlySalary = (yearlyAmount || 0) - yearlyTaxesAmount;

        // Format all values with European style (1.320.000,00)
        const netMonthlyText = this.formatNumber(netMonthlySalary);
        const netYearlyText = this.formatNumber(netYearlySalary);
        const monthlyText = this.formatNumber(monthlyAmount || 0);
        const yearlyText = this.formatNumber(yearlyAmount || 0);
        const monthlyTaxesText = this.formatNumber(monthlyTaxesAmount);
        const taxesText = this.formatNumber(yearlyTaxesAmount || 0);

        console.log('🔧 Displaying all salary calculations...');
        console.log('Net:', { monthly: netMonthlyText, yearly: netYearlyText });
        console.log('Gross:', { monthly: monthlyText, yearly: yearlyText });
        console.log('Taxes:', { monthly: monthlyTaxesText, yearly: taxesText });

        // Display NET SALARY (top)
        document.getElementById('netMonthlySalary').textContent = netMonthlyText;
        document.getElementById('resultCurrencyIconNetMonthly').textContent = currencyIcon;

        document.getElementById('netYearlySalary').textContent = netYearlyText;
        document.getElementById('resultCurrencyIconNetYearly').textContent = currencyIcon;

        // Display GROSS SALARY
        document.getElementById('grossMonthlySalary').textContent = monthlyText;
        document.getElementById('resultCurrencyIcon').textContent = currencyIcon;

        document.getElementById('grossYearlySalary').textContent = yearlyText;
        document.getElementById('resultCurrencyIconYearly').textContent = currencyIcon;

        // Display TAXES
        document.getElementById('monthlyTaxes').textContent = monthlyTaxesText;
        document.getElementById('resultCurrencyIconMonthlyTaxes').textContent = currencyIcon;

        document.getElementById('yearlyTaxes').textContent = taxesText;
        document.getElementById('resultCurrencyIconTaxes').textContent = currencyIcon;

        resultsContainer.style.display = 'block';
        console.log('✅ All results displayed');
    }

    /**
     * Load taxes from IndexedDB
     */
    async loadTaxes() {
        try {
            const storeName = `${this.selectedWorkType}_taxes`;
            this.taxes = await db.getAllRecords(storeName);
            this.displayTaxes();
        } catch (error) {
            console.error('Error loading taxes:', error);
            this.taxes = [];
            this.displayTaxes();
        }
    }

    /**
     * Display taxes as buttons
     */
    displayTaxes() {
        const container = document.getElementById('taxesList');
        container.innerHTML = '';

        if (this.taxes.length === 0) {
            return;
        }

        console.log('🏷️ displayTaxes - Number of taxes:', this.taxes.length);
        console.log('📋 Tax data:', this.taxes);
        console.log('📋 TAXES JSON (for seeding):');
        console.log(JSON.stringify(this.taxes, null, 2));

        // Currency icons
        const currencyIcons = {
            RUB: '₽',
            USD: '$',
            AMD: '֏'
        };

        this.taxes.forEach((tax, index) => {
            console.log(`📌 Tax ${index}:`, tax);

            const btn = document.createElement('button');
            btn.className = 'tax-item';

            // Fallback to tax type translation if no label
            let label = tax.label?.[i18n.currentLanguage] || tax.label?.['en'];
            if (!label) {
                label = i18n.getTranslation(tax.type); // Falls back to 'fixed' or 'percentage' translation
            }
            console.log(`   Label: ${label}`);

            // Build type info (e.g., "25% M" or "1000 AMD Y")
            // Support both 'value' (new) and 'amount' (old) field names
            const taxValue = tax.value !== undefined ? tax.value : tax.amount;

            const payPerDisplay = tax.payPer ? (
                tax.payPer === 'hour' ? 'H' :
                tax.payPer === 'month' ? 'M' :
                tax.payPer === 'year' ? 'Y' :
                tax.payPer
            ) : '';

            let typeInfo = '';

            if (tax.type === 'percentage') {
                typeInfo = `${taxValue}%${payPerDisplay ? ` ${payPerDisplay}` : ''}`;
                console.log(`   Type: percentage → ${typeInfo}`);
            } else if (tax.type === 'fixed') {
                const currencyIcon = currencyIcons[tax.currency] || tax.currency || '?';
                typeInfo = `${taxValue} ${currencyIcon}${payPerDisplay ? ` ${payPerDisplay}` : ''}`;
                console.log(`   Type: fixed → ${typeInfo}`);
            } else {
                console.warn(`   ⚠️ Unknown type: ${tax.type}`);
            }

            // Build compact display: "Label (type info)"
            btn.innerHTML = `
                <div class="tax-item-header">
                    <span class="tax-item-label">${label}</span>
                    <span class="tax-item-type">${typeInfo}</span>
                </div>
            `;

            btn.addEventListener('click', () => {
                this.showTaxDetails(tax.id);
            });

            container.appendChild(btn);
        });
    }

    /**
     * Show tax details
     */
    showTaxDetails(taxId) {
        const tax = this.taxes.find(t => t.id === taxId);
        if (!tax) return;

        this.viewingTaxId = taxId;

        // Fallback to tax type translation if no label
        let label = tax.label?.[i18n.currentLanguage] || tax.label?.['en'];
        if (!label) {
            label = i18n.getTranslation(tax.type); // Falls back to 'fixed' or 'percentage' translation
        }
        const desc = tax.description?.[i18n.currentLanguage] || tax.description?.['en'] || '';

        // Build info based on type
        let info = '';
        if (tax.type === 'percentage') {
            info = `${tax.value}% • ${tax.payPer || 'N/A'}`;
        } else {
            info = `${tax.value} ${tax.currency} • ${tax.payPer}`;
        }

        document.getElementById('taxDetailLabel').textContent = label;
        document.getElementById('taxDetailInfo').textContent = info;
        document.getElementById('taxDetailDescription').textContent = desc || '(No description)';

        this.goToPage('taxDetails');
    }

    /**
     * Delete tax with confirmation
     */
    async deleteTax(taxId) {
        try {
            const storeName = `${this.selectedWorkType}_taxes`;
            await db.deleteRecord(storeName, taxId);
            this.viewingTaxId = null;
            await this.loadTaxes();
            this.goToPage('taxes');
        } catch (error) {
            console.error('Error deleting tax:', error);
            alert('Error deleting tax');
        }
    }

    /**
     * Initialize tax details form with language selection
     */
    initTaxDetailsForm() {
        // Initialize label and description objects
        this.currentTax.label = this.currentTax.label || {};
        this.currentTax.description = this.currentTax.description || {};

        // Use last selected language or default to current i18n language
        const lastTaxLang = localStorage.getItem('lastTaxFormLang');
        this.currentTaxLang = lastTaxLang || i18n.currentLanguage;

        // Update form label and input based on tax type
        const amountLabel = document.getElementById('taxAmountLabel');
        const amountInput = document.getElementById('taxAmount');

        if (amountLabel) {
            if (this.currentTax.type === 'percentage') {
                amountLabel.textContent = 'Percentage (%)';
                if (amountInput) {
                    amountInput.placeholder = 'e.g., 15';
                    amountInput.step = '0.1';
                    amountInput.max = '100';
                }
            } else {
                amountLabel.textContent = 'Amount';
                if (amountInput) {
                    amountInput.placeholder = '0';
                    amountInput.step = '0.01';
                    amountInput.removeAttribute('max');
                }
            }
        }

        // Wait a tick to ensure DOM is ready
        setTimeout(() => {
            // Remove any existing listeners by cloning
            const buttons = document.querySelectorAll('.lang-flag-btn');
            buttons.forEach(btn => {
                const newBtn = btn.cloneNode(true);
                btn.parentNode.replaceChild(newBtn, btn);
            });

            // Setup language flag buttons with new listeners
            document.querySelectorAll('.lang-flag-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.saveTaxFormFields();
                    const lang = e.target.getAttribute('data-lang');
                    this.currentTaxLang = lang;
                    localStorage.setItem('lastTaxFormLang', lang);
                    this.updateTaxDetailsForm();
                });
            });

            // Update form display (this will set active state)
            this.updateTaxDetailsForm();
        }, 0);
    }

    /**
     * Update form fields based on current language
     */
    updateTaxDetailsForm() {
        const lang = this.currentTaxLang;

        // Update input values
        const labelInput = document.getElementById('taxLabelInput');
        const descInput = document.getElementById('taxDescInput');
        const amountInput = document.getElementById('taxAmount');

        if (labelInput) labelInput.value = this.currentTax.label[lang] || '';
        if (descInput) descInput.value = this.currentTax.description[lang] || '';
        if (amountInput) amountInput.value = this.currentTax.value || '';

        // Update active language button styling
        const buttons = document.querySelectorAll('.lang-flag-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Save current form fields to current tax object
     */
    saveTaxFormFields() {
        const lang = this.currentTaxLang;
        const label = document.getElementById('taxLabelInput').value.trim();
        const desc = document.getElementById('taxDescInput').value.trim();
        const amount = document.getElementById('taxAmount').value;

        if (label) {
            this.currentTax.label[lang] = label;
        }
        if (desc) {
            this.currentTax.description[lang] = desc;
        }
        if (amount) {
            this.currentTax.value = parseFloat(amount);
        }
    }

    /**
     * Save tax to IndexedDB (new or update)
     */
    async saveTax() {
        // Save current form fields
        this.saveTaxFormFields();

        // Validate at least one language has a label
        const hasLabel = Object.values(this.currentTax.label || {}).some(v => v);
        if (!hasLabel) {
            alert('At least one label is required');
            return;
        }

        if (!this.currentTax.value && this.currentTax.value !== 0) {
            alert('Amount is required');
            return;
        }

        this.currentTax.workType = this.selectedWorkType;

        try {
            const storeName = `${this.selectedWorkType}_taxes`;

            // If tax has an id, it's an update; otherwise, it's new
            if (this.currentTax.id) {
                await db.updateRecord(storeName, this.currentTax);
                console.log('✅ Tax updated:', this.currentTax.id);
            } else {
                await db.addRecord(storeName, this.currentTax);
                console.log('✅ Tax added');
            }

            // Clear form
            document.getElementById('taxLabelInput').value = '';
            document.getElementById('taxDescInput').value = '';
            document.getElementById('taxAmount').value = '';

            this.currentTax = {};
            await this.loadTaxes();
            this.goToPage('taxes');
        } catch (error) {
            console.error('Error saving tax:', error);
            alert('Error saving tax: ' + error.message);
        }
    }

    /**
     * Register Service Worker for offline support
     */
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    /**
     * TODO: Implement
     * - Session management
     * - Data sync across tabs
     * - Notifications
     * - Analytics tracking
     * - Error handling and logging
     * - Progressive Web App features
     */
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new SalaryCalcApp();
    });
} else {
    window.app = new SalaryCalcApp();
}
