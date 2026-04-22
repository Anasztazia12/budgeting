const USERS_KEY = "budgetAppUsers";
		const SESSION_KEY = "budgetAppSession";
		const LANGUAGE_KEY = "budgetAppLanguage";
		const CURRENCY_KEY = "budgetAppCurrency";
		const INSTALL_STATUS_KEY = "budgetAppInstalled";
		const GUEST_SESSION_VALUE = "__guest__";
		const GUEST_DATA_KEY = "budgetAppGuestData";

		const dictionary = {
			hu: {
				pageTitle: "Havi összegzés",
				heroTitle: "Havi összegzés",
				heroText: "Havi összegzés, mai költések és jövőbeli tételek dátum szerint.",
				menuButton: "Menü",
				homeLink: "Kezdőlap",
				budgetLink: "Költségvetés",
				monthlyLink: "Havi összegzés",
				backAction: "Vissza",
				downloadAppButton: "App letöltése",
				logoutAction: "Kijelentkezés",
				languageLabel: "Nyelv",
				appName: "Költségvetési app",
				currencyLabel: "Pénznem",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (font)",
				currencyUsd: "USD (dollár)",
				currencyEur: "EUR (euró)",
				monthLabel: "Választott hónap",
				loggedOut: "Nincs bejelentkezett felhasználó.",
				loggedIn: "Bejelentkezve:",
				guestUser: "Vendég",
				loginRequired: "A havi összegzéshez jelentkezz be a Költségvetés oldalon.",
				monthlyIncomeTitle: "Havi bevétel",
				monthlyExpenseTitle: "Havi kiadás",
				spentToDateTitle: "Kiadás mai napig",
				currentBalanceTitle: "Aktuális egyenleg",
				upcomingExpensesTitle: "Várható kiadások dátum szerint",
				upcomingIncomesTitle: "Várható bevételek dátum szerint",
				projectionTitle: "Hónap végi becslés",
				noData: "Nincs adat.",
				appDownloaded: "Az app letöltve.",
				appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
				emptyEntries: "Nincs várható tétel a hónap további részére.",
				projectionText: "Várható egyenleg {date} dátumra: {amount}.",
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
					rent: "Rent",
					biztositas: "Biztosítás",
					"hitelkartya 3": "Hitelkártya 3",
					zilch: "Zilch",
					tv: "TV",
					telefon: "Telefon",
					internet: "Internet",
					suli: "Suli",
					"egyeb kiadas": "Egyéb kiadás"
				}
			},
			en: {
				pageTitle: "Monthly Budget",
				heroTitle: "Monthly Budget",
				heroText: "Monthly summary, current spending, and upcoming dated entries.",
				menuButton: "Menu",
				homeLink: "Home",
				budgetLink: "Budget",
				monthlyLink: "Monthly Budget",
				backAction: "Back",
				downloadAppButton: "Download App",
				logoutAction: "Sign out",
				languageLabel: "Language",
				appName: "Budgeting App",
				currencyLabel: "Currency",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (pound)",
				currencyUsd: "USD (dollar)",
				currencyEur: "EUR (euro)",
				monthLabel: "Selected month",
				loggedOut: "No user is signed in.",
				loggedIn: "Signed in as:",
				guestUser: "Guest",
				loginRequired: "Please sign in on the Budget page first.",
				monthlyIncomeTitle: "Monthly income",
				monthlyExpenseTitle: "Monthly expense",
				spentToDateTitle: "Spent to date",
				currentBalanceTitle: "Current balance",
				upcomingExpensesTitle: "Upcoming expenses by date",
				upcomingIncomesTitle: "Upcoming income by date",
				projectionTitle: "Month-end projection",
				noData: "No data.",
				appDownloaded: "App downloaded.",
				appInstallUnavailable: "App install is not available on this device right now.",
				emptyEntries: "No upcoming entries for the rest of this month.",
				projectionText: "Projected balance for {date}: {amount}.",
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
					rent: "Rent",
					biztositas: "Insurance",
					"hitelkartya 3": "Credit card 3",
					zilch: "Zilch",
					tv: "TV",
					telefon: "Phone",
					internet: "Internet",
					suli: "School",
					"egyeb kiadas": "Other expense"
				}
			}
		};

		const today = new Date();
		const users = loadUsers();
		const currentUser = loadSession(users);
		let appLanguage = loadLanguage();
		let appCurrency = loadCurrency();
		const state = getCurrentUserState();

		const menuToggle = document.getElementById("menu-toggle");
		const menuPanel = document.getElementById("menu-panel");
		const menuBackButton = document.getElementById("menu-back-button");
		const installAppButton = document.getElementById("install-app-button");
		const menuLogoutButton = document.getElementById("menu-logout-button");
		const languageSelect = document.getElementById("app-language");
		const currencySelect = document.getElementById("app-currency");
		const activeMonthInput = document.getElementById("active-month");
		const sessionInfo = document.getElementById("session-info");
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

		initializePage();

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

		menuToggle.addEventListener("click", () => {
			const isOpen = menuPanel.classList.toggle("is-open");
			menuToggle.classList.toggle("is-open", isOpen);
			menuToggle.setAttribute("aria-expanded", String(isOpen));
		});

		menuLogoutButton.addEventListener("click", handleLogout);
		menuBackButton.addEventListener("click", () => {
			window.history.back();
		});
		installAppButton.addEventListener("click", async () => {
			if (isAppInstalled() && !deferredInstallPrompt) {
				sessionInfo.textContent = t("appDownloaded");
				return;
			}

			if (!deferredInstallPrompt) {
				sessionInfo.textContent = t("appInstallUnavailable");
				return;
			}

			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			deferredInstallPrompt.prompt();
			const choice = await deferredInstallPrompt.userChoice;
			if (choice.outcome === "accepted") {
				localStorage.setItem(INSTALL_STATUS_KEY, "1");
				sessionInfo.textContent = t("appDownloaded");
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

		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
			deferredInstallPrompt = event;
			localStorage.setItem(INSTALL_STATUS_KEY, "0");
			updateInstallButtonState();
		});

		window.addEventListener("appinstalled", () => {
			localStorage.setItem(INSTALL_STATUS_KEY, "1");
			deferredInstallPrompt = null;
			sessionInfo.textContent = t("appDownloaded");
			updateInstallButtonState();
		});

		if ("serviceWorker" in navigator) {
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("sw.js").catch(() => {
					// Service worker errors should not block usage.
				});
			});
		}

		activeMonthInput.addEventListener("change", render);

		function initializePage() {
			if (!currentUser) {
				window.location.href = "index.html";
				return;
			}

			languageSelect.value = appLanguage;
			currencySelect.value = appCurrency;
			activeMonthInput.value = toMonthInput(today);
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
			if (!currentUser) {
				projectionTextEl.textContent = t("noData");
			}
			updateSessionLabel();
		}

		function updateAccessUI() {
			if (!currentUser) {
				lockedMessage.classList.remove("hidden");
				summaryContent.classList.add("hidden");
				updateSessionLabel();
				return;
			}

			lockedMessage.classList.add("hidden");
			summaryContent.classList.remove("hidden");
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

		function render() {
			if (!currentUser) {
				return;
			}

			const selectedMonth = activeMonthInput.value;
			const todayIso = toDateInput(today);
			const monthIncomes = monthEntries(state.incomes, selectedMonth);
			const monthExpenses = monthEntries(state.expenses, selectedMonth);

			monthlyIncomeEl.textContent = formatCurrency(sumEntries(monthIncomes));
			monthlyExpenseEl.textContent = formatCurrency(sumEntries(monthExpenses));
			spentToDateEl.textContent = formatCurrency(sumEntries(monthExpenses.filter((item) => item.date <= todayIso)));
			currentBalanceEl.textContent = formatCurrency(sumEntries(monthIncomes) - sumEntries(monthExpenses));

			const upcomingExpenses = monthExpenses.filter((item) => item.date > todayIso).sort((left, right) => left.date.localeCompare(right.date));
			const upcomingIncomes = monthIncomes.filter((item) => item.date > todayIso).sort((left, right) => left.date.localeCompare(right.date));

			paintList(upcomingExpensesEl, upcomingExpenses);
			paintList(upcomingIncomesEl, upcomingIncomes);

			const monthEndDate = getMonthEndDate(selectedMonth);
			projectionTextEl.textContent = t("projectionText").replace("{date}", formatDisplayDate(monthEndDate)).replace("{amount}", formatCurrency(sumEntries(monthIncomes) - sumEntries(monthExpenses)));
		}

		function handleLogout() {
			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			localStorage.removeItem(SESSION_KEY);
			window.location.href = "index.html";
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
			return entries.filter((item) => item.date.startsWith(activeMonth));
		}

		function sumEntries(entries) {
			return entries.reduce((sum, item) => sum + Number(item.amount || 0), 0);
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

		function formatCurrency(amount) {
			const locale = appLanguage === "en" ? "en-US" : "hu-HU";
			return new Intl.NumberFormat(locale, {
				style: "currency",
				currency: appCurrency,
				maximumFractionDigits: 0
			}).format(amount);
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
			const saved = localStorage.getItem(CURRENCY_KEY);
			return ["HUF", "GBP", "USD", "EUR"].includes(saved) ? saved : "HUF";
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

		function getCurrentUserState() {
			if (currentUser === GUEST_SESSION_VALUE) {
				return loadGuestData();
			}

			if (!currentUser || !users[currentUser]) {
				return { incomes: [], expenses: [] };
			}

			const data = users[currentUser].data || {};
			return {
				incomes: Array.isArray(data.incomes) ? data.incomes : [],
				expenses: Array.isArray(data.expenses) ? data.expenses : []
			};
		}

		function loadLanguage() {
			return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "hu";
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

		function getMonthEndDate(monthValue) {
			const [year, month] = monthValue.split("-").map(Number);
			if (!year || !month) {
				return toDateInput(today);
			}
			const day = new Date(year, month, 0).getDate();
			return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
		}

		function loadGuestData() {
			try {
				const raw = localStorage.getItem(GUEST_DATA_KEY);
				if (!raw) {
					return { incomes: [], expenses: [] };
				}

				const parsed = JSON.parse(raw);
				if (!parsed || typeof parsed !== "object") {
					return { incomes: [], expenses: [] };
				}

				return {
					incomes: Array.isArray(parsed.incomes) ? parsed.incomes : [],
					expenses: Array.isArray(parsed.expenses) ? parsed.expenses : []
				};
			} catch (_error) {
				return { incomes: [], expenses: [] };
			}
		}