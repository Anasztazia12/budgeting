const USERS_KEY = "budgetAppUsers";
        const SESSION_KEY = "budgetAppSession";
        const LANGUAGE_KEY = "budgetAppLanguage";
        const THEME_KEY = "budgetAppTheme";
        const INSTALL_STATUS_KEY = "budgetAppInstalled";
        const GUEST_SESSION_VALUE = "__guest__";
        const GUEST_DATA_KEY = "budgetAppGuestData";

        const dictionary = {
            hu: {
                pageTitle: "Költségvetési app",
                heroTitle: "Költségvetési app",
                heroText: "Jelentkezz be, regisztrálj vagy folytasd vendégként.",
                versionLabel: "Verzió",
                menuButton: "Menü",
                homeLink: "Kezdőlap",
                budgetLink: "Költségvetés",
                monthlyLink: "Havi összegzés",
                themeModeLabel: "Téma",
                themeModeLight: "Világos",
                themeModeDark: "Sötét",
                backAction: "Vissza",
                languageLabel: "Nyelv",
                appName: "Költségvetési app",
                registerTitle: "Regisztráció",
                loginTitle: "Bejelentkezés",
                usernameLabel: "Felhasználónév",
                emailLabel: "Email cím",
                emailConfirmLabel: "Email cím megerősítése",
                passwordLabel: "Jelszó",
                passwordConfirmLabel: "Jelszó megerősítése",
                registerButton: "Regisztrálok",
                loginButton: "Belépés",
                guestButton: "Folytatás vendégként",
                downloadAppButton: "App letöltése",
                logoutButton: "Kijelentkezés",
                budgetTitle: "Költségvetés",
                budgetText: "Bevétel és kiadás rögzítés, szerkesztés, törlés, CSV export és felhasználókezelés.",
                monthlyTitle: "Havi összegzés",
                monthlyText: "Havi összegzés, mai napig kiadás, jövőbeli bevételek és kiadások dátum szerint.",
                openButton: "Megnyitás",
                loggedOut: "Nincs bejelentkezett felhasználó.",
                loggedIn: "Bejelentkezve:",
                guestUser: "Vendég",
                emailMismatch: "Az email címek nem egyeznek.",
                passwordMismatch: "A jelszavak nem egyeznek.",
                usernameTaken: "Ez a felhasználónév már foglalt.",
                registerSuccess: "Sikeres regisztráció.",
                loginSuccess: "Sikeres bejelentkezés.",
                guestSuccess: "Vendég mód aktív.",
                logoutSuccess: "Sikeres kijelentkezés.",
                invalidLogin: "Hibás felhasználónév vagy jelszó.",
                appInstalled: "Az app telepítve.",
                appDownloaded: "Az app letöltve.",
                appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
                footerText: "Minden jog fenntartva."
            },
            en: {
                pageTitle: "Budgeting App",
                heroTitle: "Budgeting App",
                heroText: "Sign in, register, or continue as a guest.",
                versionLabel: "Version",
                menuButton: "Menu",
                homeLink: "Home",
                budgetLink: "Budget",
                monthlyLink: "Monthly Budget",
                themeModeLabel: "Theme",
                themeModeLight: "Light",
                themeModeDark: "Dark",
                backAction: "Back",
                languageLabel: "Language",
                appName: "Budgeting App",
                registerTitle: "Register",
                loginTitle: "Sign in",
                usernameLabel: "Username",
                emailLabel: "Email address",
                emailConfirmLabel: "Confirm email address",
                passwordLabel: "Password",
                passwordConfirmLabel: "Confirm password",
                registerButton: "Create account",
                loginButton: "Sign in",
                guestButton: "Continue as guest",
                downloadAppButton: "Download App",
                logoutButton: "Sign out",
                budgetTitle: "Budget",
                budgetText: "Income and expense capture, edit/delete, CSV export, and user management.",
                monthlyTitle: "Monthly Budget",
                monthlyText: "Monthly summary, spending to date, and upcoming dated income and expenses.",
                openButton: "Open",
                loggedOut: "No user is signed in.",
                loggedIn: "Signed in as:",
                guestUser: "Guest",
                emailMismatch: "Email addresses do not match.",
                passwordMismatch: "Passwords do not match.",
                usernameTaken: "This username is already taken.",
                registerSuccess: "Registration successful.",
                loginSuccess: "Signed in successfully.",
                guestSuccess: "Guest mode enabled.",
                logoutSuccess: "Signed out successfully.",
                invalidLogin: "Invalid username or password.",
                appInstalled: "App installed.",
                appDownloaded: "App downloaded.",
                appInstallUnavailable: "App install is not available on this device right now.",
                footerText: "All rights reserved."
            }
        };

        const users = loadUsers();
        const menuToggle = document.getElementById("menu-toggle");
        const menuPanel = document.getElementById("menu-panel");
        const menuBackButton = document.getElementById("menu-back-button");
        const menuLogoutButton = document.getElementById("menu-logout-button");
        const authActions = document.getElementById("auth-actions");
        const authOptions = document.getElementById("auth-options");
        const showRegisterButton = document.getElementById("show-register-button");
        const showLoginButton = document.getElementById("show-login-button");
        const registerCard = document.getElementById("register-card");
        const loginCard = document.getElementById("login-card");
        const registerForm = document.getElementById("register-form");
        const loginForm = document.getElementById("login-form");
        const guestButton = document.getElementById("guest-button");
        const installAppButton = document.getElementById("install-app-button");
        const themeLightButton = document.getElementById("theme-light-button");
        const themeDarkButton = document.getElementById("theme-dark-button");
        const logoutButton = document.getElementById("logout-button");
        const sessionInfo = document.getElementById("session-info");
        const authMessage = document.getElementById("auth-message");
        const appLinks = document.getElementById("app-links");
        const languageSelect = document.getElementById("app-language");
        let deferredInstallPrompt = null;
        let currentUser = loadSession(users);
        let appLanguage = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "hu";
        let appTheme = loadTheme();

        initializePage();

        menuToggle.addEventListener("click", () => {
            const isOpen = menuPanel.classList.toggle("is-open");
            menuToggle.classList.toggle("is-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        menuBackButton.addEventListener("click", () => {
            window.history.back();
        });

        menuLogoutButton.addEventListener("click", () => {
            performLogout();
            showMessage(t("logoutSuccess"), false);
        });

        if (themeLightButton) {
            themeLightButton.addEventListener("click", () => {
                setTheme("light");
            });
        }

        if (themeDarkButton) {
            themeDarkButton.addEventListener("click", () => {
                setTheme("dark");
            });
        }

        document.addEventListener("click", (event) => {
            if (!event.target.closest(".menu-wrap")) {
                menuPanel.classList.remove("is-open");
                menuToggle.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuPanel.classList.contains("is-open")) {
                menuPanel.classList.remove("is-open");
                menuToggle.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.focus();
            }
        });

        showRegisterButton.addEventListener("click", () => {
            authOptions.classList.remove("hidden");
            registerCard.classList.remove("hidden");
            loginCard.classList.add("hidden");
        });

        showLoginButton.addEventListener("click", () => {
            authOptions.classList.remove("hidden");
            loginCard.classList.remove("hidden");
            registerCard.classList.add("hidden");
        });

        languageSelect.addEventListener("change", () => {
            appLanguage = languageSelect.value;
            localStorage.setItem(LANGUAGE_KEY, appLanguage);
            applyTranslations();
        });

        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("register-username").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const emailConfirm = document.getElementById("register-email-confirm").value.trim();
            const password = document.getElementById("register-password").value;
            const passwordConfirm = document.getElementById("register-password-confirm").value;

            if (email !== emailConfirm) {
                showMessage(t("emailMismatch"), true);
                return;
            }

            if (password !== passwordConfirm) {
                showMessage(t("passwordMismatch"), true);
                return;
            }

            if (users[username]) {
                showMessage(t("usernameTaken"), true);
                return;
            }

            const salt = createSalt();
            const hashedPassword = await hashPassword(password, salt);
            users[username] = {
                email,
                salt,
                hashedPassword,
                data: { incomes: [], expenses: [] }
            };
            saveUsers();
            loginUser(username);
            registerForm.reset();
            showMessage(t("registerSuccess"), false);
        });

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value;
            const userRecord = users[username];

            if (!userRecord) {
                showMessage(t("invalidLogin"), true);
                return;
            }

            const valid = await verifyPassword(userRecord, password);
            if (!valid) {
                showMessage(t("invalidLogin"), true);
                return;
            }

            loginUser(username);
            loginForm.reset();
            showMessage(t("loginSuccess"), false);
        });

        guestButton.addEventListener("click", () => {
            loginUser(GUEST_SESSION_VALUE);
            ensureGuestData();
            showMessage(t("guestSuccess"), false);
        });

        logoutButton.addEventListener("click", () => {
            performLogout();
            showMessage(t("logoutSuccess"), false);
        });

        installAppButton.addEventListener("click", async () => {
            if (isAppInstalled() && !deferredInstallPrompt) {
                showMessage(t("appDownloaded"), false);
                return;
            }

            if (!deferredInstallPrompt) {
                showMessage(t("appInstallUnavailable"), true);
                return;
            }

            menuPanel.classList.remove("is-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            deferredInstallPrompt.prompt();
            const choice = await deferredInstallPrompt.userChoice;
            if (choice.outcome === "accepted") {
                localStorage.setItem(INSTALL_STATUS_KEY, "1");
                showMessage(t("appDownloaded"), false);
            }
            deferredInstallPrompt = null;
            updateInstallButtonState();
        });

        window.addEventListener("beforeinstallprompt", (event) => {
            event.preventDefault();
            deferredInstallPrompt = event;
            localStorage.setItem(INSTALL_STATUS_KEY, "0");
            updateInstallButtonState();
        });

        window.addEventListener("appinstalled", () => {
            localStorage.setItem(INSTALL_STATUS_KEY, "1");
            deferredInstallPrompt = null;
            showMessage(t("appInstalled"), false);
            updateInstallButtonState();
        });

        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("sw.js").catch(() => {
                    // Registration failures should not block app usage.
                });
            });
        }

        function initializePage() {
            ensureGuestData();
            applyTheme();
            syncThemeButtons();
            languageSelect.value = appLanguage;
            applyTranslations();
            updateAccessUI();
            updateInstallButtonState();
        }

        function applyTranslations() {
            document.documentElement.lang = appLanguage;
            document.title = dictionary[appLanguage].pageTitle;
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                element.textContent = dictionary[appLanguage][element.dataset.i18n];
            });
            menuToggle.setAttribute("aria-label", t("menuButton"));
            updateSessionLabel();
        }

        function updateAccessUI() {
            const loggedIn = Boolean(currentUser);
            authActions.classList.toggle("hidden", loggedIn);
            authOptions.classList.toggle("hidden", true);
            registerCard.classList.add("hidden");
            loginCard.classList.add("hidden");
            logoutButton.classList.toggle("hidden", !loggedIn);
            appLinks.classList.toggle("hidden", !loggedIn);
            updateSessionLabel();
        }

        function updateSessionLabel() {
            if (!currentUser) {
                sessionInfo.textContent = t("loggedOut");
                return;
            }

            const name = currentUser === GUEST_SESSION_VALUE ? t("guestUser") : currentUser;
            sessionInfo.textContent = `${t("loggedIn")} ${name}`;
        }

        function showMessage(message, isError) {
            authMessage.textContent = message;
            authMessage.classList.toggle("error", isError);
            authMessage.classList.toggle("ok", !isError);
        }

        function performLogout() {
            currentUser = "";
            localStorage.removeItem(SESSION_KEY);
            updateAccessUI();
        }

        function loginUser(username) {
            currentUser = username;
            if (username !== GUEST_SESSION_VALUE) {
                ensureUserData(username);
            }
            localStorage.setItem(SESSION_KEY, username);
            updateAccessUI();
        }

        function t(key) {
            return (dictionary[appLanguage] && dictionary[appLanguage][key]) || key;
        }

        function loadTheme() {
            const saved = localStorage.getItem(THEME_KEY);
            return saved === "dark" ? "dark" : "light";
        }

        function applyTheme() {
            document.documentElement.setAttribute("data-theme", appTheme);
        }

        function setTheme(mode) {
            appTheme = mode === "dark" ? "dark" : "light";
            localStorage.setItem(THEME_KEY, appTheme);
            applyTheme();
            syncThemeButtons();
        }

        function syncThemeButtons() {
            if (themeLightButton) {
                const isLight = appTheme === "light";
                themeLightButton.classList.toggle("is-active", isLight);
                themeLightButton.setAttribute("aria-pressed", String(isLight));
            }
            if (themeDarkButton) {
                const isDark = appTheme === "dark";
                themeDarkButton.classList.toggle("is-active", isDark);
                themeDarkButton.setAttribute("aria-pressed", String(isDark));
            }
        }

        function isAppInstalled() {
            const standaloneMode = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
            const iosStandalone = window.navigator.standalone === true;
            const stored = localStorage.getItem(INSTALL_STATUS_KEY) === "1";
            return standaloneMode || iosStandalone || stored;
        }

        function updateInstallButtonState() {
            const installed = isAppInstalled();
            if (installed && !deferredInstallPrompt) {
                installAppButton.textContent = t("appDownloaded");
                installAppButton.disabled = true;
                return;
            }

            installAppButton.textContent = t("downloadAppButton");
            installAppButton.disabled = false;
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

        async function verifyPassword(userRecord, password) {
            if (userRecord.hashedPassword && userRecord.salt) {
                const candidateHash = await hashPassword(password, userRecord.salt);
                return candidateHash === userRecord.hashedPassword;
            }

            if (userRecord.password && userRecord.password === password) {
                const salt = createSalt();
                userRecord.salt = salt;
                userRecord.hashedPassword = await hashPassword(password, salt);
                delete userRecord.password;
                saveUsers();
                return true;
            }

            return false;
        }

        function loadUsers() {
            try {
                const raw = localStorage.getItem(USERS_KEY);
                if (!raw) {
                    return {};
                }
                const parsed = JSON.parse(raw);
                return typeof parsed === "object" && parsed ? parsed : {};
            } catch (_error) {
                return {};
            }
        }

        function saveUsers() {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }

        function ensureUserData(username) {
            if (!users[username]) {
                return;
            }

            const data = users[username].data || {};
            users[username].data = {
                incomes: Array.isArray(data.incomes) ? data.incomes : [],
                expenses: Array.isArray(data.expenses) ? data.expenses : []
            };
            saveUsers();
        }

        function ensureGuestData() {
            try {
                const raw = localStorage.getItem(GUEST_DATA_KEY);
                if (!raw) {
                    localStorage.setItem(GUEST_DATA_KEY, JSON.stringify({ incomes: [], expenses: [] }));
                    return;
                }
                const parsed = JSON.parse(raw);
                if (!parsed || !Array.isArray(parsed.incomes) || !Array.isArray(parsed.expenses)) {
                    localStorage.setItem(GUEST_DATA_KEY, JSON.stringify({ incomes: [], expenses: [] }));
                }
            } catch (_error) {
                localStorage.setItem(GUEST_DATA_KEY, JSON.stringify({ incomes: [], expenses: [] }));
            }
        }

        function loadSession(userMap) {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved === GUEST_SESSION_VALUE) {
                return saved;
            }
            if (saved && userMap[saved]) {
                return saved;
            }
            return "";
        }