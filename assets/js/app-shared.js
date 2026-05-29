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
        const parsed = safeParseObject(sessionStorage.getItem(KEYS.GUEST_DATA_KEY));
        return normalizeEntriesData(parsed);
    }

    function saveGuestData(data) {
        sessionStorage.setItem(KEYS.GUEST_DATA_KEY, JSON.stringify(normalizeEntriesData(data)));
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

    // EmailJS credentials — sign up at https://emailjs.com, create a Gmail service,
    // and add a template with variables: {{to_email}}, {{to_name}}, {{message}}
    const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
    const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";

    async function sendAccountDeletionEmail(_language, email, username) {
        const name = username || "";
        try {
            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_PUBLIC_KEY,
                    template_params: {
                        to_email: email,
                        to_name: name,
                        message: `Hello ${name},\n\nYour account has been deleted successfully.\n\nBudgeting App`
                    }
                })
            });
            return res.ok;
        } catch (_err) {
            return false;
        }
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

// ── Auto-logout after 5 minutes of inactivity ──
(function setupAutoLogout() {
    const TIMEOUT_MS = 5 * 60 * 1000;
    const GUEST_VALUE = "__guest__";
    let timer = null;

    function isLoggedIn() {
        const s = localStorage.getItem("budgetAppSession");
        return s && s !== GUEST_VALUE;
    }

    function onIndexPage() {
        const p = window.location.pathname;
        return p.endsWith("index.html") || p.endsWith("/");
    }

    function performLogout() {
        localStorage.removeItem("budgetAppSession");
        localStorage.removeItem("budgetAppDisplayName");
        const svc = window.BudgetAppFirebaseService;
        if (svc?.logoutCurrentUser) {
            svc.logoutCurrentUser().catch(() => null).finally(() => { window.location.href = "index.html"; });
        } else {
            window.location.href = "index.html";
        }
    }

    function resetTimer() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(performLogout, TIMEOUT_MS);
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (!isLoggedIn() || onIndexPage()) return;
        ["click", "keydown", "mousemove", "touchstart", "scroll"].forEach((e) => {
            document.addEventListener(e, resetTimer, { passive: true });
        });
        resetTimer();
    });
})();

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("budgetAppLanguage") || "hu";
    const isEn = lang === "en";

    // Inject profile modal
    document.body.insertAdjacentHTML("beforeend", `
        <div id="profile-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="profile-modal-title">
            <div class="modal-card">
                <h3 id="profile-modal-title"></h3>
                <p id="profile-modal-message" class="auth-message hidden" aria-live="polite"></p>
                <form id="profile-modal-form" class="stack"></form>
                <button type="button" id="profile-modal-close" class="btn btn-outline-info" style="margin-top:0.4rem">${isEn ? "Cancel" : "Mégse"}</button>
            </div>
        </div>
    `);

    const modal = document.getElementById("profile-modal");
    const modalTitle = document.getElementById("profile-modal-title");
    const modalMsg = document.getElementById("profile-modal-message");
    const modalForm = document.getElementById("profile-modal-form");
    const modalClose = document.getElementById("profile-modal-close");

    function showMsg(text, isError) {
        modalMsg.textContent = text;
        modalMsg.classList.toggle("hidden", !text);
        modalMsg.classList.toggle("error", isError);
        modalMsg.classList.toggle("ok", !isError);
    }

    function closeModal() {
        modal.classList.add("hidden");
        showMsg("", false);
        modalForm.innerHTML = "";
        modalForm.onsubmit = null;
    }

    function closeMenu() {
        const panel = document.getElementById("menu-panel");
        const toggle = document.getElementById("menu-toggle");
        if (panel) { panel.classList.remove("is-open"); }
        if (toggle) { toggle.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    }

    function openUsernameModal() {
        closeMenu();
        modalTitle.textContent = isEn ? "Change username" : "Felhasználónév módosítása";
        modalForm.innerHTML = `
            <label for="pm-cur-username">${isEn ? "Current username" : "Jelenlegi felhasználónév"}</label>
            <input type="text" id="pm-cur-username" required autocomplete="off">
            <label for="pm-new-username">${isEn ? "New username" : "Új felhasználónév"}</label>
            <input type="text" id="pm-new-username" required autocomplete="off">
            <label for="pm-confirm-username">${isEn ? "Confirm new username" : "Új felhasználónév megerősítése"}</label>
            <input type="text" id="pm-confirm-username" required autocomplete="off">
            <button type="submit" class="btn btn-outline-info">${isEn ? "Save" : "Mentés"}</button>
        `;
        showMsg("", false);
        modal.classList.remove("hidden");
        document.getElementById("pm-cur-username").focus();

        modalForm.onsubmit = async (e) => {
            e.preventDefault();
            const currentUsername = document.getElementById("pm-cur-username").value.trim();
            const newUsername = document.getElementById("pm-new-username").value.trim();
            const confirmUsername = document.getElementById("pm-confirm-username").value.trim();

            const storedName = localStorage.getItem("budgetAppDisplayName") || localStorage.getItem("budgetAppSession") || "";
            if (currentUsername.toLowerCase() !== storedName.toLowerCase()) {
                showMsg(isEn ? "Current username is incorrect." : "A jelenlegi felhasználónév helytelen.", true);
                return;
            }
            if (newUsername !== confirmUsername) {
                showMsg(isEn ? "New usernames do not match." : "Az új felhasználónevek nem egyeznek.", true);
                return;
            }
            try {
                const svc = window.BudgetAppFirebaseService;
                const session = await svc.changeCurrentUsername({ newUsername });
                const newName = session?.profile?.username || newUsername;
                localStorage.setItem("budgetAppSession", newName);
                localStorage.setItem("budgetAppDisplayName", newName);
                const sessionEl = document.getElementById("menu-session-info");
                if (sessionEl) sessionEl.textContent = `${isEn ? "Signed in as:" : "Bejelentkezve:"} ${newName}`;
                showMsg(isEn ? "Username changed successfully." : "A felhasználónév sikeresen módosítva.", false);
                modalForm.reset();
            } catch (err) {
                const msg = window.BudgetAppFirebaseService?.getFirebaseErrorMessage?.(err, lang, "generic") || (isEn ? "An error occurred." : "Hiba történt.");
                showMsg(msg, true);
            }
        };
    }

    function openPasswordModal() {
        closeMenu();
        modalTitle.textContent = isEn ? "Change password" : "Jelszó módosítása";
        const showLabel = isEn ? "Show password" : "Jelszó mutatása";
        const hideLabel = isEn ? "Hide password" : "Jelszó elrejtése";
        modalForm.innerHTML = `
            <label for="pm-cur-pw">${isEn ? "Current password" : "Jelenlegi jelszó"}</label>
            <div class="password-wrapper">
                <input type="password" id="pm-cur-pw" required>
                <button type="button" class="password-visibility-toggle" data-for="pm-cur-pw" aria-label="${showLabel}" aria-pressed="false" title="${showLabel}">👁</button>
            </div>
            <label for="pm-new-pw">${isEn ? "New password" : "Új jelszó"}</label>
            <div class="password-wrapper">
                <input type="password" id="pm-new-pw" minlength="6" maxlength="20" required>
                <button type="button" class="password-visibility-toggle" data-for="pm-new-pw" aria-label="${showLabel}" aria-pressed="false" title="${showLabel}">👁</button>
            </div>
            <label for="pm-confirm-pw">${isEn ? "Confirm new password" : "Új jelszó megerősítése"}</label>
            <div class="password-wrapper">
                <input type="password" id="pm-confirm-pw" minlength="6" maxlength="20" required>
                <button type="button" class="password-visibility-toggle" data-for="pm-confirm-pw" aria-label="${showLabel}" aria-pressed="false" title="${showLabel}">👁</button>
            </div>
            <button type="submit" class="btn btn-outline-info">${isEn ? "Save" : "Mentés"}</button>
        `;
        showMsg("", false);
        modal.classList.remove("hidden");
        document.getElementById("pm-cur-pw").focus();

        modalForm.querySelectorAll(".password-visibility-toggle").forEach((btn) => {
            btn.addEventListener("click", () => {
                const input = document.getElementById(btn.dataset.for);
                if (!input) return;
                const show = input.type === "password";
                input.type = show ? "text" : "password";
                btn.setAttribute("aria-pressed", String(show));
                btn.setAttribute("aria-label", show ? hideLabel : showLabel);
                btn.setAttribute("title", show ? hideLabel : showLabel);
            });
        });

        modalForm.onsubmit = async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById("pm-cur-pw").value;
            const newPassword = document.getElementById("pm-new-pw").value;
            const confirmPassword = document.getElementById("pm-confirm-pw").value;
            if (newPassword !== confirmPassword) { showMsg(isEn ? "Passwords do not match." : "A jelszavak nem egyeznek.", true); return; }
            const strong = newPassword.length >= 6 && newPassword.length <= 20 && /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) && /\d/.test(newPassword);
            if (!strong) { showMsg(isEn ? "Password must be 6-20 chars with uppercase, lowercase and a number." : "A jelszó 6-20 karakter, tartalmazzon kis- és nagybetűt és számot.", true); return; }
            try {
                await window.BudgetAppFirebaseService.changeCurrentUserPassword({ currentPassword, newPassword });
                showMsg(isEn ? "Password changed successfully." : "A jelszó sikeresen módosítva.", false);
                modalForm.reset();
            } catch (err) {
                const msg = window.BudgetAppFirebaseService?.getFirebaseErrorMessage?.(err, lang, "reset") || (isEn ? "An error occurred." : "Hiba történt.");
                showMsg(msg, true);
            }
        };
    }

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal(); });

    // Menu toggle
    const menuProfileToggle = document.getElementById("menu-profile-toggle");
    const menuProfileOptions = document.getElementById("menu-profile-options");
    if (menuProfileToggle && menuProfileOptions) {
        menuProfileToggle.addEventListener("click", () => menuProfileOptions.classList.toggle("hidden"));
    }

    const menuChangeUsername = document.getElementById("menu-change-username");
    if (menuChangeUsername) menuChangeUsername.addEventListener("click", openUsernameModal);

    const menuChangePassword = document.getElementById("menu-change-password");
    if (menuChangePassword) menuChangePassword.addEventListener("click", openPasswordModal);
});
