import {
	deleteCurrentAccount,
	getFirebaseErrorMessage,
	logoutCurrentUser,
	restoreSession
} from "./firebase-service.js";

const shared = window.BudgetAppShared;
const { SESSION_KEY, DISPLAY_NAME_KEY, INSTALL_STATUS_KEY } = shared.KEYS;
const { GUEST_SESSION_VALUE } = shared;

const dictionary = {
	hu: {
		pageTitle: "Költségvetési előrejelző",
		heroTitle: "Költségvetési előrejelző",
		heroText: "Tervezd meg előre a kiadásaidat dátum és előrejelzés alapján.",
		menuButton: "Menü",
		homeLink: "Kezdőlap",
		budgetLink: "Költségvetés",
		summaryLink: "Összesítés",
		versionLabel: "Verzió",
		themeModeLight: "Világos",
		themeModeDark: "Sötét",
		contactUs: "Kapcsolat",
		backAction: "Vissza",
		downloadAppButton: "App letöltése",
		deleteAccountButton: "Regisztráció törlése",
		languageLabel: "Nyelv",
		languageSelectorAria: "Nyelv választó",
		themeSwitchAria: "Téma váltó",
		currencySelectorAria: "Pénznem választó",
		currencyLabel: "Pénznem\nválasztó",
		currencyHuf: "HUF (forint)",
		currencyGbp: "GBP (font)",
		currencyUsd: "USD (dollár)",
		currencyEur: "EUR (euró)",
		periodLabel: "Választott időszak",
		periodFromLabel: "-tól",
		periodToLabel: "-ig",
		forecastButton: "Költségvetés",
		forecastTitle: "Költségvetési előrejelző",
		forecastAddRowButton: "+ Extra, váratlan tétel hozzáadása",
		forecastRowTypeLabel: "Típus",
		forecastRowAmountLabel: "Összeg",
		forecastRowDateLabel: "Dátum",
		forecastRowNoteLabel: "Megjegyzés",
		forecastRowNotePlaceholder: "Rövid megjegyzés (opcionális)",
		forecastTypeExpense: "Extra kiadás",
		forecastTypeIncome: "Extra bevétel",
		forecastRemoveRow: "Törlés",
		forecastConfirmDelete: "Biztosan végleg törlöd?",
		forecastConfirmYes: "Igen, törlöm",
		forecastConfirmNo: "Mégsem",
		forecastSaveRow: "Mentés",
		forecastBaseUntilLabel: "Egyenleg eddig a dátumig:",
		forecastWithPurchaseLabel: "Egyenleg tervezett tételekkel:",
		forecastDifferenceLabel: "Különbség:",
		forecastMonthEndImpactLabel: "Egyenleg új állapotban:",
		forecastScenarioNameLabel: "Terv neve",
		forecastScenarioNamePlaceholder: "Pl. Nyári terv",
		forecastScenarioSavedLabel: "Mentett tervek",
		forecastScenarioNone: "Nincs mentett terv",
		forecastLoadButton: "Betöltés",
		forecastScenarioNameRequired: "Adj nevet a tervnek.",
		forecastScenarioEmpty: "Tölts ki egy összeget és dátumot.",
		forecastScenarioSaved: "A terv elmentve.",
		forecastScenarioUpdated: "A terv frissítve.",
		forecastScenarioLoaded: "A kiválasztott terv(ek) betöltve.",
		forecastScenarioSelectRequired: "Válassz ki legalább egy mentett tervet.",
		forecastRowSaved: "A sor elmentve a tervhez.",
		forecastRowDone: "Kész",
		forecastRowRemoved: "A sor törölve.",
		forecastRowConfirmed: "A sor mentve.",
		forecastDeletePlan: "Terv törlése",
		forecastPlanDeleted: "A mentett terv törölve.",
		forecastRemoveFromRow: "Törlés a sorból",
		forecastPermanentDelete: "Végleges törlés",
		deleteAccountNeedsSecondClick: "Kattints újra 7 másodpercen belül a fiók törléséhez.",
		logoutButton: "Kijelentkezés",
		profileEditButton: "Adatok módosítása",
		changeUsernameMenuButton: "Felhasználónév módosítása",
		changePasswordMenuButton: "Jelszó módosítása",
		loggedOut: "Nincs bejelentkezett felhasználó.",
		loggedIn: "Bejelentkezve:",
		guestUser: "Vendég",
		appDownloaded: "Az app letöltve.",
		editAction: "Szerkesztés",
		typeIncome: "Bevétel",
		typeExpense: "Kiadás",
		managingDebtLink: "Adósságkezelő"
	},
	en: {
		pageTitle: "Budget Forecast Planner",
		heroTitle: "Budget Forecast Planner",
		heroText: "Plan your upcoming expenses by date with forecast scenarios.",
		menuButton: "Menu",
		homeLink: "Home",
		budgetLink: "Budget",
		summaryLink: "Summary",
		versionLabel: "Version",
		themeModeLight: "Light",
		themeModeDark: "Dark",
		contactUs: "Contact us",
		backAction: "Back",
		downloadAppButton: "Download App",
		deleteAccountButton: "Delete account",
		languageLabel: "Language",
		languageSelectorAria: "Language selector",
		themeSwitchAria: "Theme switch",
		currencySelectorAria: "Currency selector",
		currencyLabel: "Currency\nselector",
		currencyHuf: "HUF (forint)",
		currencyGbp: "GBP (pound)",
		currencyUsd: "USD (dollar)",
		currencyEur: "EUR (euro)",
		periodLabel: "Selected period",
		periodFromLabel: "from",
		periodToLabel: "to",
		forecastButton: "Budget",
		forecastTitle: "Budget Forecast Planner",
		forecastAddRowButton: "+ Add an extra unexpected item",
		forecastRowTypeLabel: "Type",
		forecastRowAmountLabel: "Amount",
		forecastRowDateLabel: "Date",
		forecastRowNoteLabel: "Note",
		forecastRowNotePlaceholder: "Short note (optional)",
		forecastTypeExpense: "Extra expense",
		forecastTypeIncome: "Extra income",
		forecastRemoveRow: "Delete",
		forecastConfirmDelete: "Are you sure you want to permanently delete this?",
		forecastConfirmYes: "Yes, delete",
		forecastConfirmNo: "Cancel",
		forecastSaveRow: "Save",
		forecastBaseUntilLabel: "Balance up to selected date:",
		forecastWithPurchaseLabel: "Balance with planned items:",
		forecastDifferenceLabel: "Difference:",
		forecastMonthEndImpactLabel: "Updated period-end balance:",
		forecastScenarioNameLabel: "Plan name",
		forecastScenarioNamePlaceholder: "e.g. Summer plan",
		forecastScenarioSavedLabel: "Saved plans",
		forecastScenarioNone: "No saved plan",
		forecastLoadButton: "Load",
		forecastScenarioNameRequired: "Please provide a plan name.",
		forecastScenarioEmpty: "Please enter an amount and date.",
		forecastScenarioSaved: "Plan saved.",
		forecastScenarioUpdated: "Plan updated.",
		forecastScenarioLoaded: "Selected plan(s) loaded.",
		forecastScenarioSelectRequired: "Select at least one saved plan.",
		forecastRowSaved: "Row saved to plan.",
		forecastRowDone: "Done",
		forecastRowRemoved: "Row removed.",
		forecastRowConfirmed: "Row saved.",
		forecastDeletePlan: "Delete plan",
		forecastPlanDeleted: "Saved plan deleted.",
		forecastRemoveFromRow: "Remove from view",
		forecastPermanentDelete: "Permanently delete plan",
		deleteAccountNeedsSecondClick: "Click again within 7 seconds to delete the account.",
		logoutButton: "Sign out",
		profileEditButton: "Edit profile",
		changeUsernameMenuButton: "Change username",
		changePasswordMenuButton: "Change password",
		loggedOut: "No user is signed in.",
		loggedIn: "Signed in as:",
		guestUser: "Guest",
		appDownloaded: "App downloaded.",
		editAction: "Edit",
		typeIncome: "Income",
		typeExpense: "Expense",
		managingDebtLink: "Debt Manager"
	}
};

const today = new Date();
const pageParams = new URLSearchParams(window.location.search);
let currentUser = localStorage.getItem(SESSION_KEY) || "";
let currentProfile = null;
let appLanguage = shared.loadLanguage();
let appTheme = shared.loadTheme();
let appCurrency = shared.loadCurrency();
let appState = { incomes: [], expenses: [] };
let deleteAccountConfirmArmed = false;
let deleteAccountConfirmTimer = null;
let deferredInstallPrompt = null;
let forecastScenarios = [];
let activeForecastScenarioId = "";

const summaryToggleButton = document.getElementById("summary-toggle-button");
const forecastToggleButton = document.getElementById("forecast-toggle-button");
const menuToggle = document.getElementById("menu-toggle");
const menuPanel = document.getElementById("menu-panel");
const contactUsButton = document.getElementById("contact-us-button");
const menuSessionInfo = document.getElementById("menu-session-info");
const menuBackButton = document.getElementById("menu-back-button");
const installAppButton = document.getElementById("install-app-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const themeLightButton = document.getElementById("theme-light-button");
const themeDarkButton = document.getElementById("theme-dark-button");
const menuLogoutButton = document.getElementById("menu-logout-button");
const authMessage = document.getElementById("auth-message");
const budgetContent = document.getElementById("budget-content");
const periodStartInput = document.getElementById("period-start");
const periodEndInput = document.getElementById("period-end");
const languageSelect = document.getElementById("app-language");
const currencySelect = document.getElementById("app-currency");
const addWhatIfRowButton = document.getElementById("add-whatif-row");
const whatIfRowsContainer = document.getElementById("whatif-rows");
const forecastScenarioList = document.getElementById("forecast-scenario-list");
const forecastLoadScenarioButton = document.getElementById("forecast-load-scenario");
const forecastBaseUntilEl = document.getElementById("forecast-base-until");
const forecastWithPurchaseEl = document.getElementById("forecast-with-purchase");
const forecastDifferenceEl = document.getElementById("forecast-difference");
const forecastMonthEndEl = document.getElementById("forecast-month-end");

// Apply theme before async init to prevent flash
applyTheme();
syncThemeButtons();

void initializePage();

languageSelect.addEventListener("change", () => {
	appLanguage = languageSelect.value;
	shared.saveLanguage(appLanguage);
	applyTranslations();
	renderForecastPlanner();
});

currencySelect.addEventListener("change", () => {
	appCurrency = currencySelect.value;
	shared.saveCurrency(appCurrency);
	renderForecastPlanner();
});

[periodStartInput, periodEndInput].forEach((input) => {
	if (!input) return;
	input.addEventListener("change", () => {
		normalizePeriodInputs();
		renderForecastPlanner();
	});
});

if (forecastToggleButton) forecastToggleButton.addEventListener("click", () => { window.location.href = "budget.html"; });
if (summaryToggleButton) {
	summaryToggleButton.addEventListener("click", () => {
		window.location.href = "summary.html";
	});
}
const managingDebtToggleButton = document.getElementById("managing-debt-toggle-button");
if (managingDebtToggleButton) {
	managingDebtToggleButton.addEventListener("click", () => { window.location.href = "managing-debt.html"; });
}

addWhatIfRowButton.addEventListener("click", () => {
	const existing = whatIfRowsContainer.querySelector(".whatif-row[data-manual='true']");
	if (existing) existing.remove();
	appendWhatIfRow({ type: "expense", amount: "", date: "", note: "", planName: "", rowId: shared.createEntryId(), manual: true }, true);
	renderForecastPlanner();
});

if (forecastLoadScenarioButton) forecastLoadScenarioButton.addEventListener("click", loadSelectedForecastScenarios);

whatIfRowsContainer.addEventListener("input", renderForecastPlanner);
whatIfRowsContainer.addEventListener("change", (event) => {
	const sel = event.target;
	if (sel.classList.contains("forecast-whatif-type")) {
		sel.classList.remove("type-expense", "type-income");
		sel.classList.add(`type-${sel.value}`);
	}
	renderForecastPlanner();
});

whatIfRowsContainer.addEventListener("click", (event) => {
	const actionButton = event.target.closest("button[data-action]");
	if (!actionButton) return;
	const rowElement = actionButton.closest(".whatif-row");
	if (!rowElement) return;
	const action = actionButton.dataset.action;

	if (action === "remove-whatif") {
		rowElement.remove();
		showMessage(t("forecastRowRemoved"), false);
		renderForecastPlanner();
		return;
	}

	if (action === "delete-plan") {
		const planName = rowElement.dataset.planName;
		if (!planName) return;

		// Show inline confirmation
		const actionsEl = actionButton.closest(".whatif-row-actions");
		if (actionsEl.querySelector(".forecast-confirm-row")) return; // already showing
		const confirmEl = document.createElement("div");
		confirmEl.className = "forecast-confirm-row";
		confirmEl.innerHTML = `<span>${t("forecastConfirmDelete")}</span>
			<button class="btn btn-danger btn-sm forecast-confirm-yes">${t("forecastConfirmYes")}</button>
			<button class="btn btn-outline-info btn-sm forecast-confirm-no">${t("forecastConfirmNo")}</button>`;
		rowElement.appendChild(confirmEl);

		confirmEl.querySelector(".forecast-confirm-yes").addEventListener("click", () => {
			forecastScenarios = forecastScenarios.filter((s) => s.name !== planName);
			saveForecastScenarios();
			renderScenarioList();
			whatIfRowsContainer.querySelectorAll(".whatif-row").forEach((row) => {
				if (row.dataset.planName === planName) row.remove();
			});
			showMessage(t("forecastPlanDeleted"), false);
			renderForecastPlanner();
		});
		confirmEl.querySelector(".forecast-confirm-no").addEventListener("click", () => {
			confirmEl.remove();
		});
		return;
	}

	if (action === "cancel-edit") {
		const hasData = Number(rowElement.dataset.amount) > 0 || Boolean(rowElement.dataset.date);
		if (hasData) {
			rowElement.classList.remove("edit-mode");
			rowElement.innerHTML = buildWhatIfRowDisplayHTML(rowElement);
		} else {
			rowElement.remove();
			renderForecastPlanner();
		}
		return;
	}

	if (action === "save-whatif") {
		saveWhatIfRow(rowElement);
		return;
	}

	if (action === "edit-whatif") {
		rowElement.classList.add("edit-mode");
		rowElement.innerHTML = buildWhatIfRowEditHTML(rowElement);
		const typeSelect = rowElement.querySelector(".forecast-whatif-type");
		if (typeSelect) typeSelect.value = rowElement.dataset.type || "expense";
		return;
	}

	if (action === "confirm-edit") {
		const type = rowElement.querySelector(".forecast-whatif-type")?.value || "expense";
		const amount = rowElement.querySelector(".forecast-whatif-amount")?.value || "";
		const date = rowElement.querySelector(".forecast-whatif-date")?.value || "";
		const note = String(rowElement.querySelector(".forecast-whatif-note")?.value || "").trim().slice(0, 80);
		const planName = String(rowElement.querySelector(".forecast-whatif-plan-name")?.value || "").trim().slice(0, 50);
		if (!Number(amount) || !date) {
			showMessage(t("forecastScenarioEmpty"), true);
			return;
		}
		rowElement.dataset.type = type;
		rowElement.dataset.amount = amount;
		rowElement.dataset.date = date;
		rowElement.dataset.note = note;
		rowElement.dataset.planName = planName;
		rowElement.classList.remove("edit-mode");
		rowElement.innerHTML = buildWhatIfRowDisplayHTML(rowElement);
		showMessage(t("forecastRowConfirmed"), false);
		renderForecastPlanner();
	}
});

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
	if (!event.target.closest(".saved-plans-dropdown")) {
		document.querySelector(".saved-plans-dropdown")?.removeAttribute("open");
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

if (menuBackButton) menuBackButton.addEventListener("click", () => window.history.back());
if (menuLogoutButton) menuLogoutButton.addEventListener("click", handleLogout);
if (deleteAccountButton) deleteAccountButton.addEventListener("click", handleAccountDelete);
if (themeLightButton) themeLightButton.addEventListener("click", () => setTheme("light"));
if (themeDarkButton) themeDarkButton.addEventListener("click", () => setTheme("dark"));
if (contactUsButton) contactUsButton.addEventListener("click", () => { window.location.href = "contact.html"; });

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

async function initializePage() {
	if (currentUser === GUEST_SESSION_VALUE) {
		appState = shared.loadGuestData();
	} else {
		const session = await restoreSession(currentUser);
		if (!session) { window.location.href = "index.html"; return; }
		currentUser = String(session?.profile?.username || currentUser || "").trim();
		currentProfile = session?.profile || null;
		if (currentUser) localStorage.setItem(SESSION_KEY, currentUser);
		appState = session.data || { incomes: [], expenses: [] };
	}
	setDefaultPeriodRange(pageParams.get("month"));
	languageSelect.value = appLanguage;
	currencySelect.value = appCurrency;
	whatIfRowsContainer.innerHTML = "";
	loadForecastScenarios();
	renderScenarioList();
	applyTranslations();
	updateAccessUI();
	updateInstallButtonState();
	renderForecastPlanner();
}

function applyTranslations() {
	document.documentElement.lang = appLanguage;
	document.title = t("pageTitle");
	document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
	menuToggle.setAttribute("aria-label", t("menuButton"));
	document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
		el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
	});
	document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
		el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
	});
	refreshWhatIfRowLabels();
	renderScenarioList();
	updateMenuSessionLabel();
}

function getForecastScenarioStorageKey() {
	const key = currentUser === GUEST_SESSION_VALUE ? "guest" : (currentUser || "anon");
	return `budgetAppForecastScenarios:${key}`;
}

function normalizeScenarioRows(rows) {
	return (Array.isArray(rows) ? rows : []).map((row) => ({
		rowId: String(row?.rowId || shared.createEntryId()),
		type: row?.type === "income" ? "income" : "expense",
		amount: Number(row?.amount || 0),
		date: String(row?.date || ""),
		note: String(row?.note || "").trim().slice(0, 80)
	}));
}

function loadForecastScenarios() {
	if (currentUser === GUEST_SESSION_VALUE) { forecastScenarios = []; return; }
	const raw = localStorage.getItem(getForecastScenarioStorageKey());
	if (!raw) { forecastScenarios = []; return; }
	try {
		const parsed = JSON.parse(raw);
		forecastScenarios = (Array.isArray(parsed) ? parsed : [])
			.map((s) => ({
				id: String(s?.id || shared.createEntryId()),
				name: String(s?.name || "").trim().slice(0, 50),
				targetDate: String(s?.targetDate || ""),
				rows: normalizeScenarioRows(s?.rows)
			}))
			.filter((s) => s.name);
	} catch (_e) {
		forecastScenarios = [];
	}
}

function saveForecastScenarios() {
	if (currentUser === GUEST_SESSION_VALUE) return;
	localStorage.setItem(getForecastScenarioStorageKey(), JSON.stringify(forecastScenarios));
}

function renderScenarioList() {
	if (!forecastScenarioList) return;
	forecastScenarioList.innerHTML = "";
	if (!forecastScenarios.length) {
		const empty = document.createElement("p");
		empty.className = "forecast-scenario-empty";
		empty.textContent = t("forecastScenarioNone");
		forecastScenarioList.appendChild(empty);
		return;
	}
	forecastScenarios.forEach((scenario) => {
		const label = document.createElement("label");
		label.className = "saved-plan-item";
		label.title = scenario.name;
		const cb = document.createElement("input");
		cb.type = "checkbox";
		cb.className = "saved-plan-checkbox";
		cb.value = scenario.id;
		const span = document.createElement("span");
		span.textContent = scenario.name;
		label.appendChild(cb);
		label.appendChild(span);
		forecastScenarioList.appendChild(label);
	});
}

function loadSelectedForecastScenarios() {
	const checkedIds = Array.from(
		forecastScenarioList?.querySelectorAll(".saved-plan-checkbox:checked") || []
	).map((cb) => cb.value);
	if (!checkedIds.length) {
		showMessage(t("forecastScenarioSelectRequired"), true);
		return;
	}
	whatIfRowsContainer.innerHTML = "";
	checkedIds.forEach((id) => {
		const scenario = forecastScenarios.find((s) => s.id === id);
		if (scenario) {
			normalizeScenarioRows(scenario.rows).forEach((row) => {
				appendWhatIfRow({ ...row, planName: scenario.name });
			});
		}
	});
	document.querySelector(".saved-plans-dropdown")?.removeAttribute("open");
	showMessage(t("forecastScenarioLoaded"), false);
	renderForecastPlanner();
}

function ensureActiveScenario(scenarioName) {
	const targetDate = periodEndInput?.value || "";
	if (activeForecastScenarioId) {
		const existing = forecastScenarios.find((s) => s.id === activeForecastScenarioId);
		if (existing && existing.name === scenarioName) {
			existing.targetDate = targetDate;
			return existing;
		}
	}
	const byName = forecastScenarios.find((s) => s.name === scenarioName);
	if (byName) {
		byName.targetDate = targetDate;
		activeForecastScenarioId = byName.id;
		return byName;
	}
	const created = { id: shared.createEntryId(), name: scenarioName, targetDate, rows: [] };
	forecastScenarios.push(created);
	activeForecastScenarioId = created.id;
	return created;
}

function saveWhatIfRow(rowElement) {
	const isEdit = rowElement.classList.contains("edit-mode");
	const rowId = rowElement.dataset.rowId || shared.createEntryId();
	rowElement.dataset.rowId = rowId;

	const type = isEdit ? (rowElement.querySelector(".forecast-whatif-type")?.value || "expense") : (rowElement.dataset.type || "expense");
	const amount = isEdit ? Number(rowElement.querySelector(".forecast-whatif-amount")?.value || 0) : Number(rowElement.dataset.amount || 0);
	const date = isEdit ? (rowElement.querySelector(".forecast-whatif-date")?.value || "") : (rowElement.dataset.date || "");
	const note = isEdit ? String(rowElement.querySelector(".forecast-whatif-note")?.value || "").trim().slice(0, 80) : (rowElement.dataset.note || "");
	const planName = isEdit ? String(rowElement.querySelector(".forecast-whatif-plan-name")?.value || "").trim().slice(0, 50) : (rowElement.dataset.planName || "");

	if (!planName) { showMessage(t("forecastScenarioNameRequired"), true); return; }
	if (!(amount > 0 && date)) { showMessage(t("forecastScenarioEmpty"), true); return; }

	if (isEdit) {
		rowElement.dataset.type = type;
		rowElement.dataset.amount = String(amount);
		rowElement.dataset.date = date;
		rowElement.dataset.note = note;
		rowElement.dataset.planName = planName;
	}

	const scenario = ensureActiveScenario(planName);
	const rowData = { rowId, type, amount, date, note, planName };
	const idx = scenario.rows.findIndex((r) => r.rowId === rowId);
	if (idx >= 0) {
		scenario.rows[idx] = rowData;
		showMessage(t("forecastScenarioUpdated"), false);
	} else {
		scenario.rows.push(rowData);
		showMessage(t("forecastRowSaved"), false);
	}
	scenario.targetDate = periodEndInput?.value || scenario.targetDate;
	saveForecastScenarios();
	renderScenarioList();

	if (isEdit) {
		rowElement.classList.remove("edit-mode");
		rowElement.innerHTML = buildWhatIfRowDisplayHTML(rowElement);
	}
}

function appendWhatIfRow(row, prepend = false) {
	const wrapper = document.createElement("div");
	wrapper.className = "whatif-row";
	wrapper.dataset.rowId = String(row.rowId || shared.createEntryId());
	wrapper.dataset.type = row.type || "expense";
	wrapper.dataset.amount = String(row.amount ?? "");
	wrapper.dataset.date = row.date || "";
	wrapper.dataset.note = String(row.note || "").slice(0, 80);
	wrapper.dataset.planName = String(row.planName || "").slice(0, 50);
	if (row.manual) wrapper.dataset.manual = "true";

	const hasData = Number(row.amount) > 0 || Boolean(row.date);
	if (hasData) {
		wrapper.innerHTML = buildWhatIfRowDisplayHTML(wrapper);
	} else {
		wrapper.classList.add("edit-mode");
		wrapper.innerHTML = buildWhatIfRowEditHTML(wrapper);
		const typeSelect = wrapper.querySelector(".forecast-whatif-type");
		if (typeSelect) typeSelect.value = wrapper.dataset.type || "expense";
	}

	if (prepend) whatIfRowsContainer.insertBefore(wrapper, whatIfRowsContainer.firstChild);
	else whatIfRowsContainer.appendChild(wrapper);
}

function buildWhatIfRowDisplayHTML(wrapper) {
	const type = wrapper.dataset.type || "expense";
	const amount = Number(wrapper.dataset.amount || 0);
	const date = wrapper.dataset.date || "";
	const note = wrapper.dataset.note || "";
	const planName = wrapper.dataset.planName || "";
	const typeLabel = type === "income" ? t("forecastTypeIncome") : t("forecastTypeExpense");
	const displayAmount = amount > 0 ? formatCurrency(amount) : "–";
	const displayDate = date ? formatDisplayDate(date) : "–";
	return `
		<div class="whatif-row-display">
			<span class="whatif-type-tag ${type}">${typeLabel}</span>
			${planName ? `<span class="whatif-plan-name">${escapeHtml(planName)}</span>` : ""}
			<span class="whatif-amount">${displayAmount}</span>
			<span class="whatif-date">${displayDate}</span>
			${note ? `<span class="whatif-note">${escapeHtml(note)}</span>` : ""}
		</div>
		<div class="whatif-row-actions">
			<button type="button" class="icon-btn" data-action="edit-whatif" title="${t("editAction")}">✎</button>
			<button type="button" class="icon-btn" data-action="save-whatif" title="${t("forecastSaveRow")}">💾</button>
			<button type="button" class="icon-btn close-btn" data-action="remove-whatif" title="${t("forecastRemoveFromRow")}">✕</button>
			${planName ? `<span class="icon-btn-divider" aria-hidden="true"></span><button type="button" class="icon-btn danger" data-action="delete-plan" title="${t("forecastPermanentDelete")}">✕</button>` : ""}
		</div>
	`;
}

function buildWhatIfRowEditHTML(wrapper) {
	const amount = wrapper.dataset.amount || "";
	const date = wrapper.dataset.date || "";
	const note = wrapper.dataset.note || "";
	const planName = wrapper.dataset.planName || "";
	const dateValue = date || periodEndInput?.value || "";
	const typeClass = `type-${wrapper.dataset.type || "expense"}`;
	return `
		<div class="whatif-row-fields">
			<div class="whatif-field">
				<label>${t("forecastScenarioNameLabel")}</label>
				<input type="text" class="forecast-whatif-plan-name" maxlength="50"
					placeholder="${t("forecastScenarioNamePlaceholder")}"
					value="${escapeHtml(planName)}">
			</div>
			<div class="whatif-field whatif-field-type">
				<label>${t("forecastRowTypeLabel")}</label>
				<select class="forecast-whatif-type ${typeClass}">
					<option value="expense" style="color:#b7203d;font-weight:700">${t("forecastTypeExpense")}</option>
					<option value="income" style="color:#1a7a4e;font-weight:700">${t("forecastTypeIncome")}</option>
				</select>
			</div>
			<div class="whatif-field whatif-field-amount">
				<label>${t("forecastRowAmountLabel")}</label>
				<input type="number" class="forecast-whatif-amount" min="0" step="1" inputmode="decimal" value="${amount}">
			</div>
			<div class="whatif-field whatif-field-date">
				<label>${t("forecastRowDateLabel")}</label>
				<input type="date" class="forecast-whatif-date" value="${dateValue}">
			</div>
			<div class="whatif-field">
				<label>${t("forecastRowNoteLabel")}</label>
				<input type="text" class="forecast-whatif-note" maxlength="80"
					placeholder="${t("forecastRowNotePlaceholder")}"
					value="${escapeHtml(note)}">
			</div>
		</div>
		<div class="whatif-row-actions">
			<button type="button" class="icon-btn confirm-edit" data-action="confirm-edit" title="${t("forecastRowDone")}">💾</button>
			<button type="button" class="icon-btn" data-action="cancel-edit" title="${t("editAction")}">✎</button>
			<button type="button" class="icon-btn close-btn" data-action="remove-whatif" title="${t("forecastRemoveFromRow")}">✕</button>
			${planName ? `<span class="icon-btn-divider" aria-hidden="true"></span><button type="button" class="icon-btn danger" data-action="delete-plan" title="${t("forecastPermanentDelete")}">✕</button>` : ""}
		</div>
	`;
}

function refreshWhatIfRowLabels() {
	whatIfRowsContainer.querySelectorAll(".whatif-row").forEach((row) => {
		if (row.classList.contains("edit-mode")) {
			const type = row.querySelector(".forecast-whatif-type")?.value;
			const amount = row.querySelector(".forecast-whatif-amount")?.value;
			const date = row.querySelector(".forecast-whatif-date")?.value;
			const note = row.querySelector(".forecast-whatif-note")?.value;
			const planName = row.querySelector(".forecast-whatif-plan-name")?.value;
			if (type !== undefined) row.dataset.type = type;
			if (amount !== undefined) row.dataset.amount = amount;
			if (date !== undefined) row.dataset.date = date;
			if (note !== undefined) row.dataset.note = note;
			if (planName !== undefined) row.dataset.planName = planName;
			row.innerHTML = buildWhatIfRowEditHTML(row);
			const typeSelect = row.querySelector(".forecast-whatif-type");
			if (typeSelect) typeSelect.value = row.dataset.type || "expense";
		} else {
			row.innerHTML = buildWhatIfRowDisplayHTML(row);
		}
	});
}

function collectWhatIfRows(periodStart, periodEnd) {
	return Array.from(whatIfRowsContainer.querySelectorAll(".whatif-row")).map((row) => {
		let type, amount, date;
		if (row.classList.contains("edit-mode")) {
			type = row.querySelector(".forecast-whatif-type")?.value || "expense";
			amount = Number(row.querySelector(".forecast-whatif-amount")?.value || 0);
			date = row.querySelector(".forecast-whatif-date")?.value || "";
		} else {
			type = row.dataset.type || "expense";
			amount = Number(row.dataset.amount || 0);
			date = row.dataset.date || "";
		}
		return { type, amount, date, valid: amount > 0 && Boolean(date) && date >= periodStart && date <= periodEnd };
	});
}

function renderForecastPlanner() {
	const zero = formatCurrency(0);
	if (!currentUser) {
		if (forecastBaseUntilEl) forecastBaseUntilEl.textContent = zero;
		if (forecastWithPurchaseEl) forecastWithPurchaseEl.textContent = zero;
		if (forecastDifferenceEl) forecastDifferenceEl.textContent = zero;
		if (forecastMonthEndEl) forecastMonthEndEl.textContent = zero;
		return;
	}
	const period = getSelectedPeriod();
	const incomes = (appState.incomes || []).filter((e) => e.date >= period.start && e.date <= period.end);
	const expenses = (appState.expenses || []).filter((e) => e.date >= period.start && e.date <= period.end);
	const whatIfRows = collectWhatIfRows(period.start, period.end);

	const baseUntil =
		shared.sumEntries(incomes.filter((e) => e.date <= period.end)) -
		shared.sumEntries(expenses.filter((e) => e.date <= period.end));
	const adjustUntil = whatIfRows
		.filter((r) => r.valid && r.date <= period.end)
		.reduce((sum, r) => sum + (r.type === "income" ? r.amount : -r.amount), 0);
	const withPurchase = baseUntil + adjustUntil;
	const baseMonthEnd = shared.sumEntries(incomes) - shared.sumEntries(expenses);
	const allAdjust = whatIfRows
		.filter((r) => r.valid)
		.reduce((sum, r) => sum + (r.type === "income" ? r.amount : -r.amount), 0);

	if (forecastBaseUntilEl) forecastBaseUntilEl.textContent = formatCurrency(baseUntil);
	if (forecastWithPurchaseEl) forecastWithPurchaseEl.textContent = formatCurrency(withPurchase);
	if (forecastDifferenceEl) forecastDifferenceEl.textContent = formatCurrency(withPurchase - baseUntil);
	if (forecastMonthEndEl) forecastMonthEndEl.textContent = formatCurrency(baseMonthEnd + allAdjust);
}

async function handleLogout() {
	menuPanel.classList.remove("is-open");
	menuToggle.classList.remove("is-open");
	menuToggle.setAttribute("aria-expanded", "false");
	if (currentUser && currentUser !== GUEST_SESSION_VALUE) await logoutCurrentUser().catch(() => null);
	currentUser = "";
	currentProfile = null;
	appState = { incomes: [], expenses: [] };
	localStorage.removeItem(SESSION_KEY);
	window.location.href = "index.html";
}

async function handleAccountDelete() {
	if (!currentUser || currentUser === GUEST_SESSION_VALUE) {
		resetDeleteAccountConfirmState();
		showMessage(shared.getDeleteAccountNoSessionMessage(appLanguage, currentUser === GUEST_SESSION_VALUE), true);
		return;
	}
	if (!deleteAccountConfirmArmed) {
		deleteAccountConfirmArmed = true;
		if (deleteAccountConfirmTimer) window.clearTimeout(deleteAccountConfirmTimer);
		deleteAccountConfirmTimer = window.setTimeout(resetDeleteAccountConfirmState, 7000);
		showMessage(t("deleteAccountNeedsSecondClick"), true);
		return;
	}
	resetDeleteAccountConfirmState();
	try {
		showMessage(appLanguage === "en" ? "Deleting account..." : "Fiók törlése folyamatban...", false);
		await deleteCurrentAccount();
		await shared.sendAccountDeletionEmail(appLanguage, currentProfile?.email || "", currentUser);
		await logoutCurrentUser().catch(() => null);
		shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
		currentUser = "";
		currentProfile = null;
		localStorage.removeItem(SESSION_KEY);
		localStorage.removeItem(DISPLAY_NAME_KEY);
		window.setTimeout(() => { window.location.href = "index.html"; }, 500);
	} catch (error) {
		showMessage(getFirebaseErrorMessage(error, appLanguage, "delete"), true);
	}
}

function resetDeleteAccountConfirmState() {
	deleteAccountConfirmArmed = false;
	if (deleteAccountConfirmTimer) {
		window.clearTimeout(deleteAccountConfirmTimer);
		deleteAccountConfirmTimer = null;
	}
}

function updateAccessUI() {
	if (budgetContent) budgetContent.classList.remove("hidden");
	menuToggle.disabled = false;
}

function getDateRange(startDate, endDate) {
	if (!startDate || !endDate || startDate <= endDate) return { start: startDate, end: endDate };
	return { start: endDate, end: startDate };
}

function getSelectedPeriod() {
	normalizePeriodInputs();
	const fallback = shared.toDateInput(today);
	const start = periodStartInput?.value || fallback;
	const end = periodEndInput?.value || start;
	return getDateRange(start, end);
}

function normalizePeriodInputs() {
	if (!periodStartInput || !periodEndInput) return;
	const range = getDateRange(periodStartInput.value, periodEndInput.value);
	if (range.start) periodStartInput.value = range.start;
	if (range.end) periodEndInput.value = range.end;
}

function setDefaultPeriodRange(queryMonth) {
	const monthValue = queryMonth && /^\d{4}-\d{2}$/.test(queryMonth) ? queryMonth : shared.toMonthInput(today);
	if (periodStartInput) periodStartInput.value = `${monthValue}-01`;
	if (periodEndInput) periodEndInput.value = shared.getMonthEndDate(monthValue);
}

function t(key) {
	const parts = key.split(".");
	let current = dictionary[appLanguage] || dictionary.hu;
	for (const part of parts) current = current ? current[part] : undefined;
	return current !== undefined ? current : key;
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
		themeLightButton.classList.toggle("is-active", appTheme === "light");
		themeLightButton.setAttribute("aria-pressed", String(appTheme === "light"));
	}
	if (themeDarkButton) {
		themeDarkButton.classList.toggle("is-active", appTheme === "dark");
		themeDarkButton.setAttribute("aria-pressed", String(appTheme === "dark"));
	}
}

function showMessage(message, isError) {
	if (!authMessage) return;
	authMessage.textContent = String(message || "");
	authMessage.classList.toggle("hidden", !message);
	authMessage.classList.toggle("error", Boolean(isError));
	authMessage.classList.toggle("ok", !isError);
}

function formatCurrency(amount) {
	const locale = appLanguage === "en" ? "en-GB" : "hu-HU";
	const symbols = { HUF: "Ft", GBP: "£", USD: "$", EUR: "€" };
	const value = new Intl.NumberFormat(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(amount) || 0);
	return `${value} ${symbols[appCurrency] || appCurrency}`;
}

function formatDisplayDate(isoDate) {
	if (!isoDate) return "";
	const d = new Date(`${isoDate}T00:00:00`);
	if (Number.isNaN(d.getTime())) return isoDate;
	return appLanguage === "en"
		? d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
		: d.toLocaleDateString("hu-HU");
}

function escapeHtml(text) {
	return String(text || "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

function updateInstallButtonState() {
	if (!installAppButton) return;
	const installed = shared.isAppInstalled() && !deferredInstallPrompt;
	installAppButton.textContent = t(installed ? "appDownloaded" : "downloadAppButton");
	installAppButton.disabled = installed;
}

function updateMenuSessionLabel() {
	if (!menuSessionInfo) return;
	if (!currentUser) { menuSessionInfo.textContent = t("loggedOut"); return; }
	const name = currentUser === GUEST_SESSION_VALUE
		? t("guestUser")
		: (localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.nickname || currentProfile?.username || currentUser);
	menuSessionInfo.textContent = `${t("loggedIn")} ${name}`;
}
