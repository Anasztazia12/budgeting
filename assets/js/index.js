import {
    completePasswordResetWithHistory,
    deleteCurrentAccount,

    getFirebaseErrorMessage,
    loginWithUsername,
    logoutCurrentUser,
    registerWithUsername,
    requestPasswordReset,
    restoreSession
} from "./firebase-service.js";

const shared = window.BudgetAppShared;
const {
    SESSION_KEY,
    DISPLAY_NAME_KEY,
    LANGUAGE_KEY,
    INSTALL_STATUS_KEY
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
        usernameLabel: "Felhasználónév",
        loginIdentifierLabel: "Felhasználónév vagy email cím",
        emailLabel: "Email cím",
        emailConfirmLabel: "Email cím megerősítése",
        passwordLabel: "Jelszó",
        showPassword: "Jelszó mutatása",
        hidePassword: "Jelszó elrejtése",
        passwordConfirmLabel: "Jelszó megerősítése",
        passwordRuleHint: "A jelszó legyen 6-20 karakter, tartalmazzon kisbetűt, nagybetűt és számot.",
        passwordWeak: "A jelszó túl gyenge.",
        passwordStrong: "A jelszó elég erős.",
        forgotPasswordButton: "Elfelejtett jelszó",
        profileEditButton: "Adatok módosítása",
        changeUsernameMenuButton: "Felhasználónév módosítása",
        changeUsernameTitle: "Felhasználónév módosítása",
        changeUsernameHint: "Add meg az új felhasználónevedet.",
        newUsernameLabel: "Új felhasználónév",
        changeUsernameButton: "Felhasználónév módosítása",
        changeUsernameSuccess: "A felhasználónév sikeresen módosítva.",
        changePasswordMenuButton: "Jelszó módosítása",
        changePasswordTitle: "Jelszó módosítása",
        changePasswordHint: "Add meg a jelenlegi jelszavadat és az új jelszót.",
        currentPasswordLabel: "Jelenlegi jelszó",
        newPasswordLabel: "Új jelszó",
        newPasswordConfirmLabel: "Új jelszó megerősítése",
        changePasswordButton: "Jelszó módosítása",
        changePasswordSuccess: "A jelszó sikeresen módosítva.",
        resetTitle: "Jelszó visszaállítása",
        resetHint: "Add meg a beceneved vagy az email címed, és küldünk egy visszaállító linket.",
        resetIdentifierLabel: "Felhasználónév vagy email cím",
        resetButton: "Reset email küldése",
        resetCompleteTitle: "Új jelszó beállítása",
        resetCompleteHint: "Adj meg egy új jelszót. Korábban használt jelszó nem adható meg.",
        resetCompleteButton: "Új jelszó mentése",
        resetCompleteSuccess: "A jelszó visszaállítása sikeres. Most már bejelentkezhetsz.",
        registerButton: "Regisztrálok",
        loginButton: "Belépés",
        guestButton: "Folytatás vendégként",
        contactUs: "Kapcsolat",
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
        usernameTaken: "Ez a felhasználónév már foglalt.",
        registerSuccess: "Sikeres regisztráció.",
        loginSuccess: "Sikeres bejelentkezés.",
        guestSuccess: "Vendég mód aktív.",
        logoutSuccess: "Sikeres kijelentkezés.",
        invalidLogin: "Hibás felhasználónév vagy jelszó.",
        welcomeRegistered: "Welcome, {username}! A regisztráció sikeres.",
        appInstalled: "Az app telepítve.",
        appDownloaded: "Az app letöltve.",
        appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
        footerText: "Minden jog fenntartva.",
        helpLink: "Súgó"
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
        usernameLabel: "Username",
        loginIdentifierLabel: "Username or email address",
        emailLabel: "Email address",
        emailConfirmLabel: "Confirm email address",
        passwordLabel: "Password",
        showPassword: "Show password",
        hidePassword: "Hide password",
        passwordConfirmLabel: "Confirm password",
        passwordRuleHint: "Password must be 6-20 chars and include lowercase, uppercase, and a number.",
        passwordWeak: "Password is too weak.",
        passwordStrong: "Password is strong enough.",
        forgotPasswordButton: "Forgot password",
        profileEditButton: "Edit profile",
        changeUsernameMenuButton: "Change username",
        changeUsernameTitle: "Change username",
        changeUsernameHint: "Enter your new username.",
        newUsernameLabel: "New username",
        changeUsernameButton: "Change username",
        changeUsernameSuccess: "Username changed successfully.",
        changePasswordMenuButton: "Change password",
        changePasswordTitle: "Change password",
        changePasswordHint: "Enter your current password and your new password.",
        currentPasswordLabel: "Current password",
        newPasswordLabel: "New password",
        newPasswordConfirmLabel: "Confirm new password",
        changePasswordButton: "Change password",
        changePasswordSuccess: "Password changed successfully.",
        resetTitle: "Reset password",
        resetHint: "Enter your username or email address and we will send a reset link.",
        resetIdentifierLabel: "Username or email address",
        resetButton: "Send reset email",
        resetCompleteTitle: "Set a new password",
        resetCompleteHint: "Enter a new password. Previously used passwords are not allowed.",
        resetCompleteButton: "Save new password",
        resetCompleteSuccess: "Password reset successful. You can sign in now.",
        registerButton: "Create account",
        loginButton: "Sign in",
        guestButton: "Continue as guest",
        contactUs: "Contact us",
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
        usernameTaken: "This username is already taken.",
        registerSuccess: "Registration successful.",
        loginSuccess: "Signed in successfully.",
        guestSuccess: "Guest mode enabled.",
        logoutSuccess: "Signed out successfully.",
        invalidLogin: "Invalid username or password.",
        welcomeRegistered: "Welcome, {username}! Registration successful.",
        appInstalled: "App installed.",
        appDownloaded: "App downloaded.",
        appInstallUnavailable: "App install is not available on this device right now.",
        footerText: "All rights reserved.",
        helpLink: "Help"
    }
};

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
const resetCard = document.getElementById("reset-card");
const resetCompleteCard = document.getElementById("reset-complete-card");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const resetForm = document.getElementById("reset-form");
const resetCompleteForm = document.getElementById("reset-complete-form");
const resetIdentifierInput = document.getElementById("reset-identifier");
const registerPasswordInput = document.getElementById("register-password");
const loginPasswordInput = document.getElementById("login-password");
const loginPasswordToggle = document.getElementById("login-password-toggle");
const resetNewPasswordInput = document.getElementById("reset-new-password");
const passwordStrengthMessage = document.getElementById("password-strength-message");
const guestButton = document.getElementById("guest-button");
const installAppButton = document.getElementById("install-app-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const themeLightButton = document.getElementById("theme-light-button");
const themeDarkButton = document.getElementById("theme-dark-button");
const menuSessionInfo = document.getElementById("menu-session-info");
const authMessage = document.getElementById("auth-message");
const authMessageCard = authMessage ? authMessage.closest(".session-card") : null;
const languageSelect = document.getElementById("app-language");
const contactUsButton = document.getElementById("contact-us-button");

let deferredInstallPrompt = null;
let currentUser = localStorage.getItem(SESSION_KEY) || "";
let currentProfile = null;
let appLanguage = shared.loadLanguage();
let appTheme = shared.loadTheme();
let accountDeleteConfirmArmedUntil = 0;
const urlParams = new URLSearchParams(window.location.search);
const resetActionCode = String(urlParams.get("oobCode") || "").trim();
const isResetPasswordMode = urlParams.get("mode") === "resetPassword" && Boolean(resetActionCode);

wireEvents();
void initializePage();

function wireEvents() {
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
        menuLogoutButton.addEventListener("click", async () => {
            await performLogout();
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

    if (contactUsButton) {
        contactUsButton.addEventListener("click", () => {
            window.location.href = "contact.html";
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
            showSingleAuthCard(registerCard);
        });
    }

    if (showLoginButton) {
        showLoginButton.addEventListener("click", () => {
            authOptions.classList.remove("hidden");
            showSingleAuthCard(loginCard);
        });
    }

    const showResetButton = document.getElementById("show-reset-button");
    if (showResetButton) {
        showResetButton.addEventListener("click", () => {
            authOptions.classList.remove("hidden");
            showSingleAuthCard(resetCard);
        });
    }

    initializeLoginPasswordToggle();

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

            if (!isPasswordStrong(password)) {
                updatePasswordStrengthFeedback();
                showMessage(t("passwordWeak"), true);
                return;
            }

            try {
                const session = await registerWithUsername({ username, email, password });
                shared.setFlashMessage(formatText(t("welcomeRegistered"), { username }), false);
                registerForm.reset();
                showMessage(t("registerSuccess"), false);
                completeLogin(session);
            } catch (error) {
                showMessage(getFirebaseErrorMessage(error, appLanguage, "register"), true);
            }
        });
    }

    if (registerPasswordInput) {
        registerPasswordInput.addEventListener("input", () => {
            updatePasswordStrengthFeedback();
        });
        registerPasswordInput.addEventListener("blur", () => {
            updatePasswordStrengthFeedback();
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value;

            try {
                const session = await loginWithUsername({ username, password });
                loginForm.reset();
                showMessage(t("loginSuccess"), false);
                completeLogin(session);
            } catch (error) {
                showMessage(getFirebaseErrorMessage(error, appLanguage, "login"), true);
            }
        });
    }

    if (resetForm) {
        resetForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const identifier = resetIdentifierInput?.value.trim() || "";

            try {
                const result = await requestPasswordReset(identifier);
                resetForm.reset();
                const usernameHint = identifier.includes("@") && result.username
                    ? (appLanguage === "en"
                        ? ` Your username is: ${result.username}.`
                        : ` A felhasználóneved: ${result.username}.`)
                    : "";
                showMessage(
                    appLanguage === "en"
                        ? `Reset email sent to ${result.email}. Please check your spam folder too. Amethyst Nexalune${usernameHint}`
                        : `A reset email elküldve ide: ${result.email}. Nézd meg a spam mappát is. Amethyst Nexalune${usernameHint}`,
                    false
                );
            } catch (error) {
                showMessage(getFirebaseErrorMessage(error, appLanguage, "reset"), true);
            }
        });
    }

    if (resetCompleteForm) {
        resetCompleteForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const newPassword = document.getElementById("reset-new-password").value;
            const confirmPassword = document.getElementById("reset-new-password-confirm").value;

            if (newPassword !== confirmPassword) {
                showMessage(t("passwordMismatch"), true);
                return;
            }

            if (!isPasswordStrong(newPassword)) {
                showMessage(t("passwordWeak"), true);
                return;
            }

            try {
                await completePasswordResetWithHistory({ oobCode: resetActionCode, newPassword });
                resetCompleteForm.reset();
                showMessage(t("resetCompleteSuccess"), false);
                window.history.replaceState({}, document.title, "index.html");
                showSingleAuthCard(loginCard);
            } catch (error) {
                showMessage(getFirebaseErrorMessage(error, appLanguage, "reset"), true);
            }
        });
    }

    if (resetNewPasswordInput) {
        resetNewPasswordInput.addEventListener("input", () => {
            showPasswordStrengthForInput(resetNewPasswordInput);
        });
    }

    if (guestButton) {
        guestButton.addEventListener("click", () => {
            loginGuest();
            showMessage(t("guestSuccess"), false);
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
            });
        });
    }
}

async function initializePage() {

    if (currentUser === GUEST_SESSION_VALUE) {
        currentUser = "";
        localStorage.removeItem(SESSION_KEY);
    }

    const session = await restoreSession(currentUser);

    if (session) {
        
        applyAuthenticatedState(session);
    } else {
    
        currentUser = "";
        localStorage.removeItem(SESSION_KEY);
        clearAuthenticatedState();
    }

    applyTheme();
    syncThemeButtons();
    languageSelect.value = appLanguage;
    applyTranslations();
    updatePasswordStrengthFeedback();

    if (isResetPasswordMode) {
        authOptions.classList.remove("hidden");
        showSingleAuthCard(resetCompleteCard);
    }

    updateAccessUI();
    updateInstallButtonState();
    showMessage("", false);

}

function showSingleAuthCard(cardToShow) {
    [registerCard, loginCard, resetCard, resetCompleteCard].forEach((card) => {
        card?.classList.add("hidden");
    });
    cardToShow?.classList.remove("hidden");
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
    updatePasswordStrengthFeedback();
    syncLoginPasswordToggleButton();
    updateResetFormTexts();
    updateMenuSessionLabel();
}

function initializeLoginPasswordToggle() {
    if (!loginPasswordInput || !loginPasswordToggle) {
        return;
    }

    loginPasswordToggle.addEventListener("click", () => {
        const shouldShow = loginPasswordInput.type === "password";
        loginPasswordInput.type = shouldShow ? "text" : "password";
        loginPasswordToggle.setAttribute("aria-pressed", String(shouldShow));
        syncLoginPasswordToggleButton();
    });

    syncLoginPasswordToggleButton();
}

function syncLoginPasswordToggleButton() {
    if (!loginPasswordInput || !loginPasswordToggle) {
        return;
    }

    const isVisible = loginPasswordInput.type === "text";
    const label = isVisible ? t("hidePassword") : t("showPassword");
    loginPasswordToggle.textContent = "👁";
    loginPasswordToggle.setAttribute("aria-label", label);
    loginPasswordToggle.setAttribute("title", label);
}

function evaluatePassword(password) {
    const value = String(password || "");
    const hasMinLength = value.length >= 6;
    const hasMaxLength = value.length <= 20;
    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasDigit = /\d/.test(value);

    return {
        valid: hasMinLength && hasMaxLength && hasLowercase && hasUppercase && hasDigit,
        hasContent: value.length > 0
    };
}

function isPasswordStrong(password) {
    return evaluatePassword(password).valid;
}

function updatePasswordStrengthFeedback() {
    if (!passwordStrengthMessage || !registerPasswordInput) {
        return;
    }

    const result = evaluatePassword(registerPasswordInput.value);
    if (!result.hasContent) {
        passwordStrengthMessage.textContent = t("passwordRuleHint");
        passwordStrengthMessage.classList.remove("is-ok");
        passwordStrengthMessage.classList.remove("is-error");
        registerPasswordInput.setCustomValidity("");
        return;
    }

    if (result.valid) {
        passwordStrengthMessage.textContent = t("passwordStrong");
        passwordStrengthMessage.classList.add("is-ok");
        passwordStrengthMessage.classList.remove("is-error");
        registerPasswordInput.setCustomValidity("");
        return;
    }

    passwordStrengthMessage.textContent = t("passwordWeak");
    passwordStrengthMessage.classList.add("is-error");
    passwordStrengthMessage.classList.remove("is-ok");
    registerPasswordInput.setCustomValidity(t("passwordWeak"));
}

function showPasswordStrengthForInput(inputElement) {
    if (!inputElement) {
        return;
    }

    const result = evaluatePassword(inputElement.value);
    if (!result.hasContent) {
        inputElement.setCustomValidity("");
        return;
    }

    if (result.valid) {
        inputElement.setCustomValidity("");
        return;
    }

    inputElement.setCustomValidity(t("passwordWeak"));
}

function updateResetFormTexts() {
    if (!resetForm) {
        return;
    }

    const title = resetForm.querySelector("h2[data-i18n]");
    if (title) {
        title.textContent = t("resetTitle");
    }

    const hint = resetForm.querySelector("p[data-i18n]");
    if (hint) {
        hint.textContent = t("resetHint");
    }

    const identifierLabel = resetForm.querySelector("label[for='reset-identifier']");
    if (identifierLabel) {
        identifierLabel.textContent = t("resetIdentifierLabel");
    }

    const submitButton = resetForm.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.textContent = t("resetButton");
    }

    const showResetButton = document.getElementById("show-reset-button");
    if (showResetButton) {
        showResetButton.textContent = t("forgotPasswordButton");
    }
}

function updateAccessUI() {
    const loggedIn = Boolean(currentUser);
    authActions.classList.remove("hidden");
    if (!isResetPasswordMode) {
        authOptions.classList.toggle("hidden", true);
        showSingleAuthCard(null);
    }
    updateMenuSessionLabel();
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

    return localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.username || currentProfile?.username || currentUser;
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

async function performLogout() {
    clearAuthenticatedState();
    await logoutCurrentUser().catch(() => null);
    updateAccessUI();
}

async function handleAccountDelete() {
    if (!currentUser || currentUser === GUEST_SESSION_VALUE) {
        showMessage(shared.getDeleteAccountNoSessionMessage(appLanguage), true);
        return;
    }

    if (Date.now() > accountDeleteConfirmArmedUntil) {
        accountDeleteConfirmArmedUntil = Date.now() + 7000;
        showMessage(shared.getDeleteAccountConfirmMessage(appLanguage, currentUser), true);
        return;
    }
    accountDeleteConfirmArmedUntil = 0;

    const email = currentProfile?.email || "";

    try {
        await deleteCurrentAccount();
        await shared.sendAccountDeletionEmail(appLanguage, email, currentUser);
        shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
        clearAuthenticatedState();
        window.location.href = "index.html";
    } catch (error) {
        showMessage(getFirebaseErrorMessage(error, appLanguage, "delete"), true);
    }
}

function completeLogin(session) {
    applyAuthenticatedState(session);
    window.location.href = "budget.html";
}

function loginGuest() {
    currentUser = GUEST_SESSION_VALUE;
    currentProfile = null;
    localStorage.setItem(SESSION_KEY, GUEST_SESSION_VALUE);
    localStorage.setItem(DISPLAY_NAME_KEY, t("guestUser"));
    window.location.href = "budget.html";
}

function applyAuthenticatedState(session) {
    const username = String(session?.profile?.username || "").trim();
    if (!username) {
        clearAuthenticatedState();
        return;
    }

    currentUser = username;
    currentProfile = session.profile || null;
    localStorage.setItem(SESSION_KEY, username);
    localStorage.setItem(DISPLAY_NAME_KEY, currentProfile?.username || currentProfile?.username || username);
}

function clearAuthenticatedState() {
    currentUser = "";
    currentProfile = null;
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(DISPLAY_NAME_KEY);
}

function t(key) {
    return (dictionary[appLanguage] && dictionary[appLanguage][key]) || key;
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
    } else {
        installAppButton.textContent = t("downloadAppButton");
    }
    installAppButton.disabled = false;
}
