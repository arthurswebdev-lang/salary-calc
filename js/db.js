/**
 * IndexedDB Database Manager
 * Handles all data persistence for the Salary Calculator
 * Optimized for iOS home screen app and offline use
 */

class DatabaseManager {
    constructor() {
        this.dbName = 'SalaryCalc';
        this.version = 1;
        this.db = null;
        this.dbAvailable = true;
        this.ready = this.init();
    }

    /**
     * Initialize IndexedDB
     */
    async init() {
        return new Promise((resolve, reject) => {
            try {
                if (!indexedDB) {
                    console.error('IndexedDB not available');
                    this.dbAvailable = false;
                    resolve();
                    return;
                }

                const request = indexedDB.open(this.dbName, this.version);

                request.onerror = () => {
                    console.error('Database failed to open:', request.error);
                    this.dbAvailable = false;
                    reject(request.error);
                };

                request.onsuccess = () => {
                    this.db = request.result;
                    console.log('IndexedDB opened successfully');
                    resolve();
                };

                request.onupgradeneeded = (event) => {
                    this.db = event.target.result;
                    console.log('IndexedDB upgrade needed, creating stores');
                    this.createObjectStores(this.db);
                };
            } catch (e) {
                console.error('Error initializing IndexedDB:', e);
                this.dbAvailable = false;
                resolve();
            }
        });
    }

    /**
     * Create all object stores
     */
    createObjectStores(db) {
        // Individual Entrepreneur - Income Records
        if (!db.objectStoreNames.contains('individual_income')) {
            const incomeStore = db.createObjectStore('individual_income', {
                keyPath: 'id',
                autoIncrement: true
            });
            incomeStore.createIndex('date', 'date', { unique: false });
            incomeStore.createIndex('month', 'month', { unique: false });
        }

        // Individual Entrepreneur - Tax Records
        if (!db.objectStoreNames.contains('individual_taxes')) {
            const taxStore = db.createObjectStore('individual_taxes', {
                keyPath: 'id',
                autoIncrement: true
            });
            taxStore.createIndex('date', 'date', { unique: false });
            taxStore.createIndex('type', 'type', { unique: false });
        }

        // Individual Entrepreneur - Settings
        if (!db.objectStoreNames.contains('individual_settings')) {
            db.createObjectStore('individual_settings', { keyPath: 'key' });
        }

        // Registered Company - Revenue Records
        if (!db.objectStoreNames.contains('registered_revenue')) {
            const revenueStore = db.createObjectStore('registered_revenue', {
                keyPath: 'id',
                autoIncrement: true
            });
            revenueStore.createIndex('date', 'date', { unique: false });
            revenueStore.createIndex('source', 'source', { unique: false });
        }

        // Registered Company - Expense Records
        if (!db.objectStoreNames.contains('registered_expenses')) {
            const expenseStore = db.createObjectStore('registered_expenses', {
                keyPath: 'id',
                autoIncrement: true
            });
            expenseStore.createIndex('date', 'date', { unique: false });
            expenseStore.createIndex('category', 'category', { unique: false });
        }

        // Registered Company - Payroll
        if (!db.objectStoreNames.contains('registered_payroll')) {
            const payrollStore = db.createObjectStore('registered_payroll', {
                keyPath: 'id',
                autoIncrement: true
            });
            payrollStore.createIndex('date', 'date', { unique: false });
            payrollStore.createIndex('employeeId', 'employeeId', { unique: false });
        }

        // Registered Company - Settings
        if (!db.objectStoreNames.contains('registered_settings')) {
            db.createObjectStore('registered_settings', { keyPath: 'key' });
        }

        // User Preferences (Global)
        if (!db.objectStoreNames.contains('preferences')) {
            db.createObjectStore('preferences', { keyPath: 'key' });
        }

        console.log('Object stores created/verified');
    }

    /**
     * Add record to store
     */
    async addRecord(storeName, data) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Update record
     */
    async updateRecord(storeName, data) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get record by ID
     */
    async getRecord(storeName, id) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get all records from store
     */
    async getAllRecords(storeName) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Query by index
     */
    async queryByIndex(storeName, indexName, value) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete record
     */
    async deleteRecord(storeName, id) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear entire store
     */
    async clearStore(storeName) {
        await this.ready;
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * TODO: Implement
     * - Export data to JSON/CSV
     * - Import data from JSON/CSV
     * - Backup/Restore functionality
     * - Cloud synchronization
     * - Data migration between versions
     */
}

// Global instance
const db = new DatabaseManager();
