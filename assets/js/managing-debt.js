import {
	deleteCurrentAccount,
	getFirebaseErrorMessage,
	logoutCurrentUser,
	restoreSession
} from "./firebase-service.js";

const shared = window.BudgetAppShared;
const { SESSION_KEY, DISPLAY_NAME_KEY, INSTALL_STATUS_KEY } = shared.KEYS;
const { GUEST_SESSION_VALUE } = shared;

const DEBTS_KEY_PREFIX = "budgetAppDebts_";

const dictionary = {
	hu: {
		pageTitle: "Adósságkezelő",
		heroTitle: "Adósságkezelő",
		heroText: "Kezeld hatékonyan az adósságaidat és tervezd meg a visszafizetést.",
		menuButton: "Menü",
		homeLink: "Kezdőlap",
		budgetLink: "Költségvetés",
		summaryLink: "Összesítés",
		managingDebtLink: "Adósságkezelő",
		forecastButton: "Előrejelző",
		versionLabel: "Verzió",
		themeModeLight: "Világos",
		themeModeDark: "Sötét",
		contactUs: "Kapcsolat",
		backAction: "Vissza",
		cancelEditButton: "Mégsem",
		downloadAppButton: "App letöltése",
		deleteAccountButton: "Regisztráció törlése",
		languageLabel: "Nyelv",
		languageSelectorAria: "Nyelv választó",
		themeSwitchAria: "Téma váltó",
		currencySelectorAria: "Pénznem választó",
		currencyLabel: "Pénznem választó",
		currencyHuf: "HUF (forint)",
		currencyGbp: "GBP (font)",
		currencyUsd: "USD (dollár)",
		currencyEur: "EUR (euró)",
		logoutButton: "Kijelentkezés",
		profileEditButton: "Adatok módosítása",
		changeUsernameMenuButton: "Felhasználónév módosítása",
		changePasswordMenuButton: "Jelszó módosítása",
		loggedOut: "Nincs bejelentkezett felhasználó.",
		loggedIn: "Bejelentkezve:",
		guestUser: "Vendég",
		appDownloaded: "Az app letöltve.",
		deleteAccountNeedsSecondClick: "A fiók törléséhez kattints újra 7 másodpercen belül.",
		debtFormTitle: "Adósság hozzáadása",
		debtNameLabel: "Adósság neve",
		debtNamePlaceholder: "pl. Autóhitel, Hitelkártya...",
		debtTotalAmountLabel: "Teljes összeg",
		debtPaidAmountLabel: "Már kifizetett",
		debtMonthlyPaymentLabel: "Havi törlesztő",
		debtPaymentDateLabel: "Törlesztés dátuma",
		debtRemainingAmountLabel: "Fennmaradó összeg",
		debtEarlyPaymentDateLabel: "Tervezett előbbi kifizetés dátuma",
		debtPlannedAmountLabel: "Tervezett összeg",
		debtAddToForecastLabel: "Hozzáadás a költségvetési előrejelzőhöz",
		debtStartDateLabel: "Kezdő dátum",
		debtDueDateLabel: "Lejárat",
		noteLabel: "Megjegyzés (opcionális)",
		notePlaceholder: "Rövid megjegyzés",
		saveDebtButton: "Adósság mentése",
		updateDebtButton: "Adósság frissítése",
		editAction: "Szerkesztés",
		deleteAction: "Törlés",
		confirmYes: "Igen, törlöm",
		confirmNo: "Mégsem",
		totalDebtTitle: "Összes adósság",
		remainingDebtTitle: "Fennmaradó",
		paidDebtTitle: "Kifizetett",
		totalMonthlyTitle: "Havi törlesztők",
		debtListTitle: "Adósságok listája",
		emptyDebts: "Nincs rögzített adósság.",
		paidLabel: "Kifizetett",
		remainingLabel: "Fennmaradó",
		monthlyLabel: "Havi",
		dueDateLabel: "Lejárat",
		entrySaved: "Az adósság elmentve.",
		entryUpdated: "Az adósság frissítve.",
		entryDeleted: "Az adósság törölve.",
		invalidAmount: "Adj meg 0-nál nagyobb összeget.",
		invalidName: "Adj meg egy nevet az adósságnak.",
		paidExceedsTotal: "A kifizetett összeg nem lehet nagyobb a teljes összegnél.",
		loggedInLabel: "Bejelentkezve:"
	},
	en: {
		pageTitle: "Debt Manager",
		heroTitle: "Debt Manager",
		heroText: "Manage your debts efficiently and plan your repayments.",
		menuButton: "Menu",
		homeLink: "Home",
		budgetLink: "Budget",
		summaryLink: "Summary",
		managingDebtLink: "Debt Manager",
		forecastButton: "Forecast",
		versionLabel: "Version",
		themeModeLight: "Light",
		themeModeDark: "Dark",
		contactUs: "Contact us",
		backAction: "Back",
		cancelEditButton: "Cancel",
		downloadAppButton: "Download App",
		deleteAccountButton: "Delete account",
		languageLabel: "Language",
		languageSelectorAria: "Language selector",
		themeSwitchAria: "Theme switch",
		currencySelectorAria: "Currency selector",
		currencyLabel: "Currency selector",
		currencyHuf: "HUF (forint)",
		currencyGbp: "GBP (pound)",
		currencyUsd: "USD (dollar)",
		currencyEur: "EUR (euro)",
		logoutButton: "Sign out",
		profileEditButton: "Edit profile",
		changeUsernameMenuButton: "Change username",
		changePasswordMenuButton: "Change password",
		loggedOut: "No user is signed in.",
		loggedIn: "Signed in as:",
		guestUser: "Guest",
		appDownloaded: "App downloaded.",
		deleteAccountNeedsSecondClick: "Click again within 7 seconds to delete your account.",
		debtFormTitle: "Add Debt",
		debtNameLabel: "Debt name",
		debtNamePlaceholder: "e.g. Car loan, Credit card...",
		debtTotalAmountLabel: "Total amount",
		debtPaidAmountLabel: "Amount already paid",
		debtMonthlyPaymentLabel: "Monthly payment",
		debtPaymentDateLabel: "Payment date",
		debtRemainingAmountLabel: "Remaining amount",
		debtEarlyPaymentDateLabel: "Planned early payment date",
		debtPlannedAmountLabel: "Planned amount",
		debtAddToForecastLabel: "Add to budget forecast",
		debtStartDateLabel: "Start date",
		debtDueDateLabel: "Due date",
		noteLabel: "Note (optional)",
		notePlaceholder: "Short note",
		saveDebtButton: "Save debt",
		updateDebtButton: "Update debt",
		editAction: "Edit",
		deleteAction: "Delete",
		confirmYes: "Yes, delete",
		confirmNo: "Cancel",
		totalDebtTitle: "Total debt",
		remainingDebtTitle: "Remaining",
		paidDebtTitle: "Paid",
		totalMonthlyTitle: "Monthly payments",
		debtListTitle: "Debt list",
		emptyDebts: "No debts recorded.",
		paidLabel: "Paid",
		remainingLabel: "Remaining",
		monthlyLabel: "Monthly",
		dueDateLabel: "Due",
		entrySaved: "Debt saved.",
		entryUpdated: "Debt updated.",
		entryDeleted: "Debt deleted.",
		invalidAmount: "Enter an amount greater than 0.",
		invalidName: "Enter a name for the debt.",
		paidExceedsTotal: "Paid amount cannot exceed total amount.",
		loggedInLabel: "Signed in as:"
	}
};

let currentUser = localStorage.getItem(SESSION_KEY) || "";
let currentProfile = null;
let appLanguage = shared.loadLanguage();
let appTheme = shared.loadTheme();
let appCurrency = shared.loadCurrency();
let debts = [];

let deferredInstallPrompt = null;
let deleteAccountConfirmArmed = false;
let deleteAccountConfirmTimer = null;
let pendingDeleteId = null;

const languageSelect = document.getElementById("app-language");
const currencySelect = document.getElementById("app-currency");
const menuToggle = document.getElementById("menu-toggle");
const menuPanel = document.getElementById("menu-panel");
const menuSessionInfo = document.getElementById("menu-session-info");
const menuBackButton = document.getElementById("menu-back-button");
const menuLogoutButton = document.getElementById("menu-logout-button");
const installAppButton = document.getElementById("install-app-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const themeLightButton = document.getElementById("theme-light-button");
const themeDarkButton = document.getElementById("theme-dark-button");
const contactUsButton = document.getElementById("contact-us-button");
const debtForm = document.getElementById("debt-form");
const debtSubmitButton = document.getElementById("debt-submit-button");
const debtCancelButton = document.getElementById("debt-cancel-button");
const debtDeleteButton = document.getElementById("debt-delete-button");
const debtList = document.getElementById("debt-list");

void initializePage();

languageSelect.addEventListener("change", () => {
	appLanguage = languageSelect.value;
	shared.saveLanguage(appLanguage);
	applyTranslations();
	render();
});

currencySelect.addEventListener("change", () => {
	appCurrency = currencySelect.value;
	shared.saveCurrency(appCurrency);
	render();
});

document.getElementById("budget-toggle-button")?.addEventListener("click", () => {
	window.location.href = "budget.html";
});

document.getElementById("summary-toggle-button")?.addEventListener("click", () => {
	window.location.href = "summary.html";
});

document.getElementById("forecast-toggle-button")?.addEventListener("click", () => {
	window.location.href = "budget-forecast.html";
});

if (menuBackButton) {
	menuBackButton.addEventListener("click", () => window.history.back());
}

if (menuLogoutButton) {
	menuLogoutButton.addEventListener("click", handleLogout);
}

if (deleteAccountButton) {
	deleteAccountButton.addEventListener("click", handleAccountDelete);
}

if (themeLightButton) {
	themeLightButton.addEventListener("click", () => setTheme("light"));
}

if (themeDarkButton) {
	themeDarkButton.addEventListener("click", () => setTheme("dark"));
}

if (contactUsButton) {
	contactUsButton.addEventListener("click", () => { window.location.href = "contact.html"; });
}

if (installAppButton) {
	installAppButton.addEventListener("click", async () => {
		if (shared.isAppInstalled() && !deferredInstallPrompt) {
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

menuToggle.addEventListener("click", () => {
	const isOpen = menuPanel.classList.toggle("is-open");
	menuToggle.classList.toggle("is-open", isOpen);
	menuToggle.setAttribute("aria-expanded", String(isOpen));
});

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

window.addEventListener("beforeinstallprompt", (event) => {
	deferredInstallPrompt = event;
	localStorage.setItem(INSTALL_STATUS_KEY, "0");
	updateInstallButtonState();
});

window.addEventListener("appinstalled", () => {
	localStorage.setItem(INSTALL_STATUS_KEY, "1");
	deferredInstallPrompt = null;
	showMessage(t("appDownloaded"), false);
	updateInstallButtonState();
});

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
}

debtForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = document.getElementById("debt-name").value.trim();
	const monthlyPayment = parseFloat(document.getElementById("debt-monthly-payment").value) || 0;
	const paymentDate = document.getElementById("debt-payment-date").value || "";
	const remainingAmount = parseFloat(document.getElementById("debt-remaining-amount").value) || 0;
	const dueDate = document.getElementById("debt-due-date").value || "";
	const earlyPaymentDate = document.getElementById("debt-early-payment-date").value || "";
	const plannedAmount = parseFloat(document.getElementById("debt-planned-amount").value) || 0;
	const addToForecast = document.getElementById("debt-add-to-forecast").checked;
	const editId = document.getElementById("debt-edit-id").value;

	if (!name) { showMessage(t("invalidName"), true); return; }

	if (editId) {
		const index = debts.findIndex((d) => d.id === editId);
		if (index !== -1) {
			const existing = debts[index];
			let forecastScenarioId = existing.forecastScenarioId || null;

			if (addToForecast) {
				const debtData = { ...existing, name, monthlyPayment, paymentDate, remainingAmount, dueDate, earlyPaymentDate, plannedAmount, forecastScenarioId };
				forecastScenarioId = addOrUpdateForecastScenario(debtData);
			} else if (forecastScenarioId) {
				removeForecastScenario(forecastScenarioId);
				forecastScenarioId = null;
			}

			debts[index] = { ...existing, name, monthlyPayment, paymentDate, remainingAmount, dueDate, earlyPaymentDate, plannedAmount, addToForecast, forecastScenarioId };
		}
		showMessage(t("entryUpdated"), false);
	} else {
		const newDebt = {
			id: shared.createEntryId(),
			name,
			monthlyPayment,
			paymentDate,
			remainingAmount,
			dueDate,
			earlyPaymentDate,
			plannedAmount,
			addToForecast,
			forecastScenarioId: null
		};

		if (addToForecast) {
			newDebt.forecastScenarioId = addOrUpdateForecastScenario(newDebt);
		}

		debts.push(newDebt);
		showMessage(t("entrySaved"), false);
	}

	saveDebts();
	resetForm();
	render();
});

if (debtCancelButton) {
	debtCancelButton.addEventListener("click", resetForm);
}

if (debtDeleteButton) {
	debtDeleteButton.addEventListener("click", () => {
		const editId = document.getElementById("debt-edit-id").value;
		if (!editId) return;
		deleteDebt(editId);
	});
}

debtList.addEventListener("click", (event) => {
	const btn = event.target.closest("[data-action]");
	if (!btn) return;

	const id = btn.dataset.id;
	const action = btn.dataset.action;

	if (action === "edit") {
		const debt = debts.find((d) => d.id === id);
		if (debt) populateFormForEdit(debt);
		return;
	}

	if (action === "delete") {
		const li = btn.closest("li");
		if (!li) return;

		if (pendingDeleteId === id) {
			deleteDebt(id);
			pendingDeleteId = null;
			return;
		}

		pendingDeleteId = id;
		const confirmEl = document.createElement("div");
		confirmEl.className = "debt-inline-confirm";
		confirmEl.innerHTML = `
			<span>${t("deleteAction")}?</span>
			<button type="button" class="btn btn-danger btn-sm" data-action="delete" data-id="${id}">${t("confirmYes")}</button>
			<button type="button" class="btn btn-outline-info btn-sm debt-confirm-cancel">${t("confirmNo")}</button>
		`;
		const existing = li.querySelector(".debt-inline-confirm");
		if (existing) existing.remove();
		li.appendChild(confirmEl);

		confirmEl.querySelector(".debt-confirm-cancel").addEventListener("click", () => {
			confirmEl.remove();
			pendingDeleteId = null;
		});

		setTimeout(() => {
			if (confirmEl.isConnected) {
				confirmEl.remove();
				pendingDeleteId = null;
			}
		}, 5000);
	}
});

async function initializePage() {
	if (currentUser === GUEST_SESSION_VALUE) {
		debts = loadDebts();
	} else {
		const session = await restoreSession(currentUser);
		if (!session) {
			window.location.href = "index.html";
			return;
		}
		currentUser = String(session?.profile?.username || currentUser || "").trim();
		currentProfile = session?.profile || null;
		if (currentUser) localStorage.setItem(SESSION_KEY, currentUser);
		debts = loadDebts();
	}

	applyTheme();
	syncThemeButtons();
	languageSelect.value = appLanguage;
	currencySelect.value = appCurrency;
	applyTranslations();
	updateInstallButtonState();
	render();

	const flash = shared.consumeFlashMessage();
	if (flash) showMessage(flash.message, flash.isError);
}

function loadDebts() {
	const key = DEBTS_KEY_PREFIX + (currentUser || "guest");
	try {
		const raw = localStorage.getItem(key);
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function saveDebts() {
	const key = DEBTS_KEY_PREFIX + (currentUser || "guest");
	localStorage.setItem(key, JSON.stringify(debts));
}

function getForecastKey() {
	return `budgetAppForecastScenarios:${currentUser || "guest"}`;
}

function loadForecastScenarios() {
	try {
		const raw = localStorage.getItem(getForecastKey());
		const parsed = raw ? JSON.parse(raw) : [];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function saveForecastScenarios(scenarios) {
	localStorage.setItem(getForecastKey(), JSON.stringify(scenarios));
}

function addOrUpdateForecastScenario(debt) {
	const scenarios = loadForecastScenarios();
	const existingIndex = debt.forecastScenarioId
		? scenarios.findIndex((s) => s.id === debt.forecastScenarioId)
		: -1;

	const existingRowId = existingIndex >= 0 && scenarios[existingIndex].rows?.[0]?.rowId
		? scenarios[existingIndex].rows[0].rowId
		: shared.createEntryId();

	const scenario = {
		id: debt.forecastScenarioId || shared.createEntryId(),
		name: debt.name,
		targetDate: debt.dueDate || debt.earlyPaymentDate || "",
		rows: [{
			rowId: existingRowId,
			type: "expense",
			amount: debt.monthlyPayment || 0,
			date: debt.paymentDate || "",
			note: ""
		}]
	};

	if (existingIndex >= 0) {
		scenarios[existingIndex] = scenario;
	} else {
		scenarios.push(scenario);
	}

	saveForecastScenarios(scenarios);
	return scenario.id;
}

function removeForecastScenario(scenarioId) {
	if (!scenarioId) return;
	const scenarios = loadForecastScenarios();
	saveForecastScenarios(scenarios.filter((s) => s.id !== scenarioId));
}

function deleteDebt(id) {
	const debt = debts.find((d) => d.id === id);
	if (debt?.forecastScenarioId) {
		removeForecastScenario(debt.forecastScenarioId);
	}
	debts = debts.filter((d) => d.id !== id);
	saveDebts();
	showMessage(t("entryDeleted"), false);
	resetForm();
	render();
}

function populateFormForEdit(debt) {
	document.getElementById("debt-edit-id").value = debt.id;
	document.getElementById("debt-name").value = debt.name;
	document.getElementById("debt-monthly-payment").value = debt.monthlyPayment || "";
	document.getElementById("debt-payment-date").value = debt.paymentDate || "";
	document.getElementById("debt-remaining-amount").value = debt.remainingAmount || "";
	document.getElementById("debt-due-date").value = debt.dueDate || "";
	document.getElementById("debt-early-payment-date").value = debt.earlyPaymentDate || "";
	document.getElementById("debt-planned-amount").value = debt.plannedAmount || "";
	document.getElementById("debt-add-to-forecast").checked = debt.addToForecast || false;

	debtSubmitButton.textContent = t("updateDebtButton");
	debtCancelButton.classList.remove("hidden");
	debtDeleteButton.classList.remove("hidden");
	document.getElementById("debt-form-title").textContent = t("debtFormTitle");
	document.getElementById("debt-name").focus();
}

function resetForm() {
	debtForm.reset();
	document.getElementById("debt-edit-id").value = "";
	debtSubmitButton.textContent = t("saveDebtButton");
	debtCancelButton.classList.add("hidden");
	debtDeleteButton.classList.add("hidden");
	pendingDeleteId = null;
}

function render() {
	const totalRemaining = debts.reduce((sum, d) => sum + (d.remainingAmount || 0), 0);
	const totalMonthly = debts.reduce((sum, d) => sum + (d.monthlyPayment || 0), 0);
	const totalPlanned = debts.reduce((sum, d) => sum + (d.plannedAmount || 0), 0);

	document.getElementById("stat-total-debt").textContent = formatCurrency(totalRemaining);
	document.getElementById("stat-remaining-debt").textContent = formatCurrency(totalRemaining);
	document.getElementById("stat-paid-debt").textContent = formatCurrency(totalPlanned);
	document.getElementById("stat-monthly-total").textContent = formatCurrency(totalMonthly);

	paintList();
}

function paintList() {
	debtList.innerHTML = "";

	if (!debts.length) {
		const li = document.createElement("li");
		li.className = "debt-empty";
		li.textContent = t("emptyDebts");
		debtList.appendChild(li);
		return;
	}

	const sorted = [...debts].sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));

	sorted.forEach((debt) => {
		const monthly = debt.monthlyPayment > 0 ? `<span>${t("monthlyLabel")}: <strong>${formatCurrency(debt.monthlyPayment)}</strong></span>` : "";
		const dueText = debt.dueDate ? `<span>${t("dueDateLabel")}: <strong>${formatDisplayDate(debt.dueDate)}</strong></span>` : "";
		const paymentDateText = debt.paymentDate ? `<span>${t("debtPaymentDateLabel")}: <strong>${formatDisplayDate(debt.paymentDate)}</strong></span>` : "";
		const earlyText = debt.earlyPaymentDate ? `<span>${t("debtEarlyPaymentDateLabel")}: <strong>${formatDisplayDate(debt.earlyPaymentDate)}</strong></span>` : "";
		const plannedText = debt.plannedAmount > 0 ? `<span>${t("debtPlannedAmountLabel")}: <strong>${formatCurrency(debt.plannedAmount)}</strong></span>` : "";
		const forecastBadge = debt.addToForecast ? `<span class="debt-forecast-badge" title="${t("debtAddToForecastLabel")}">📋</span>` : "";

		const li = document.createElement("li");
		li.className = "debt-row";
		li.innerHTML = `
			<div class="debt-row-header">
				<strong class="debt-name">${escapeHtml(debt.name)}</strong>
				${forecastBadge}
			</div>
			<div class="debt-row-amounts">
				<span>${t("remainingLabel")}: <strong>${formatCurrency(debt.remainingAmount || 0)}</strong></span>
				${monthly}
				${paymentDateText}
				${dueText}
				${earlyText}
				${plannedText}
			</div>
			<div class="row-actions row-actions-icons">
				<button type="button" class="inline-icon-button" title="${t("editAction")}" aria-label="${t("editAction")}" data-action="edit" data-id="${debt.id}">✎</button>
				<button type="button" class="inline-icon-button danger" title="${t("deleteAction")}" aria-label="${t("deleteAction")}" data-action="delete" data-id="${debt.id}">🗑</button>
			</div>
		`;
		debtList.appendChild(li);
	});
}

function applyTranslations() {
	document.documentElement.lang = appLanguage;
	document.title = t("pageTitle");
	document.querySelectorAll("[data-i18n]").forEach((el) => {
		el.textContent = t(el.dataset.i18n);
	});
	menuToggle.setAttribute("aria-label", t("menuButton"));
	document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
		el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
	});
	document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
		el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
	});
	updateMenuSessionLabel();
	// Keep submit button text in sync
	const editId = document.getElementById("debt-edit-id").value;
	debtSubmitButton.textContent = editId ? t("updateDebtButton") : t("saveDebtButton");
}

function updateMenuSessionLabel() {
	if (!menuSessionInfo) return;
	if (!currentUser) {
		menuSessionInfo.textContent = t("loggedOut");
		return;
	}
	const name = currentUser === GUEST_SESSION_VALUE
		? t("guestUser")
		: (localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.nickname || currentProfile?.username || currentUser);
	menuSessionInfo.textContent = `${t("loggedIn")} ${name}`;
}

function t(key) {
	let current = dictionary[appLanguage] || dictionary.hu;
	for (const part of key.split(".")) {
		current = current ? current[part] : undefined;
	}
	return current || key;
}

function formatCurrency(amount) {
	const num = Number(amount) || 0;
	const locale = appLanguage === "en" ? "en-GB" : "hu-HU";
	const opts = { style: "currency", currency: appCurrency, maximumFractionDigits: appCurrency === "HUF" ? 0 : 2 };
	try {
		return new Intl.NumberFormat(locale, opts).format(num);
	} catch {
		return `${num} ${appCurrency}`;
	}
}

function formatDisplayDate(dateStr) {
	if (!dateStr) return "";
	const [y, m, d] = dateStr.split("-");
	if (!y || !m || !d) return dateStr;
	return appLanguage === "en" ? `${d}/${m}/${y}` : `${y}. ${m}. ${d}.`;
}

function escapeHtml(str) {
	return String(str || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

let messageTimer = null;
function showMessage(text, isError) {
	let msgEl = document.getElementById("app-message");
	if (!msgEl) {
		msgEl = document.createElement("div");
		msgEl.id = "app-message";
		msgEl.setAttribute("role", "status");
		msgEl.setAttribute("aria-live", "polite");
		document.body.appendChild(msgEl);
	}
	msgEl.textContent = text;
	msgEl.className = isError ? "app-message error" : "app-message";
	clearTimeout(messageTimer);
	messageTimer = setTimeout(() => { msgEl.textContent = ""; msgEl.className = "app-message"; }, 4000);
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

function updateInstallButtonState() {
	if (!installAppButton) return;
	installAppButton.classList.toggle("hidden", shared.isAppInstalled() && !deferredInstallPrompt);
}

async function handleLogout() {
	try {
		await logoutCurrentUser();
	} catch {
		// ignore
	}
	localStorage.removeItem(SESSION_KEY);
	window.location.href = "index.html";
}

async function handleAccountDelete() {
	if (currentUser === GUEST_SESSION_VALUE || !currentUser) {
		showMessage(shared.getDeleteAccountNoSessionMessage(appLanguage, currentUser === GUEST_SESSION_VALUE), true);
		return;
	}

	if (!deleteAccountConfirmArmed) {
		deleteAccountConfirmArmed = true;
		showMessage(t("deleteAccountNeedsSecondClick"), true);
		deleteAccountConfirmTimer = setTimeout(() => { deleteAccountConfirmArmed = false; }, 7000);
		return;
	}

	clearTimeout(deleteAccountConfirmTimer);
	deleteAccountConfirmArmed = false;

	try {
		await deleteCurrentAccount();
		localStorage.removeItem(SESSION_KEY);
		shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
		window.location.href = "index.html";
	} catch (error) {
		showMessage(getFirebaseErrorMessage(error, appLanguage), true);
	}
}
