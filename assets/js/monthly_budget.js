		import {
			deleteCurrentAccount,
			getFirebaseErrorMessage,
			logoutCurrentUser,
			restoreSession
		} from "./firebase-service.js";

		const shared = window.BudgetAppShared;
		const {
			USERS_KEY,
			SESSION_KEY,
			DISPLAY_NAME_KEY,
			LANGUAGE_KEY,
			THEME_KEY,
			CURRENCY_KEY,
			INSTALL_STATUS_KEY,
			GUEST_DATA_KEY
		} = shared.KEYS;
		const { GUEST_SESSION_VALUE } = shared;

		const dictionary = {
			hu: {
				pageTitle: "Összesítés",
				heroTitle: "Összesítés",
				heroText: "Bevételek és kiadások összesítése választott időszakra.",
				menuButton: "Menü",
				homeLink: "Kezdőlap",
				budgetLink: "Költségvetés",
				forecastButton: "Költségvetési előrejelző",
				monthlyLink: "Összesítés",
				versionLabel: "Verzió",
				themeModeLabel: "Téma",
				themeModeLight: "Világos",
				themeModeDark: "Sötét",
				backAction: "Vissza",
				downloadAppButton: "App letöltése",
				deleteAccountButton: "Regisztráció törlése",
				logoutAction: "Kijelentkezés",
				languageLabel: "Nyelv",
				languageSelectorAria: "Nyelv választó",
				themeSwitchAria: "Téma váltó",
				currencySelectorAria: "Pénznem választó",
				appName: "Költségvetési app",
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
				upcomingExpensesTitle: "Kiadások dátum szerint",
				upcomingIncomesTitle: "Bevételek dátum szerint",
				projectionTitle: "Időszak végi becslés",
				noData: "Nincs adat.",
				appDownloaded: "Az app letöltve.",
				appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
				emptyEntries: "Nincs tétel a kiválasztott időszakban.",
				projectionText: "Várható egyenleg {date} dátumra: {amount}.",
				projectionTextNoDate: "Várható egyenleg: {amount}.",
				categories: {
					fizetes: "Fizetés",
					egyeb: "Egyéb",
					szamlak: "Számlák",
					viz: "Víz",
					gaz: "Gáz",
					aram: "Áram",
					auto: "Autó",
					benzin: "Benzin",
					elemiszer: "Élelmiszer",
					ruhak: "Ruhák",
					alberlet: "Albérlet",
					biztositas: "Biztosítás",
					hitelkartya: "Hitelkártya",
					onkormanyzati_ado: "Önkormányzati adó",
					tv: "TV",
					telefon: "Telefon",
					internet: "Internet",
					iskola: "Iskola",
					egyeb_kiadas: "Egyéb kiadás"
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
				monthlyLink: "Summary",
				versionLabel: "Version",
				themeModeLabel: "Theme",
				themeModeLight: "Light",
				themeModeDark: "Dark",
				backAction: "Back",
				downloadAppButton: "Download App",
				deleteAccountButton: "Delete account",
				logoutAction: "Sign out",
				languageLabel: "Language",
				languageSelectorAria: "Language selector",
				themeSwitchAria: "Theme switch",
				currencySelectorAria: "Currency selector",
				appName: "Budgeting App",
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
				upcomingExpensesTitle: "Expenses by date",
				upcomingIncomesTitle: "Income by date",
				projectionTitle: "End-of-period projection",
				noData: "No data.",
				appDownloaded: "App downloaded.",
				appInstallUnavailable: "App install is not available on this device right now.",
				emptyEntries: "No entries in the selected period.",
				projectionText: "Projected balance for {date}: {amount}.",
				projectionTextNoDate: "Projected balance: {amount}.",
				categories: {
					fizetes: "Salary",
					egyeb: "Other",
					szamlak: "Bills",
					viz: "Water",
					gaz: "Gas",
					aram: "Electricity",
					auto: "Car",
					benzin: "Fuel",
					elemiszer: "Groceries",
					ruhak: "Clothes",
					alberlet: "Rent",
					biztositas: "Insurance",
					hitelkartya: "Credit card",
					onkormanyzati_ado: "Council tax",
					tv: "TV",
					telefon: "Phone",
					internet: "Internet",
					iskola: "School",
					egyeb_kiadas: "Other expense"
				}
			}
		};

		const today = new Date();
		const users = {};
		let currentUser = localStorage.getItem(SESSION_KEY) || "";
		let currentProfile = null;
		let appLanguage = loadLanguage();
		let appTheme = loadTheme();
		let appCurrency = loadCurrency();
		let appState = { incomes: [], expenses: [] };

		const menuToggle = document.getElementById("menu-toggle");
		const menuPanel = document.getElementById("menu-panel");
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
		const upcomingExpensesEl = document.getElementById("upcoming-expenses");
		const upcomingIncomesEl = document.getElementById("upcoming-incomes");
		const projectionTextEl = document.getElementById("projection-text");
		let deferredInstallPrompt = null;

		void initializePage();

		languageSelect.addEventListener("change", () => {
			appLanguage = languageSelect.value;
			localStorage.setItem(LANGUAGE_KEY, appLanguage);
			applyTranslations();
			render();
		});

		currencySelect.addEventListener("change", () => {
			appCurrency = currencySelect.value;
			localStorage.setItem(CURRENCY_KEY, appCurrency);
			render();
		});

		if (periodStartInput) {
			periodStartInput.addEventListener("change", render);
		}

		if (periodEndInput) {
			periodEndInput.addEventListener("change", render);
		}

		if (forecastToggleButton) {
			forecastToggleButton.addEventListener("click", () => {
				const periodStart = periodStartInput?.value || toDateInput(today);
				const monthParam = encodeURIComponent(periodStart.slice(0, 7));
				window.location.href = `budget-forecast.html?month=${monthParam}`;
			});
		}

		if (summaryToggleButton) {
			summaryToggleButton.addEventListener("click", () => {
				const periodStart = periodStartInput?.value || toDateInput(today);
				const monthParam = encodeURIComponent(periodStart.slice(0, 7));
				window.location.href = `monthly_budget.html?month=${monthParam}`;
			});
		}

		menuToggle.addEventListener("click", () => {
			const isOpen = menuPanel.classList.toggle("is-open");
			menuToggle.classList.toggle("is-open", isOpen);
			menuToggle.setAttribute("aria-expanded", String(isOpen));
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

		menuLogoutButton.addEventListener("click", handleLogout);
		if (deleteAccountButton) {
			deleteAccountButton.addEventListener("click", handleAccountDelete);
		}
		menuBackButton.addEventListener("click", () => {
			window.history.back();
		});
		installAppButton.addEventListener("click", async () => {
			if (isAppInstalled() && !deferredInstallPrompt) {
				setMenuInfoMessage(t("appDownloaded"));
				return;
			}

			if (!deferredInstallPrompt) {
				setMenuInfoMessage(shared.getInstallUnavailableMessage(appLanguage));
				return;
			}

			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			deferredInstallPrompt.prompt();
			const choice = await deferredInstallPrompt.userChoice;
			if (choice.outcome === "accepted") {
				localStorage.setItem(INSTALL_STATUS_KEY, "1");
				setMenuInfoMessage(t("appDownloaded"));
			}
			deferredInstallPrompt = null;
			updateInstallButtonState();
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
			event.preventDefault();
			deferredInstallPrompt = event;
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
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("sw.js").catch(() => {
					// Service worker errors should not block usage.
				});
			});
		}

		async function initializePage() {
			if (currentUser === GUEST_SESSION_VALUE) {
				appState = loadGuestData();
			} else {
				const session = await restoreSession(currentUser);
				if (!session) {
					window.location.href = "index.html";
					return;
				}

				applyAuthenticatedState(session);
				appState = session.data || { incomes: [], expenses: [] };
			}

			applyTheme();
			syncThemeButtons();
			languageSelect.value = appLanguage;
			currencySelect.value = appCurrency;
			applyTranslations();
			updateAccessUI();
			updateInstallButtonState();
			render();
		}

		function applyTranslations() {
			document.documentElement.lang = appLanguage;
			document.title = t("pageTitle");
			document.querySelectorAll("[data-i18n]").forEach((element) => {
				element.textContent = t(element.dataset.i18n);
			});
			menuToggle.setAttribute("aria-label", t("menuButton"));
			document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
				element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
			});
			if (!currentUser) {
				projectionTextEl.textContent = t("noData");
			}
			updateMenuSessionLabel();
		}

		function updateAccessUI() {
			if (!currentUser) {
				lockedMessage.classList.remove("hidden");
				summaryContent.classList.add("hidden");
				updateMenuSessionLabel();
				return;
			}

			lockedMessage.classList.add("hidden");
			summaryContent.classList.remove("hidden");
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

			return localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.nickname || currentProfile?.username || currentUser;
		}

		function setMenuInfoMessage(message) {
			if (!menuSessionInfo) {
				return;
			}
			menuSessionInfo.textContent = message;
		}

		function render() {
			if (!currentUser) {
				return;
			}

			const selectedMonth = (periodStartInput?.value || toDateInput(today)).slice(0, 7);
			const todayIso = toDateInput(today);
			const monthIncomes = monthEntries(appState.incomes, selectedMonth);
			const monthExpenses = monthEntries(appState.expenses, selectedMonth);

			monthlyIncomeEl.textContent = formatCurrency(sumEntries(monthIncomes));
			monthlyExpenseEl.textContent = formatCurrency(sumEntries(monthExpenses));
			spentToDateEl.textContent = formatCurrency(sumEntries(monthExpenses.filter((item) => item.date <= todayIso)));
			currentBalanceEl.textContent = formatCurrency(sumEntries(monthIncomes) - sumEntries(monthExpenses));

			const upcomingExpenses = monthExpenses.filter((item) => item.date > todayIso).sort((left, right) => left.date.localeCompare(right.date));
			const upcomingIncomes = monthIncomes.filter((item) => item.date > todayIso).sort((left, right) => left.date.localeCompare(right.date));

			paintList(upcomingExpensesEl, upcomingExpenses);
			paintList(upcomingIncomesEl, upcomingIncomes);

			const projectionAmount = formatCurrency(sumEntries(monthIncomes) - sumEntries(monthExpenses));
			const selectedEndDate = periodEndInput?.value;
			if (selectedEndDate) {
				projectionTextEl.textContent = t("projectionText").replace("{date}", formatDisplayDate(selectedEndDate)).replace("{amount}", projectionAmount);
			} else {
				projectionTextEl.textContent = t("projectionTextNoDate").replace("{amount}", projectionAmount);
			}
		}

		async function handleLogout() {
			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			if (currentUser && currentUser !== GUEST_SESSION_VALUE) {
				await logoutCurrentUser().catch(() => null);
			}
			localStorage.removeItem(SESSION_KEY);
			window.location.href = "index.html";
		}

		async function handleAccountDelete() {
			if (!currentUser || currentUser === GUEST_SESSION_VALUE || !users[currentUser]) {
				setMenuInfoMessage(shared.getDeleteAccountNoSessionMessage(appLanguage));
				return;
			}

			if (!window.confirm(shared.getDeleteAccountConfirmMessage(appLanguage, currentUser))) {
				return;
			}

			const userRecord = users[currentUser] || {};
			const email = userRecord.email || (userRecord.profile && userRecord.profile.email) || "";
			try {
				await deleteCurrentAccount();
				await shared.sendAccountDeletionEmail(appLanguage, email, currentUser);
				delete users[currentUser];
				shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
				localStorage.removeItem(SESSION_KEY);
				window.location.href = "index.html";
			} catch (error) {
				setMenuInfoMessage(getFirebaseErrorMessage(error, appLanguage, "delete"));
			}
		}

		function paintList(target, entries) {
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
				li.innerHTML = `<div><span>${formatDisplayDate(entry.date)}</span><strong>${translateCategory(entry.category)}</strong></div><span>${formatCurrency(entry.amount)}</span>`;
				target.appendChild(li);
			});
		}

		function monthEntries(entries, activeMonth) {
			return shared.monthEntries(entries, activeMonth);
		}

		function sumEntries(entries) {
			return shared.sumEntries(entries);
		}

		function translateCategory(value) {
			return t(`categories.${value}`) || value;
		}

		function t(key) {
			const parts = key.split(".");
			let current = dictionary[appLanguage] || dictionary.hu;
			for (const part of parts) {
				current = current ? current[part] : undefined;
			}
			return current || key;
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

		function formatCurrency(amount) {
			const locale = appLanguage === "en" ? "en-GB" : "hu-HU";
			const symbols = {
				HUF: "Ft",
				GBP: "£",
				USD: "$",
				EUR: "€"
			};
			const numericAmount = Number(amount) || 0;
			const valueText = new Intl.NumberFormat(locale, {
				minimumFractionDigits: 0,
				maximumFractionDigits: 0
			}).format(numericAmount);
			return `${valueText} ${symbols[appCurrency] || appCurrency}`;
		}

		function formatDisplayDate(isoDate) {
			if (!isoDate) {
				return "";
			}

			const dateObj = new Date(`${isoDate}T00:00:00`);
			if (Number.isNaN(dateObj.getTime())) {
				return isoDate;
			}

			if (appLanguage === "en") {
				return dateObj.toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric"
				});
			}

			return dateObj.toLocaleDateString("hu-HU");
		}

		function loadCurrency() {
			return shared.loadCurrency();
		}

		function isAppInstalled() {
			return shared.isAppInstalled();
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

		function applyAuthenticatedState(session) {
			Object.keys(users).forEach((key) => {
				delete users[key];
			});

			currentUser = String(session?.profile?.username || currentUser || "").trim();
			currentProfile = session?.profile || null;
			if (!currentUser) {
				return;
			}

			users[currentUser] = {
				email: session.email || session.profile?.email || "",
				profile: session.profile || null,
				data: session.data || { incomes: [], expenses: [] }
			};
			localStorage.setItem(SESSION_KEY, currentUser);
		}

		function loadLanguage() {
			return shared.loadLanguage();
		}

		function toMonthInput(dateObj) {
			return shared.toMonthInput(dateObj);
		}

		function toDateInput(dateObj) {
			return shared.toDateInput(dateObj);
		}

		function getMonthEndDate(monthValue) {
			return shared.getMonthEndDate(monthValue, today);
		}

		function loadGuestData() {
			return shared.loadGuestData();
		}