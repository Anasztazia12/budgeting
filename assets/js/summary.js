import {
	deleteCurrentAccount,
	getFirebaseErrorMessage,
	logoutCurrentUser,
	restoreSession,
	saveCurrentUserData
} from "./firebase-service.js";

const shared = window.BudgetAppShared;
const { SESSION_KEY, DISPLAY_NAME_KEY, INSTALL_STATUS_KEY } = shared.KEYS;
const { GUEST_SESSION_VALUE } = shared;

const INCOME_CATEGORIES = ["fizetes", "egyeb"];
const EXPENSE_CATEGORIES = [
	"auto","aram","benzin","biztositas","council","elemiszer","gaz","hitelkartya",
	"internet","iskola","rent","ruhak","szamlak","telefon","travel","tv","viz","egyeb kiadas"
];

const dictionary = {
	hu: {
		pageTitle: "Összesítés",
		heroTitle: "Összesítés",
		heroText: "Bevételek és kiadások összesítése választott időszakra.",
		menuButton: "Menü",
		homeLink: "Kezdőlap",
		budgetLink: "Költségvetés",
		forecastButton: "Költségvetési előrejelző",
		versionLabel: "Verzió",
		themeModeLight: "Világos",
		themeModeDark: "Sötét",
		contactUs: "Kapcsolat",
		backAction: "Vissza",
		downloadAppButton: "App letöltése",
		deleteAccountButton: "Regisztráció törlése",
		logoutAction: "Kijelentkezés",
		profileEditButton: "Adatok módosítása",
		changeUsernameMenuButton: "Felhasználónév módosítása",
		changePasswordMenuButton: "Jelszó módosítása",
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
		loggedOut: "Nincs bejelentkezett felhasználó.",
		loggedIn: "Bejelentkezve:",
		guestUser: "Vendég",
		loginRequired: "Az összesítéshez jelentkezz be a Költségvetés oldalon.",
		monthlyIncomeTitle: "Bevétel összesen",
		monthlyExpenseTitle: "Kiadás összesen",
		spentToDateTitle: "Kiadás a mai napig",
		currentBalanceTitle: "Egyenleg az időszakban",
		incomeEntriesTitle: "Bevételek ebben az időszakban",
		expenseEntriesTitle: "Kiadások ebben az időszakban",
		projectionTitle: "Időszak végi becslés",
		noData: "Nincs adat.",
		appDownloaded: "Az app letöltve.",
		appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
		deleteAccountNeedsSecondClick: "A fiok torlesehez kattints ujra 7 masodpercen belul.",
		emptyEntries: "Nincs tétel a kiválasztott időszakban.",
		projectionText: "Várható egyenleg {date} dátumra: {amount}.",
		projectionTextNoDate: "Várható egyenleg: {amount}.",
		editEntryTitle: "Tétel szerkesztése",
		saveEntryButton: "Mentés",
		cancelModalButton: "Mégse",
		editAction: "Szerkesztés",
		deleteAction: "Törlés",
		repeatMonthlyAction: "Megjelenítés minden hónapban",
		repeatMonthlyBadge: "Ismétlődő",
		repeatEnabled: "Ismétlődő megjelenítés bekapcsolva.",
		repeatDisabled: "Ismétlődő megjelenítés kikapcsolva.",
		repeatInEveryMonthLabel: "Megjelenítés minden hónapban",
		entryUpdated: "A tétel frissítve.",
		entryDeleted: "A tétel törölve.",
		confirmDelete: "Biztosan törölni szeretnéd ezt a tételt?",
		deleteScopeTitle: "Ismétlődő tétel törlése",
		deleteScopeMessage: "Válaszd ki, honnan töröljük a tételt.",
		deleteOnlyThisMonthButton: "Törlés csak ebből a hónapból",
		deleteAllMonthsButton: "Törlés minden hónapból",
		noteLabel: "Megjegyzés (opcionális)",
		amountLabel: "Összeg",
		categoryLabel: "Kategória",
		incomeDateLabel: "Dátum",
		managingDebtLink: "Adósságkezelő",
		categories: {
			fizetes: "Fizetés", egyeb: "Egyéb",
			"child benefit": "Családi pótlék",
			"universal credit": "Universal Credit",
			"jobseeker allowance": "Munkanélküli segély",
			"maternity allowance": "Anyasági ellátás",
			szamlak: "Számlák", viz: "Víz", gaz: "Gáz", aram: "Áram",
			auto: "Autó", benzin: "Benzin", elemiszer: "Élelmiszer", ruhak: "Ruhák",
			etterem: "Étterem", lakashitel: "Lakáshitel", nyaralas: "Nyaralás",
			rent: "Albérlet", biztositas: "Biztosítás", hitelkartya: "Hitelkártya",
			council: "Önkormányzat", tv: "TV", telefon: "Telefon", internet: "Internet",
			iskola: "Iskola", travel: "Utazás", "egyeb kiadas": "Egyéb kiadás"
		}
	},
	en: {
		pageTitle: "Summary",
		heroTitle: "Summary",
		heroText: "Income and expense summary for a selected date range.",
		menuButton: "Menu",
		homeLink: "Home",
		budgetLink: "Budget",
		forecastButton: "Budget Forecast Planner",
		versionLabel: "Version",
		themeModeLight: "Light",
		themeModeDark: "Dark",
		contactUs: "Contact us",
		backAction: "Back",
		downloadAppButton: "Download App",
		deleteAccountButton: "Delete account",
		logoutAction: "Sign out",
		profileEditButton: "Edit profile",
		changeUsernameMenuButton: "Change username",
		changePasswordMenuButton: "Change password",
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
		loggedOut: "No user is signed in.",
		loggedIn: "Signed in as:",
		guestUser: "Guest",
		loginRequired: "Please sign in on the Budget page first.",
		monthlyIncomeTitle: "Total income",
		monthlyExpenseTitle: "Total expense",
		spentToDateTitle: "Spent to date",
		currentBalanceTitle: "Balance in period",
		incomeEntriesTitle: "Income in this period",
		expenseEntriesTitle: "Expenses in this period",
		projectionTitle: "End-of-period projection",
		noData: "No data.",
		appDownloaded: "App downloaded.",
		appInstallUnavailable: "App install is not available on this device right now.",
		deleteAccountNeedsSecondClick: "Click again within 7 seconds to delete your account.",
		emptyEntries: "No entries in the selected period.",
		projectionText: "Projected balance for {date}: {amount}.",
		projectionTextNoDate: "Projected balance: {amount}.",
		editEntryTitle: "Edit entry",
		saveEntryButton: "Save",
		cancelModalButton: "Cancel",
		editAction: "Edit",
		deleteAction: "Delete",
		repeatMonthlyAction: "Show every month",
		repeatMonthlyBadge: "Monthly repeat",
		repeatEnabled: "Monthly repeat enabled.",
		repeatDisabled: "Monthly repeat disabled.",
		repeatInEveryMonthLabel: "Show in every month",
		entryUpdated: "Entry updated.",
		entryDeleted: "Entry deleted.",
		confirmDelete: "Delete this entry?",
		deleteScopeTitle: "Delete recurring entry",
		deleteScopeMessage: "Choose where to delete this entry.",
		deleteOnlyThisMonthButton: "Delete only from this month",
		deleteAllMonthsButton: "Delete from all months",
		noteLabel: "Note (optional)",
		amountLabel: "Amount",
		categoryLabel: "Category",
		incomeDateLabel: "Date",
		managingDebtLink: "Debt Manager",
		categories: {
			fizetes: "Salary", egyeb: "Other",
			"child benefit": "Child Benefit",
			"universal credit": "Universal Credit",
			"jobseeker allowance": "Jobseeker's Allowance",
			"maternity allowance": "Maternity Allowance",
			szamlak: "Bills", viz: "Water", gaz: "Gas", aram: "Electricity",
			auto: "Car", benzin: "Fuel", elemiszer: "Groceries", ruhak: "Clothes",
			etterem: "Restaurant", lakashitel: "Mortgage", nyaralas: "Holiday",
			rent: "Rent", biztositas: "Insurance", hitelkartya: "Credit card",
			council: "Council tax", tv: "TV", telefon: "Phone", internet: "Internet",
			iskola: "School", travel: "Travel", "egyeb kiadas": "Other expense"
		}
	}
};

const today = new Date();
let currentUser = localStorage.getItem(SESSION_KEY) || "";
let currentProfile = null;
let appLanguage = shared.loadLanguage();
let appTheme = shared.loadTheme();
let appCurrency = shared.loadCurrency();
let appState = { incomes: [], expenses: [] };
let deleteScopeResolver = null;
let inlineDeleteConfirmResolver = null;
let inlineDeleteConfirmElement = null;
let inlineDeleteConfirmOutsideHandler = null;
let deferredInstallPrompt = null;
let deleteAccountConfirmArmed = false;
let deleteAccountConfirmTimer = null;
let chartInstance = null;

// DOM refs
const menuToggle = document.getElementById("menu-toggle");
const menuPanel = document.getElementById("menu-panel");
const contactUsButton = document.getElementById("contact-us-button");
const menuBackButton = document.getElementById("menu-back-button");
const installAppButton = document.getElementById("install-app-button");
const deleteAccountButton = document.getElementById("delete-account-button");
const summaryToggleButton = document.getElementById("summary-toggle-button");
const forecastToggleButton = document.getElementById("forecast-toggle-button");
const themeLightButton = document.getElementById("theme-light-button");
const themeDarkButton = document.getElementById("theme-dark-button");
const menuLogoutButton = document.getElementById("menu-logout-button");
const menuSessionInfo = document.getElementById("menu-session-info");
const languageSelect = document.getElementById("app-language");
const currencySelect = document.getElementById("app-currency");
const periodStartInput = document.getElementById("period-start");
const periodEndInput = document.getElementById("period-end");
const lockedMessage = document.getElementById("locked-message");
const summaryContent = document.getElementById("summary-content");
const monthlyIncomeEl = document.getElementById("monthly-income");
const monthlyExpenseEl = document.getElementById("monthly-expense");
const spentToDateEl = document.getElementById("spent-to-date");
const currentBalanceEl = document.getElementById("current-balance");
const incomeListEl = document.getElementById("income-list");
const expenseListEl = document.getElementById("expense-list");
const projectionTextEl = document.getElementById("projection-text");
const entryStatusMsg = document.getElementById("entry-status-message");
const deleteScopeModal = document.getElementById("delete-scope-modal");
const deleteThisMonthButton = document.getElementById("delete-this-month-btn");
const deleteAllMonthsButton = document.getElementById("delete-all-months-btn");
const deleteScopeCancelButton = document.getElementById("delete-scope-cancel");
const editEntryModal = document.getElementById("edit-entry-modal");
const editEntryForm = document.getElementById("edit-entry-form");
const editEntryCancelButton = document.getElementById("edit-entry-cancel");
const chartTypeSelect = document.getElementById("chart-type");

// ── Init ──────────────────────────────────────────────────────────────────────

window.addEventListener("DOMContentLoaded", () => {
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
	if (periodStartInput) periodStartInput.addEventListener("change", render);
	if (periodEndInput) periodEndInput.addEventListener("change", render);
	if (chartTypeSelect) chartTypeSelect.addEventListener("change", render);

	if (forecastToggleButton) {
		forecastToggleButton.addEventListener("click", () => {
			window.location.href = "budget-forecast.html";
		});
	}
	if (summaryToggleButton) {
		summaryToggleButton.addEventListener("click", () => {
			const start = periodStartInput?.value || shared.toDateInput(today);
			window.location.href = `budget.html?month=${encodeURIComponent(start.slice(0, 7))}`;
		});
	}
	const managingDebtToggleButton = document.getElementById("managing-debt-toggle-button");
	if (managingDebtToggleButton) {
		managingDebtToggleButton.addEventListener("click", () => {
			window.location.href = "managing-debt.html";
		});
	}

	menuToggle.addEventListener("click", () => {
		const isOpen = menuPanel.classList.toggle("is-open");
		menuToggle.classList.toggle("is-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});
	document.addEventListener("click", (e) => {
		if (!e.target.closest(".menu-wrap")) {
			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (inlineDeleteConfirmResolver) { closeInlineDeleteConfirm(false); return; }
			if (deleteScopeModal && !deleteScopeModal.classList.contains("hidden")) { closeDeleteScopeModal(null); return; }
			if (editEntryModal && !editEntryModal.classList.contains("hidden")) { closeEditModal(); return; }
			if (menuPanel.classList.contains("is-open")) {
				menuPanel.classList.remove("is-open");
				menuToggle.classList.remove("is-open");
				menuToggle.setAttribute("aria-expanded", "false");
				menuToggle.focus();
			}
		}
	});

	if (themeLightButton) themeLightButton.addEventListener("click", () => setTheme("light"));
	if (themeDarkButton) themeDarkButton.addEventListener("click", () => setTheme("dark"));
	if (contactUsButton) contactUsButton.addEventListener("click", () => { window.location.href = "contact.html"; });
	menuLogoutButton.addEventListener("click", handleLogout);
	if (deleteAccountButton) deleteAccountButton.addEventListener("click", handleAccountDelete);
	menuBackButton.addEventListener("click", () => { window.history.back(); });

	installAppButton.addEventListener("click", async () => {
		if (shared.isAppInstalled() && !deferredInstallPrompt) { setMenuInfoMessage(t("appDownloaded")); return; }
		if (!deferredInstallPrompt) { setMenuInfoMessage(shared.getInstallUnavailableMessage(appLanguage)); return; }
		menuPanel.classList.remove("is-open");
		menuToggle.classList.remove("is-open");
		menuToggle.setAttribute("aria-expanded", "false");
		deferredInstallPrompt.prompt();
		const choice = await deferredInstallPrompt.userChoice;
		if (choice.outcome === "accepted") { localStorage.setItem(INSTALL_STATUS_KEY, "1"); setMenuInfoMessage(t("appDownloaded")); }
		deferredInstallPrompt = null;
		updateInstallButtonState();
	});
// Delete scope modal buttons
	if (deleteThisMonthButton) deleteThisMonthButton.addEventListener("click", () => closeDeleteScopeModal("month"));
	if (deleteAllMonthsButton) deleteAllMonthsButton.addEventListener("click", () => closeDeleteScopeModal("all"));
	if (deleteScopeCancelButton) deleteScopeCancelButton.addEventListener("click", () => closeDeleteScopeModal(null));
	if (deleteScopeModal) {
		deleteScopeModal.addEventListener("click", (e) => { if (e.target === deleteScopeModal) closeDeleteScopeModal(null); });
	}

	// Edit modal
	if (editEntryForm) editEntryForm.addEventListener("submit", saveEditEntry);
	if (editEntryCancelButton) editEntryCancelButton.addEventListener("click", closeEditModal);
	if (editEntryModal) {
		editEntryModal.addEventListener("click", (e) => { if (e.target === editEntryModal) closeEditModal(); });
	}

	// Entry list actions (click + change for checkboxes)
	if (incomeListEl) {
		incomeListEl.addEventListener("click", (e) => handleEntryAction(e, "incomes"));
		incomeListEl.addEventListener("change", (e) => handleEntryAction(e, "incomes"));
	}
	if (expenseListEl) {
		expenseListEl.addEventListener("click", (e) => handleEntryAction(e, "expenses"));
		expenseListEl.addEventListener("change", (e) => handleEntryAction(e, "expenses"));
	}

	window.addEventListener("beforeinstallprompt", (e) => {
		deferredInstallPrompt = e;
		localStorage.setItem(INSTALL_STATUS_KEY, "0");
		updateInstallButtonState();
	});
	window.addEventListener("appinstalled", () => {
		localStorage.setItem(INSTALL_STATUS_KEY, "1");
		deferredInstallPrompt = null;
		setMenuInfoMessage(t("appDownloaded"));
		updateInstallButtonState();
	});
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
	}
});

// ── Page init ─────────────────────────────────────────────────────────────────

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

	applyTheme();
	syncThemeButtons();
	setDefaultPeriodRange();
	languageSelect.value = appLanguage;
	currencySelect.value = appCurrency;
	applyTranslations();
	updateAccessUI();
	updateInstallButtonState();
	render();
}

// ── Render ────────────────────────────────────────────────────────────────────

function render() {
	if (!currentUser) return;

	const todayIso = shared.toDateInput(today);
	const anchorMonth = (periodStartInput?.value || todayIso).slice(0, 7);
	const range = getDateRange(periodStartInput?.value, periodEndInput?.value);
	const periodStart = range.start || `${anchorMonth}-01`;
	const periodEnd = range.end || shared.getMonthEndDate(anchorMonth);

	const incomes = entriesForPeriod(appState.incomes, periodStart, periodEnd, anchorMonth);
	const expenses = entriesForPeriod(appState.expenses, periodStart, periodEnd, anchorMonth);

	monthlyIncomeEl.textContent = formatCurrency(shared.sumEntries(incomes));
	monthlyExpenseEl.textContent = formatCurrency(shared.sumEntries(expenses));
	spentToDateEl.textContent = formatCurrency(shared.sumEntries(expenses.filter((e) => e.date <= todayIso)));
	currentBalanceEl.textContent = formatCurrency(shared.sumEntries(incomes) - shared.sumEntries(expenses));

	paintList(incomeListEl, incomes, "incomes");
	paintList(expenseListEl, expenses, "expenses");
	renderChart(incomes, expenses);

	const balance = formatCurrency(shared.sumEntries(incomes) - shared.sumEntries(expenses));
	if (range.end) {
		projectionTextEl.textContent = t("projectionText").replace("{date}", formatDisplayDate(range.end)).replace("{amount}", balance);
	} else {
		projectionTextEl.textContent = t("projectionTextNoDate").replace("{amount}", balance);
	}
}

function paintList(target, entries, listType) {
	target.innerHTML = "";

	if (!entries.length) {
		const li = document.createElement("li");
		li.className = "empty";
		li.textContent = t("emptyEntries");
		target.appendChild(li);
		return;
	}

	entries.forEach((entry) => {
		const li = document.createElement("li");
		li.className = "entry-row";
		const noteHtml = entry.note ? `<span class="entry-note-inline">(${escapeHtml(entry.note)})</span>` : "";
		const badge = entry.repeatMonthly ? `<span class="entry-repeat-badge">${t("repeatMonthlyBadge")}</span>` : "";
		const checked = entry.repeatMonthly ? "checked" : "";
		li.innerHTML = `
			<div class="entry-main-row entry-main-row-top">
				<div class="entry-heading">
					<strong>${translateCategory(entry.category)}</strong>
					<span class="entry-date">${formatDisplayDate(entry.date)}</span>
				</div>
				<div class="entry-repeat-controls">
					${badge}
					<label class="entry-repeat-toggle">
						<input type="checkbox" data-action="toggle-repeat" data-id="${entry.id}" data-date="${entry.date}" ${checked}>
						<span>${t("repeatMonthlyAction")}</span>
					</label>
				</div>
			</div>
			<div class="entry-main-row">
				<span class="entry-amount">${formatCurrency(entry.amount)} ${noteHtml}</span>
				<div class="row-actions row-actions-icons">
					<button type="button" class="inline-icon-button"
						title="${t("editAction")}" aria-label="${t("editAction")}"
						data-action="edit" data-id="${entry.id}" data-type="${listType}">✎</button>
					<button type="button" class="inline-icon-button danger"
						title="${t("deleteAction")}" aria-label="${t("deleteAction")}"
						data-action="delete" data-id="${entry.id}" data-date="${entry.date}" data-type="${listType}">✖</button>
				</div>
			</div>
		`;
		target.appendChild(li);
	});
}

// ── Chart ─────────────────────────────────────────────────────────────────────

const CHART_PALETTE = [
	"#3b82f6","#ef4444","#22c55e","#f59e0b","#8b5cf6",
	"#ec4899","#14b8a6","#f97316","#06b6d4","#84cc16",
	"#a78bfa","#fb923c","#34d399","#60a5fa","#f472b6"
];

function renderChart(incomes, expenses) {
	const section = document.getElementById("diagramm");
	const canvas = document.getElementById("summary-chart");
	const legendEl = document.getElementById("summary-chart-legend");
	if (!section || !canvas || typeof Chart === "undefined") return;

	const dataMap = {};
	[...incomes, ...expenses].forEach((e) => {
		const cat = translateCategory(e.category);
		dataMap[cat] = (dataMap[cat] || 0) + e.amount;
	});

	const entries = Object.entries(dataMap).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);

	if (!entries.length) {
		section.classList.add("hidden");
		if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
		return;
	}

	const labels = entries.map(([k]) => k);
	const amounts = entries.map(([, v]) => v);
	const bgColors = labels.map((_, i) => CHART_PALETTE[i % CHART_PALETTE.length]);
	const chartType = chartTypeSelect?.value || "pie";

	// Build legend
	if (legendEl) {
		legendEl.innerHTML = "";
		entries.forEach(([label, amount], i) => {
			const item = document.createElement("div");
			item.className = "chart-legend-item";
			item.innerHTML = `
				<span class="chart-legend-color" style="background:${bgColors[i]}"></span>
				<span class="chart-legend-label">${escapeHtml(label)}: <strong>${formatCurrency(amount)}</strong></span>
			`;
			legendEl.appendChild(item);
		});
	}

	// Show section
	section.classList.remove("hidden");

	// Set labels with hardcoded strings — avoids raw-key fallback completely
	const isHu = appLanguage !== "en";
	const titleEl = document.getElementById("summary-chart-title-el");
	const typeLabelEl = document.getElementById("summary-chart-type-label-el");
	const pieOpt = document.getElementById("summary-chart-opt-pie");
	const barOpt = document.getElementById("summary-chart-opt-bar");
	if (titleEl) titleEl.textContent = isHu ? "Bevételek és kiadások alakulása a kiválasztott időszakban" : "Income and expenses in the selected period";
	if (typeLabelEl) typeLabelEl.textContent = isHu ? "Típus" : "Type";
	if (pieOpt) pieOpt.textContent = isHu ? "Kördiagram" : "Pie chart";
	if (barOpt) barOpt.textContent = isHu ? "Oszlopdiagram" : "Bar chart";

	// Destroy old chart and replace canvas to avoid Chart.js residue
	if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
	const freshCanvas = document.createElement("canvas");
	freshCanvas.id = "summary-chart";
	canvas.replaceWith(freshCanvas);

	// Bar chart needs explicit container height; pie uses aspect ratio
	const wrap = freshCanvas.closest(".chart-canvas-wrap");

	// Force synchronous layout reflow so Chart.js sees correct canvas dimensions
	void section.offsetHeight;

	try {
		chartInstance = new Chart(freshCanvas, {
			type: chartType,
			data: {
				labels,
				datasets: [{
					data: amounts,
					backgroundColor: bgColors,
					borderWidth: chartType === "bar" ? 0 : 2,
					borderColor: "#fff",
					minBarLength: chartType === "bar" ? 6 : undefined
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: chartType === "bar" ? 1.6 : 1,
				plugins: {
					legend: { display: false },
					tooltip: {
						callbacks: {
							label: (ctx) => ` ${formatCurrency(ctx.raw)}`
						}
					}
				},
				...(chartType === "bar" ? {
					scales: {
						y: {
							beginAtZero: true,
							suggestedMax: Math.max(...amounts) * 1.15,
							ticks: {
								callback: (v) => new Intl.NumberFormat(appLanguage === "en" ? "en-GB" : "hu-HU", { maximumFractionDigits: 0 }).format(v)
							},
							grid: { color: "rgba(0,0,0,0.06)" }
						}
					}
				} : {})
			}
		});
	} catch (_err) {
		section.classList.add("hidden");
		chartInstance = null;
	}
}

// ── Entry actions ─────────────────────────────────────────────────────────────

async function handleEntryAction(event, listType) {
	const target = event.target.closest("[data-action]");
	if (!target) return;

	const action = target.dataset.action;
	const entryId = target.dataset.id;
	const clickedDate = target.dataset.date || "";
	const type = target.dataset.type || listType;
	const entry = appState[type].find((e) => e.id === entryId);
	if (!entry) return;

	if (action === "edit") {
		openEditModal(type, entry);
		return;
	}

	if (action === "toggle-repeat") {
		entry.repeatMonthly = target instanceof HTMLInputElement ? target.checked : !entry.repeatMonthly;
		if (entry.repeatMonthly) entry.excludedMonths = [];
		await saveState();
		showMessage(t(entry.repeatMonthly ? "repeatEnabled" : "repeatDisabled"), false);
		render();
		return;
	}

	if (action === "delete") {
		const deleted = await handleEntryDelete(type, entryId, clickedDate, target);
		if (deleted) {
			showMessage(t("entryDeleted"), false);
			render();
		}
	}
}

async function handleEntryDelete(listType, entryId, clickedDate, triggerEl) {
	const entry = appState[listType].find((e) => e.id === entryId);
	if (!entry) return false;

	if (!entry.repeatMonthly) {
		const confirmed = await openInlineDeleteConfirm(triggerEl, t("confirmDelete"));
		if (!confirmed) return false;
		appState[listType] = appState[listType].filter((e) => e.id !== entryId);
		await saveState();
		return true;
	}

	const scope = await openDeleteScopeModal();
	if (!scope) return false;

	if (scope === "all") {
		appState[listType] = appState[listType].filter((e) => e.id !== entryId);
		await saveState();
		return true;
	}

	if (scope === "month") {
		const monthToExclude = (clickedDate || entry.date || "").slice(0, 7);
		if (/^\d{4}-\d{2}$/.test(monthToExclude)) {
			const excl = Array.isArray(entry.excludedMonths) ? entry.excludedMonths : [];
			if (!excl.includes(monthToExclude)) excl.push(monthToExclude);
			entry.excludedMonths = excl;
			await saveState();
			return true;
		}
	}

	return false;
}

// ── Edit modal ────────────────────────────────────────────────────────────────

function openEditModal(listType, entry) {
	if (!editEntryModal) return;
	document.getElementById("edit-entry-id").value = entry.id;
	document.getElementById("edit-entry-type").value = listType;

	// populate category select
	const catSelect = document.getElementById("edit-entry-category");
	catSelect.innerHTML = "";
	const cats = listType === "incomes" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
	cats.forEach((val) => {
		const opt = document.createElement("option");
		opt.value = val;
		opt.textContent = translateCategory(val);
		catSelect.appendChild(opt);
	});
	catSelect.value = normalizeCategory(entry.category);

	document.getElementById("edit-entry-amount").value = entry.amount;
	document.getElementById("edit-entry-date").value = entry.date;
	document.getElementById("edit-entry-note").value = entry.note || "";
	document.getElementById("edit-entry-repeat").checked = Boolean(entry.repeatMonthly);

	editEntryModal.classList.remove("hidden");
	setTimeout(() => document.getElementById("edit-entry-amount").focus(), 50);
}

function closeEditModal() {
	if (editEntryModal) editEntryModal.classList.add("hidden");
}

async function saveEditEntry(event) {
	event.preventDefault();
	const listType = document.getElementById("edit-entry-type").value;
	const entryId = document.getElementById("edit-entry-id").value;
	const rawAmount = document.getElementById("edit-entry-amount").value;
	const amount = Math.round(Number(String(rawAmount).replace(",", ".")) * 100) / 100;
	if (!amount || amount <= 0) return;

	const idx = appState[listType].findIndex((e) => e.id === entryId);
	if (idx < 0) return;

	const existing = appState[listType][idx];
	const repeat = document.getElementById("edit-entry-repeat").checked;
	appState[listType][idx] = {
		...existing,
		category: normalizeCategory(document.getElementById("edit-entry-category").value),
		amount,
		date: document.getElementById("edit-entry-date").value,
		note: document.getElementById("edit-entry-note").value.trim(),
		repeatMonthly: repeat,
		excludedMonths: repeat ? [] : normalizeExcludedMonths(existing.excludedMonths)
	};

	await saveState();
	closeEditModal();
	showMessage(t("entryUpdated"), false);
	render();
}

// ── Delete scope modal ────────────────────────────────────────────────────────

function openDeleteScopeModal() {
	if (!deleteScopeModal) return Promise.resolve(null);
	if (inlineDeleteConfirmResolver) closeInlineDeleteConfirm(false);
	deleteScopeModal.classList.remove("hidden");
	if (deleteThisMonthButton) deleteThisMonthButton.focus();
	return new Promise((resolve) => { deleteScopeResolver = resolve; });
}

function closeDeleteScopeModal(choice) {
	if (deleteScopeModal) deleteScopeModal.classList.add("hidden");
	if (deleteScopeResolver) {
		const res = deleteScopeResolver;
		deleteScopeResolver = null;
		res(choice);
	}
}

// ── Inline delete confirm ─────────────────────────────────────────────────────

function openInlineDeleteConfirm(anchorEl, message) {
	if (!anchorEl || !document.body) return Promise.resolve(false);
	if (inlineDeleteConfirmResolver) closeInlineDeleteConfirm(false);

	const pop = document.createElement("div");
	pop.className = "inline-delete-confirm";
	pop.setAttribute("role", "alertdialog");
	pop.innerHTML = `
		<p>${escapeHtml(message)}</p>
		<div class="inline-delete-confirm-actions">
			<button type="button" class="btn btn-danger">${escapeHtml(t("deleteAction"))}</button>
			<button type="button" class="btn btn-outline-info">${escapeHtml(t("cancelModalButton"))}</button>
		</div>
	`;
	document.body.appendChild(pop);
	inlineDeleteConfirmElement = pop;

	const isSmall = window.matchMedia("(max-width: 760px)").matches;
	if (isSmall) {
		pop.classList.add("is-mobile");
	} else {
		const rect = anchorEl.getBoundingClientRect();
		const top = Math.max(window.scrollY + 10, window.scrollY + rect.top - pop.offsetHeight - 8);
		const left = Math.min(
			Math.max(window.scrollX + 10, window.scrollX + rect.right + 10),
			window.scrollX + window.innerWidth - pop.offsetWidth - 10
		);
		pop.style.top = `${top}px`;
		pop.style.left = `${left}px`;
	}

	const [confirmBtn, cancelBtn] = pop.querySelectorAll("button");
	confirmBtn.addEventListener("click", () => closeInlineDeleteConfirm(true));
	cancelBtn.addEventListener("click", () => closeInlineDeleteConfirm(false));

	inlineDeleteConfirmOutsideHandler = (e) => {
		if (!inlineDeleteConfirmElement) return;
		if (!inlineDeleteConfirmElement.contains(e.target) && !anchorEl.contains(e.target)) {
			closeInlineDeleteConfirm(false);
		}
	};
	document.addEventListener("pointerdown", inlineDeleteConfirmOutsideHandler, true);
	confirmBtn.focus();

	return new Promise((resolve) => { inlineDeleteConfirmResolver = resolve; });
}

function closeInlineDeleteConfirm(confirmed) {
	if (inlineDeleteConfirmOutsideHandler) {
		document.removeEventListener("pointerdown", inlineDeleteConfirmOutsideHandler, true);
		inlineDeleteConfirmOutsideHandler = null;
	}
	if (inlineDeleteConfirmElement) {
		inlineDeleteConfirmElement.remove();
		inlineDeleteConfirmElement = null;
	}
	if (inlineDeleteConfirmResolver) {
		const res = inlineDeleteConfirmResolver;
		inlineDeleteConfirmResolver = null;
		res(Boolean(confirmed));
	}
}

// ── Data helpers ──────────────────────────────────────────────────────────────

async function saveState() {
	if (currentUser === GUEST_SESSION_VALUE) {
		shared.saveGuestData(appState);
	} else if (currentUser) {
		await saveCurrentUserData(appState).catch(() => {});
	}
}

function getDateRange(start, end) {
	if (!start || !end || start <= end) return { start, end };
	return { start: end, end: start };
}

function entriesForPeriod(entries, startDate, endDate, anchorMonth) {
	const expanded = entries.flatMap((entry) => {
		const norm = {
			...entry,
			note: entry.note || "",
			repeatMonthly: Boolean(entry.repeatMonthly),
			excludedMonths: normalizeExcludedMonths(entry.excludedMonths)
		};
		return norm.repeatMonthly ? expandRecurring(norm, startDate, endDate) : [norm];
	});
	return expanded.filter((e) => e.date >= startDate && e.date <= endDate)
		.sort((a, b) => a.date.localeCompare(b.date));
}

function expandRecurring(entry, startDate, endDate) {
	const sourceMonth = (entry.date || "").slice(0, 7);
	if (!/^\d{4}-\d{2}$/.test(sourceMonth)) return [entry];
	const rangeStart = startDate.slice(0, 7);
	const rangeEnd = endDate.slice(0, 7);
	let cursor = rangeStart < sourceMonth ? sourceMonth : rangeStart;
	const result = [];

	while (cursor <= rangeEnd) {
		const dateInMonth = alignDateToMonth(entry.date, cursor);
		if (
			dateInMonth >= startDate &&
			dateInMonth <= endDate &&
			dateInMonth >= entry.date &&
			!entry.excludedMonths.includes(cursor)
		) {
			result.push({ ...entry, date: dateInMonth });
		}
		cursor = nextMonth(cursor);
	}
	return result;
}

function alignDateToMonth(sourceDate, targetMonth) {
	const day = Number((sourceDate || "").split("-")[2]);
	const safeDay = Number.isFinite(day) && day > 0 ? day : 1;
	const endDay = Number(shared.getMonthEndDate(targetMonth).split("-")[2]);
	return `${targetMonth}-${String(Math.min(safeDay, endDay)).padStart(2, "0")}`;
}

function nextMonth(month) {
	let [y, m] = month.split("-").map(Number);
	m += 1;
	if (m > 12) { y += 1; m = 1; }
	return `${y}-${String(m).padStart(2, "0")}`;
}

function normalizeExcludedMonths(value) {
	if (!Array.isArray(value)) return [];
	return value.filter((v) => typeof v === "string" && /^\d{4}-\d{2}$/.test(v));
}

function normalizeCategory(value) {
	if (value === "hitelkartya 3") return "hitelkartya";
	if (value === "suli") return "iskola";
	return value;
}

function translateCategory(value) {
	return t(`categories.${normalizeCategory(value)}`) || value;
}

function escapeHtml(text) {
	return String(text || "")
		.replaceAll("&", "&amp;").replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

// ── UI helpers ────────────────────────────────────────────────────────────────

function showMessage(message, isError) {
	if (!entryStatusMsg) return;
	entryStatusMsg.textContent = message;
	entryStatusMsg.classList.toggle("hidden", !message);
	entryStatusMsg.classList.toggle("error", Boolean(isError));
	entryStatusMsg.classList.toggle("ok", !isError);
	if (message) window.setTimeout(() => { if (entryStatusMsg) entryStatusMsg.classList.add("hidden"); }, 3500);
}

function setDefaultPeriodRange() {
	const month = shared.toMonthInput(today);
	if (periodStartInput) periodStartInput.value = `${month}-01`;
	if (periodEndInput) periodEndInput.value = shared.getMonthEndDate(month);
}

function applyTranslations() {
	document.documentElement.lang = appLanguage;
	document.title = t("pageTitle");
	document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
	menuToggle.setAttribute("aria-label", t("menuButton"));
	document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
		el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
	});
	if (!currentUser) projectionTextEl.textContent = t("noData");
	updateMenuSessionLabel();
}

function updateAccessUI() {
	const diagramSection = document.getElementById("diagramm");
	if (!currentUser) {
		lockedMessage.classList.remove("hidden");
		summaryContent.classList.add("hidden");
		if (diagramSection) diagramSection.classList.add("hidden");
		if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
	} else {
		lockedMessage.classList.add("hidden");
		summaryContent.classList.remove("hidden");
		// Chart section visibility is managed by renderChart()
	}
	updateMenuSessionLabel();
}

function updateMenuSessionLabel() {
	if (!menuSessionInfo) return;
	if (!currentUser) { menuSessionInfo.textContent = t("loggedOut"); return; }
	menuSessionInfo.textContent = `${t("loggedIn")} ${getSignedInDisplayName()}`;
}

function getSignedInDisplayName() {
	if (!currentUser || currentUser === GUEST_SESSION_VALUE) return t("guestUser");
	return localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.nickname || currentProfile?.username || currentUser;
}

function setMenuInfoMessage(message) {
	if (menuSessionInfo) menuSessionInfo.textContent = message;
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

function updateInstallButtonState() {
	const installed = shared.isAppInstalled();
	installAppButton.textContent = installed && !deferredInstallPrompt ? t("appDownloaded") : t("downloadAppButton");
	installAppButton.disabled = Boolean(installed && !deferredInstallPrompt);
}

function t(key) {
	const parts = key.split(".");
	let cur = dictionary[appLanguage] || dictionary.hu;
	for (const part of parts) cur = cur ? cur[part] : undefined;
	return cur || key;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

async function handleLogout() {
	menuPanel.classList.remove("is-open");
	menuToggle.classList.remove("is-open");
	menuToggle.setAttribute("aria-expanded", "false");
	if (currentUser && currentUser !== GUEST_SESSION_VALUE) await logoutCurrentUser().catch(() => null);
	localStorage.removeItem(SESSION_KEY);
	window.location.href = "index.html";
}

async function handleAccountDelete() {
	if (!currentUser || currentUser === GUEST_SESSION_VALUE) {
		resetDeleteAccountConfirmState();
		setMenuInfoMessage(shared.getDeleteAccountNoSessionMessage(appLanguage, currentUser === GUEST_SESSION_VALUE));
		return;
	}
	if (!deleteAccountConfirmArmed) {
		deleteAccountConfirmArmed = true;
		if (deleteAccountConfirmTimer) window.clearTimeout(deleteAccountConfirmTimer);
		deleteAccountConfirmTimer = window.setTimeout(resetDeleteAccountConfirmState, 7000);
		setMenuInfoMessage(t("deleteAccountNeedsSecondClick"));
		return;
	}
	resetDeleteAccountConfirmState();
	const email = currentProfile?.email || "";
	try {
		setMenuInfoMessage(appLanguage === "en" ? "Deleting account..." : "Fiók törlése folyamatban...");
		await deleteCurrentAccount();
		await shared.sendAccountDeletionEmail(appLanguage, email, currentUser);
		await logoutCurrentUser().catch(() => null);
		shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
		currentUser = "";
		currentProfile = null;
		localStorage.removeItem(SESSION_KEY);
		localStorage.removeItem(DISPLAY_NAME_KEY);
		window.setTimeout(() => { window.location.href = "index.html"; }, 500);
	} catch (error) {
		setMenuInfoMessage(getFirebaseErrorMessage(error, appLanguage, "delete"));
	}
}

function resetDeleteAccountConfirmState() {
	deleteAccountConfirmArmed = false;
	if (deleteAccountConfirmTimer) { window.clearTimeout(deleteAccountConfirmTimer); deleteAccountConfirmTimer = null; }
}
