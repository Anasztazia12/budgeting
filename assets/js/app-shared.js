(function initializeBudgetAppShared() {
    const KEYS = {
        SESSION_KEY: "budgetAppSession",
        DISPLAY_NAME_KEY: "budgetAppDisplayName",
        LANGUAGE_KEY: "budgetAppLanguage",
        THEME_KEY: "budgetAppTheme",
        CURRENCY_KEY: "budgetAppCurrency",
        INSTALL_STATUS_KEY: "budgetAppInstalled",
        GUEST_DATA_KEY: "budgetAppGuestData",
        FLASH_MESSAGE_KEY: "budgetAppFlashMessage"
    };

    const GUEST_SESSION_VALUE = "__guest__";
    const VALID_CURRENCIES = ["HUF", "GBP", "USD", "EUR"];

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
        return VALID_CURRENCIES.includes(saved) ? saved : "HUF";
    }

    function saveCurrency(currency) {
        localStorage.setItem(KEYS.CURRENCY_KEY, VALID_CURRENCIES.includes(currency) ? currency : "HUF");
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

    function createSalt() {
        if (window.crypto && typeof window.crypto.getRandomValues === "function") {
            const values = new Uint8Array(16);
            window.crypto.getRandomValues(values);
            return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
        }

        return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
    }

    async function hashPassword(password, salt) {
        const source = `${salt}:${password}`;
        if (window.crypto && window.crypto.subtle && typeof TextEncoder !== "undefined") {
            const data = new TextEncoder().encode(source);
            const digest = await window.crypto.subtle.digest("SHA-256", data);
            return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
        }

        let hash = 2166136261;
        for (let index = 0; index < source.length; index += 1) {
            hash ^= source.charCodeAt(index);
            hash = Math.imul(hash, 16777619);
        }

        return `fallback-${(hash >>> 0).toString(16)}`;
    }

    async function verifyPassword(userRecord, password, onLegacyUpgrade) {
        if (userRecord.hashedPassword && userRecord.salt) {
            const candidateHash = await hashPassword(password, userRecord.salt);
            return candidateHash === userRecord.hashedPassword;
        }

        if (userRecord.password && userRecord.password === password) {
            const salt = createSalt();
            userRecord.salt = salt;
            userRecord.hashedPassword = await hashPassword(password, salt);
            delete userRecord.password;
            if (typeof onLegacyUpgrade === "function") {
                onLegacyUpgrade();
            }
            return true;
        }

        return false;
    }

    function isAppInstalled() {
        const standaloneMode = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
        const iosStandalone = window.navigator.standalone === true;
        const stored = localStorage.getItem(KEYS.INSTALL_STATUS_KEY) === "1";
        return standaloneMode || iosStandalone || stored;
    }

    function getInstallPlatform() {
        const userAgent = (window.navigator.userAgent || "").toLowerCase();
        const vendor = (window.navigator.vendor || "").toLowerCase();
        const isIPhone = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        const isSamsung = /samsungbrowser/.test(userAgent) || vendor.includes("samsung");

        if (isIPhone) {
            return "ios";
        }

        if (isAndroid || isSamsung) {
            return "android";
        }

        return "other";
    }

    function getInstallUnavailableMessage(language) {
        const locale = language === "en" ? "en" : "hu";
        const platform = getInstallPlatform();

        if (locale === "en") {
            if (platform === "ios") {
                return "Install is not available here. iPhone: Safari Share -> Add to Home Screen.";
            }

            if (platform === "android") {
                return "Install is not available here. Android/Samsung: browser menu -> Add to Home screen.";
            }

            return "Install is not available here. iPhone: Safari Share -> Add to Home Screen. Android/Samsung: browser menu -> Add to Home screen.";
        }

        if (platform === "ios") {
            return "Az app innen nem telepíthető. iPhone: Safari Megosztás -> Hozzáadás a Főképernyőhöz.";
        }

        if (platform === "android") {
            return "Az app innen nem telepíthető. Android/Samsung: böngésző menü -> Hozzáadás a kezdőképernyőhöz.";
        }

        return "Az app innen nem telepíthető. iPhone: Safari Megosztás -> Hozzáadás a Főképernyőhöz. Android/Samsung: böngésző menü -> Hozzáadás a kezdőképernyőhöz.";
    }

    function loadGuestData() {
        const parsed = safeParseObject(localStorage.getItem(KEYS.GUEST_DATA_KEY));
        return normalizeEntriesData(parsed);
    }

    function saveGuestData(data) {
        localStorage.setItem(KEYS.GUEST_DATA_KEY, JSON.stringify(normalizeEntriesData(data)));
    }

    function buildMailtoUrl(to, subject, body) {
        const recipient = encodeURIComponent(String(to || "").trim());
        const params = new URLSearchParams({
            subject: String(subject || ""),
            body: String(body || "")
        });
        return `mailto:${recipient}?${params.toString()}`;
    }

    function openEmailDraft(to, subject, body) {
        const address = String(to || "").trim();
        if (!address) {
            return false;
        }

        window.location.href = buildMailtoUrl(address, subject, body);
        return true;
    }

    async function sendRegistrationEmail(_language, email, username) {
        const name = username || "";
        const subject = "Thanks for registering";
        const body = `Hello ${name},\n\nThank you for registering.\nRegistration successful with this username: ${name}.\n\nBudgeting App`;
        return openEmailDraft(email, subject, body);
    }

    async function sendAccountDeletionEmail(_language, email, username) {
        const name = username || "";
        const subject = "Account deleted";
        const body = `Hello ${name},\n\nYour account has been deleted successfully.\n\nBudgeting App`;
        return openEmailDraft(email, subject, body);
    }

    function getDeleteAccountConfirmMessage(language, username) {
        const locale = language === "en" ? "en" : "hu";
        if (locale === "en") {
            return `Are you sure you want to delete this account (${username})?`;
        }

        return `Biztosan torolni szeretned ezt az accountot (${username})?`;
    }

    function getDeleteAccountNoSessionMessage(language, isGuestMode = false) {
        if (language === "en") {
            return isGuestMode
                ? "You are signed in as a guest. Sign in with a registered account to delete it."
                : "Please sign in with a registered account first.";
        }

        return isGuestMode
            ? "Vendegkent vagy bejelentkezve. Fiok torlesehez regisztralt fiokkal jelentkezz be."
            : "Eloszor jelentkezz be regisztralt fiokkal.";
    }

    function getDeleteAccountSuccessMessage(language) {
        return language === "en"
            ? "Account deleted successfully."
            : "Az account sikeresen torolve.";
    }

    function setFlashMessage(message, isError) {
        try {
            sessionStorage.setItem(
                KEYS.FLASH_MESSAGE_KEY,
                JSON.stringify({
                    message: String(message || ""),
                    isError: Boolean(isError)
                })
            );
        } catch (_error) {
            // Flash messages are optional enhancements.
        }
    }

    function consumeFlashMessage() {
        try {
            const raw = sessionStorage.getItem(KEYS.FLASH_MESSAGE_KEY);
            if (!raw) {
                return null;
            }

            sessionStorage.removeItem(KEYS.FLASH_MESSAGE_KEY);
            const parsed = safeParseObject(raw);
            if (!parsed || typeof parsed.message !== "string") {
                return null;
            }

            return {
                message: parsed.message,
                isError: Boolean(parsed.isError)
            };
        } catch (_error) {
            return null;
        }
    }

    window.BudgetAppShared = {
        KEYS,
        GUEST_SESSION_VALUE,
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
        createSalt,
        hashPassword,
        verifyPassword,
        isAppInstalled,
        getInstallUnavailableMessage,
        loadGuestData,
        saveGuestData,
        setFlashMessage,
        consumeFlashMessage,
        sendRegistrationEmail,
        sendAccountDeletionEmail,
        getDeleteAccountConfirmMessage,
        getDeleteAccountNoSessionMessage,
        getDeleteAccountSuccessMessage
    };
})();
