const shared = window.BudgetAppShared;
    const {
        USERS_KEY,
        SESSION_KEY,
        LANGUAGE_KEY,
        THEME_KEY,
        INSTALL_STATUS_KEY,
        GUEST_DATA_KEY
    } = shared.KEYS;
    const { GUEST_SESSION_VALUE } = shared;

        const dictionary = {
            hu: {
                pageTitle: "Költségvetési app",
                heroTitle: "Költségvetési app",
                heroText: "Jelentkezz be, regisztrálj vagy folytasd vendégként.",
                versionLabel: "Verzió",
                menuButton: "Menü",
                homeLink: "Kezdőlap",
                budgetLink: "Költségvetés",
                forecastLink: "Költségvetési előrejelző",
                monthlyLink: "Összesítés",
                themeModeLabel: "Téma",
                themeModeLight: "Világos",
                themeModeDark: "Sötét",
                backAction: "Vissza",
                languageLabel: "Nyelv",
                languageSelectorAria: "Nyelv választó",
                themeSwitchAria: "Téma váltó",
                appName: "Költségvetési app",
                registerTitle: "Regisztráció",
                loginTitle: "Bejelentkezés",
                usernameLabel: "Becenév",
                emailLabel: "Email cím",
                emailConfirmLabel: "Email cím megerősítése",
                passwordLabel: "Jelszó",
                passwordConfirmLabel: "Jelszó megerősítése",
                registerButton: "Regisztrálok",
                loginButton: "Belépés",
                guestButton: "Folytatás vendégként",
                downloadAppButton: "App letöltése",
                deleteAccountButton: "Regisztráció törlése",
                logoutButton: "Kijelentkezés",
                budgetTitle: "Költségvetés",
                budgetText: "Bevétel és kiadás rögzítés, szerkesztés, törlés, CSV export és felhasználókezelés.",
                monthlyTitle: "Összesítés",
                monthlyText: "Összesítés, mai napig kiadás, jövőbeli bevételek és kiadások dátum szerint.",
                openButton: "Megnyitás",
                loggedOut: "Nincs bejelentkezett felhasználó.",
                loggedIn: "Bejelentkezve:",
                guestUser: "Vendég",
                emailMismatch: "Az email címek nem egyeznek.",
                passwordMismatch: "A jelszavak nem egyeznek.",
                usernameTaken: "Ez a becenév már foglalt.",
                registerSuccess: "Sikeres regisztráció.",
                loginSuccess: "Sikeres bejelentkezés.",
                guestSuccess: "Vendég mód aktív.",
                logoutSuccess: "Sikeres kijelentkezés.",
                invalidLogin: "Hibás becenév vagy jelszó.",
                welcomeRegistered: "Welcome, {username}! A regisztráció sikeres.",
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
                forecastLink: "Budget Forecast Planner",
                monthlyLink: "Summary",
                themeModeLabel: "Theme",
                themeModeLight: "Light",
                themeModeDark: "Dark",
                backAction: "Back",
                languageLabel: "Language",
                languageSelectorAria: "Language selector",
                themeSwitchAria: "Theme switch",
                appName: "Budgeting App",
                registerTitle: "Register",
                loginTitle: "Sign in",
                usernameLabel: "Nickname",
                emailLabel: "Email address",
                emailConfirmLabel: "Confirm email address",
                passwordLabel: "Password",
                passwordConfirmLabel: "Confirm password",
                registerButton: "Create account",
                loginButton: "Sign in",
                guestButton: "Continue as guest",
                downloadAppButton: "Download App",
                deleteAccountButton: "Delete account",
                logoutButton: "Sign out",
                budgetTitle: "Budget",
                budgetText: "Income and expense capture, edit/delete, CSV export, and user management.",
                monthlyTitle: "Summary",
                monthlyText: "Summary, spending to date, and upcoming dated income and expenses.",
                openButton: "Open",
                loggedOut: "No user is signed in.",
                loggedIn: "Signed in as:",
                guestUser: "Guest",
                emailMismatch: "Email addresses do not match.",
                passwordMismatch: "Passwords do not match.",
                usernameTaken: "This nickname is already taken.",
                registerSuccess: "Registration successful.",
                loginSuccess: "Signed in successfully.",
                guestSuccess: "Guest mode enabled.",
                logoutSuccess: "Signed out successfully.",
                invalidLogin: "Invalid nickname or password.",
                welcomeRegistered: "Welcome, {username}! Registration successful.",
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
        const deleteAccountButton = document.getElementById("delete-account-button");
        const themeLightButton = document.getElementById("theme-light-button");
        const themeDarkButton = document.getElementById("theme-dark-button");
        const logoutButton = document.getElementById("logout-button");
        const sessionInfo = document.getElementById("session-info");
        const menuSessionInfo = document.getElementById("menu-session-info");
        const authMessage = document.getElementById("auth-message");
        const authMessageCard = authMessage ? authMessage.closest(".session-card") : null;
        const appLinks = document.getElementById("app-links");
        const languageSelect = document.getElementById("app-language");
        let deferredInstallPrompt = null;
        let currentUser = loadSession(users);
        let appLanguage = shared.loadLanguage();
        let appTheme = loadTheme();

        initializePage();

        if (menuToggle && menuPanel) {
            menuToggle.addEventListener("click", () => {
                const isOpen = menuPanel.classList.toggle("is-open");
                menuToggle.classList.toggle("is-open", isOpen);
                menuToggle.setAttribute("aria-expanded", String(isOpen));
            });
        }

        if (menuBackButton) {
            menuBackButton.addEventListener("click", () => {
                window.history.back();
            });
        }

        if (menuLogoutButton) {
            menuLogoutButton.addEventListener("click", () => {
                performLogout();
                showMessage(t("logoutSuccess"), false);
            });
        }

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
            if (!event.target.closest(".menu-wrap") && menuPanel && menuToggle) {
                menuPanel.classList.remove("is-open");
                menuToggle.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuPanel && menuToggle && menuPanel.classList.contains("is-open")) {
                menuPanel.classList.remove("is-open");
                menuToggle.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.focus();
            }
        });

        if (showRegisterButton && registerCard) {
            showRegisterButton.addEventListener("click", () => {
                authOptions.classList.remove("hidden");
                registerCard.classList.remove("hidden");
                loginCard.classList.add("hidden");
            });
        }

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

        if (registerForm) {
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

                const salt = shared.createSalt();
                const hashedPassword = await shared.hashPassword(password, salt);
                users[username] = {
                    email,
                    salt,
                    hashedPassword,
                    profile: {
                        nickname: username,
                        username,
                        email,
                        registeredAt: new Date().toISOString()
                    },
                    data: { incomes: [], expenses: [] }
                };
                saveUsers();
                await shared.sendRegistrationEmail(appLanguage, email, username);
                shared.setFlashMessage(formatText(t("welcomeRegistered"), { username }), false);
                loginUser(username);
                registerForm.reset();
                showMessage(t("registerSuccess"), false);
            });
        }

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value;
            const userRecord = users[username];

            if (!userRecord) {
                showMessage(t("invalidLogin"), true);
                return;
            }

            const valid = await shared.verifyPassword(userRecord, password, saveUsers);
            if (!valid) {
                showMessage(t("invalidLogin"), true);
                return;
            }

            // Backfill legacy accounts so nickname is always available after login.
            if (!userRecord.profile || typeof userRecord.profile !== "object") {
                userRecord.profile = {};
            }
            if (!userRecord.profile.nickname) {
                userRecord.profile.nickname = userRecord.profile.username || username;
                users[username] = userRecord;
                saveUsers();
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

        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                performLogout();
                showMessage(t("logoutSuccess"), false);
            });
        }

        if (installAppButton) {
            installAppButton.addEventListener("click", async () => {
            if (isAppInstalled() && !deferredInstallPrompt) {
                showMessage(t("appDownloaded"), false);
                return;
            }

            if (!deferredInstallPrompt) {
                showMessage(shared.getInstallUnavailableMessage(appLanguage), true);
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
        }

        if (deleteAccountButton) {
            deleteAccountButton.addEventListener("click", handleAccountDelete);
        }

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
            if (currentUser === GUEST_SESSION_VALUE) {
                currentUser = "";
                localStorage.removeItem(SESSION_KEY);
            }
            applyTheme();
            syncThemeButtons();
            languageSelect.value = appLanguage;
            applyTranslations();
            updateAccessUI();
            updateInstallButtonState();
            showMessage("", false);
        }

        function applyTranslations() {
            document.documentElement.lang = appLanguage;
            document.title = dictionary[appLanguage].pageTitle;
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                element.textContent = dictionary[appLanguage][element.dataset.i18n];
            });
            if (menuToggle) {
                menuToggle.setAttribute("aria-label", t("menuButton"));
            }
            document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
                element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
            });
            updateSessionLabel();
            updateMenuSessionLabel();
        }

        function updateAccessUI() {
            const loggedIn = Boolean(currentUser);
            authActions.classList.remove("hidden");
            authOptions.classList.toggle("hidden", true);
            if (registerCard) {
                registerCard.classList.add("hidden");
            }
            loginCard.classList.add("hidden");
            if (logoutButton) {
                logoutButton.classList.toggle("hidden", !loggedIn);
            }
            if (appLinks) {
                appLinks.classList.toggle("hidden", !loggedIn);
            }
            updateSessionLabel();
            updateMenuSessionLabel();
        }

        function updateSessionLabel() {
            if (!currentUser) {
                if (sessionInfo) {
                    sessionInfo.textContent = t("loggedOut");
                }
                return;
            }

            const name = getSignedInDisplayName();
            if (sessionInfo) {
                sessionInfo.textContent = `${t("loggedIn")} ${name}`;
            }
        }

        function updateMenuSessionLabel() {
            if (!menuSessionInfo) {
                return;
            }

            if (!currentUser) {
                menuSessionInfo.textContent = t("loggedOut");
                return;
            }

            const name = getSignedInDisplayName();
            menuSessionInfo.textContent = `${t("loggedIn")} ${name}`;
        }

        function getSignedInDisplayName() {
            if (!currentUser) {
                return t("guestUser");
            }
            if (currentUser === GUEST_SESSION_VALUE) {
                return t("guestUser");
            }

            const profile = users[currentUser] && users[currentUser].profile ? users[currentUser].profile : null;
            return profile?.nickname || profile?.username || currentUser;
        }

        function showMessage(message, isError) {
            if (!authMessage) {
                return;
            }
            authMessage.textContent = message;
            authMessage.classList.toggle("hidden", !message);
            if (authMessageCard) {
                authMessageCard.classList.toggle("hidden", !message);
            }
            authMessage.classList.toggle("error", isError);
            authMessage.classList.toggle("ok", !isError);
        }

        function formatText(template, values) {
            return String(template || "").replace(/\{(\w+)\}/g, (_match, key) => values[key] ?? "");
        }

        function performLogout() {
            currentUser = "";
            localStorage.removeItem(SESSION_KEY);
            updateAccessUI();
        }

        async function handleAccountDelete() {
            if (!currentUser || currentUser === GUEST_SESSION_VALUE || !users[currentUser]) {
                showMessage(shared.getDeleteAccountNoSessionMessage(appLanguage), true);
                return;
            }

            if (!window.confirm(shared.getDeleteAccountConfirmMessage(appLanguage, currentUser))) {
                return;
            }

            const userRecord = users[currentUser] || {};
            const email = userRecord.email || (userRecord.profile && userRecord.profile.email) || "";
            await shared.sendAccountDeletionEmail(appLanguage, email, currentUser);
            delete users[currentUser];
            saveUsers();
            currentUser = "";
            localStorage.removeItem(SESSION_KEY);
            showMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
            menuPanel.classList.remove("is-open");
            menuToggle.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            updateAccessUI();
        }

        function loginUser(username) {
            currentUser = username;
            if (username !== GUEST_SESSION_VALUE) {
                ensureUserData(username);
            }
            localStorage.setItem(SESSION_KEY, username);
            window.location.href = "budget.html";
            updateAccessUI();
        }

        function t(key) {
            return (dictionary[appLanguage] && dictionary[appLanguage][key]) || key;
        }

        function loadTheme() {
            return shared.loadTheme();
        }

        function applyTheme() {
            document.documentElement.setAttribute("data-theme", appTheme);
        }

        function setTheme(mode) {
            appTheme = mode === "dark" ? "dark" : "light";
            shared.saveTheme(appTheme);
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
            return shared.isAppInstalled();
        }

        function updateInstallButtonState() {
            if (!installAppButton) {
                return;
            }
            const installed = isAppInstalled();
            if (installed && !deferredInstallPrompt) {
                installAppButton.textContent = t("appDownloaded");
                installAppButton.disabled = true;
                return;
            }

            installAppButton.textContent = t("downloadAppButton");
            installAppButton.disabled = false;
        }

        function loadUsers() {
            return shared.loadUsers();
        }

        function saveUsers() {
            shared.saveUsers(users);
        }

        function ensureUserData(username) {
            if (!users[username]) {
                return;
            }

            users[username].profile = {
                username,
                email: users[username].email || (users[username].profile && users[username].profile.email) || "",
                registeredAt: (users[username].profile && users[username].profile.registeredAt) || new Date().toISOString()
            };
            const data = users[username].data || {};
            users[username].data = {
                incomes: Array.isArray(data.incomes) ? data.incomes : [],
                expenses: Array.isArray(data.expenses) ? data.expenses : []
            };
            saveUsers();
        }

        function ensureGuestData() {
            shared.saveGuestData(shared.loadGuestData());
        }

        function loadSession(userMap) {
            return shared.loadSession(userMap);
        }