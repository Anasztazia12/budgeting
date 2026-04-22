(function initializeBudgetAppShared() {
    const KEYS = {
        USERS_KEY: "budgetAppUsers",
        SESSION_KEY: "budgetAppSession",
        LANGUAGE_KEY: "budgetAppLanguage",
        THEME_KEY: "budgetAppTheme",
        CURRENCY_KEY: "budgetAppCurrency",
        INSTALL_STATUS_KEY: "budgetAppInstalled",
        GUEST_DATA_KEY: "budgetAppGuestData"
    };

    const GUEST_SESSION_VALUE = "__guest__";

    function safeParseObject(raw) {
        if (!raw) {
            return null;
        }

        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === "object" ? parsed : null;
        } catch (_error) {
            return null;
        }
    }

    function normalizeEntriesData(data) {
        return {
            incomes: Array.isArray(data && data.incomes) ? data.incomes : [],
            expenses: Array.isArray(data && data.expenses) ? data.expenses : []
        };
    }

    function loadUsers() {
        const parsed = safeParseObject(localStorage.getItem(KEYS.USERS_KEY));
        return parsed || {};
    }

    function saveUsers(users) {
        localStorage.setItem(KEYS.USERS_KEY, JSON.stringify(users || {}));
    }

    function loadSession(userMap) {
        const saved = localStorage.getItem(KEYS.SESSION_KEY);
        if (saved === GUEST_SESSION_VALUE) {
            return saved;
        }

        if (saved && userMap && userMap[saved]) {
            return saved;
        }

        return "";
    }

    function loadLanguage() {
        return localStorage.getItem(KEYS.LANGUAGE_KEY) === "en" ? "en" : "hu";
    }

    function saveLanguage(language) {
        localStorage.setItem(KEYS.LANGUAGE_KEY, language === "en" ? "en" : "hu");
    }

    function loadTheme() {
        return localStorage.getItem(KEYS.THEME_KEY) === "dark" ? "dark" : "light";
    }

    function saveTheme(theme) {
        localStorage.setItem(KEYS.THEME_KEY, theme === "dark" ? "dark" : "light");
    }

    function loadCurrency() {
        const saved = localStorage.getItem(KEYS.CURRENCY_KEY);
        return ["HUF", "GBP", "USD", "EUR"].includes(saved) ? saved : "HUF";
    }

    function saveCurrency(currency) {
        const value = ["HUF", "GBP", "USD", "EUR"].includes(currency) ? currency : "HUF";
        localStorage.setItem(KEYS.CURRENCY_KEY, value);
    }

    function toMonthInput(dateObj) {
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        return `${dateObj.getFullYear()}-${month}`;
    }

    function toDateInput(dateObj) {
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${dateObj.getFullYear()}-${month}-${day}`;
    }

    function getMonthEndDate(monthValue, fallbackDateObj) {
        const [year, month] = (monthValue || "").split("-").map(Number);
        if (!year || !month) {
            return toDateInput(fallbackDateObj || new Date());
        }

        const day = new Date(year, month, 0).getDate();
        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }

    function monthEntries(entries, activeMonth) {
        return (Array.isArray(entries) ? entries : []).filter((item) => String(item.date || "").startsWith(activeMonth));
    }

    function sumEntries(entries) {
        return (Array.isArray(entries) ? entries : []).reduce((sum, item) => sum + Number((item && item.amount) || 0), 0);
    }

    function createEntryId() {
        if (window.crypto && typeof window.crypto.randomUUID === "function") {
            return window.crypto.randomUUID();
        }

        return `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function isAppInstalled() {
        const standaloneMode = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
        const iosStandalone = window.navigator.standalone === true;
        const stored = localStorage.getItem(KEYS.INSTALL_STATUS_KEY) === "1";
        return standaloneMode || iosStandalone || stored;
    }

    function loadGuestData() {
        const parsed = safeParseObject(localStorage.getItem(KEYS.GUEST_DATA_KEY));
        return normalizeEntriesData(parsed);
    }

    function saveGuestData(data) {
        localStorage.setItem(KEYS.GUEST_DATA_KEY, JSON.stringify(normalizeEntriesData(data)));
    }

    function getCurrentUserState(currentUser, users) {
        if (currentUser === GUEST_SESSION_VALUE) {
            return loadGuestData();
        }

        if (!currentUser || !users || !users[currentUser]) {
            return { incomes: [], expenses: [] };
        }

        return normalizeEntriesData(users[currentUser].data || {});
    }

    window.BudgetAppShared = {
        KEYS,
        GUEST_SESSION_VALUE,
        loadUsers,
        saveUsers,
        loadSession,
        loadLanguage,
        saveLanguage,
        loadTheme,
        saveTheme,
        loadCurrency,
        saveCurrency,
        toMonthInput,
        toDateInput,
        getMonthEndDate,
        monthEntries,
        sumEntries,
        createEntryId,
        isAppInstalled,
        loadGuestData,
        saveGuestData,
        getCurrentUserState
    };
})();
