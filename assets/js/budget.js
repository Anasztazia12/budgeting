const USERS_KEY = "budgetAppUsers";
		const SESSION_KEY = "budgetAppSession";
		const LANGUAGE_KEY = "budgetAppLanguage";
		const CURRENCY_KEY = "budgetAppCurrency";
		const INSTALL_STATUS_KEY = "budgetAppInstalled";
		const GUEST_SESSION_VALUE = "__guest__";
		const GUEST_DATA_KEY = "budgetAppGuestData";

		const dictionary = {
			hu: {
				pageTitle: "Költségvetés",
				heroTitle: "Költségvetés",
				heroText: "Rögzítsd a várható bevételeket és kiadásokat dátum szerint.",
				menuButton: "Menü",
				homeLink: "Kezdőlap",
				budgetLink: "Költségvetés",
				summaryLink: "Havi összegzés",
				backAction: "Vissza",
				downloadAppButton: "App letöltése",
				languageLabel: "Nyelv",
				appName: "Költségvetési app",
				currencyLabel: "Pénznem",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (font)",
				currencyUsd: "USD (dollár)",
				currencyEur: "EUR (euró)",
				monthLabel: "Választott hónap",
				forecastButton: "Budget Forecast Planner",
				forecastTitle: "Budget Forecast Planner",
				forecastTargetDateLabel: "Elemzés dátuma",
				forecastWhatIfDateLabel: "Mi lenne ha vásárlás dátuma",
				forecastWhatIfAmountLabel: "Mi lenne ha összeg",
				forecastDateQuickPickLabel: "Kattints egy dátumra gyors elemzéshez:",
				forecastBaseUntilLabel: "Kiadás eddig a dátumig:",
				forecastWithPurchaseLabel: "Kiadás ezzel a vásárlással:",
				forecastDifferenceLabel: "Különbség:",
				forecastMonthEndImpactLabel: "Hóvégi egyenleg új állapotban:",
				saveAllButton: "Mentés",
				saveAllDone: "A módosítások mentve.",
				registerTitle: "Regisztráció",
				loginTitle: "Bejelentkezés",
				usernameLabel: "Felhasználónév",
				emailLabel: "Email cím",
				emailConfirmLabel: "Email cím megerősítése",
				passwordLabel: "Jelszó",
				passwordConfirmLabel: "Jelszó megerősítése",
				registerButton: "Regisztrálok",
				loginButton: "Belépés",
				logoutButton: "Kijelentkezés",
				loginRequired: "A rögzítéshez jelentkezz be vagy regisztrálj.",
				incomeFormTitle: "Bevétel hozzáadása",
				expenseFormTitle: "Kiadás hozzáadása",
				categoryLabel: "Kategória",
				amountLabel: "Összeg",
				incomeDateLabel: "Mikor várható? (dátum)",
				expenseDateLabel: "Mikor lesz levonás? (dátum)",
				saveIncomeButton: "Bevétel mentése",
				saveExpenseButton: "Kiadás mentése",
				updateIncomeButton: "Bevétel frissítése",
				updateExpenseButton: "Kiadás frissítése",
				cancelEditButton: "Szerkesztés mégse",
				monthlyIncomeTitle: "Összes havi bevétel",
				monthlyExpenseTitle: "Összes havi kiadás",
				spentToDateTitle: "Költség mai napig",
				monthEndTitle: "Hóvégi várható egyenleg",
				incomeEntriesTitle: "Bevételek ebben a hónapban",
				expenseEntriesTitle: "Kiadások ebben a hónapban",
				loggedOut: "Nincs bejelentkezett felhasználó.",
				loggedIn: "Bejelentkezve:",
				guestUser: "Vendég",
				emailMismatch: "Az email címek nem egyeznek.",
				passwordMismatch: "A jelszavak nem egyeznek.",
				usernameTaken: "Ez a felhasználónév már foglalt.",
				registerSuccess: "Sikeres regisztráció.",
				loginSuccess: "Sikeres bejelentkezés.",
				logoutSuccess: "Sikeres kijelentkezés.",
				invalidLogin: "Hibás felhasználónév vagy jelszó.",
				appDownloaded: "Az app letöltve.",
				appInstallUnavailable: "Az app letöltés most ezen az eszközön nem érhető el.",
				loginFirst: "Először jelentkezz be.",
				entrySaved: "A tétel elmentve.",
				entryUpdated: "A tétel frissítve.",
				entryDeleted: "A tétel törölve.",
				confirmDelete: "Biztosan törölni szeretnéd ezt a tételt?",
				emptyEntries: "Nincs rögzített tétel erre a hónapra.",
				exportEmpty: "Nincs exportálható tétel ebben a hónapban.",
				exportDone: "A havi CSV export letöltése elindult.",
				editAction: "Szerkesztés",
				deleteAction: "Törlés",
				csvType: "Típus",
				csvCategory: "Kategória",
				csvAmount: "Összeg",
				csvDate: "Dátum",
				typeIncome: "Bevétel",
				typeExpense: "Kiadás",
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
				pageTitle: "Budget",
				heroTitle: "Budget",
				heroText: "Save expected income and expenses with exact dates.",
				menuButton: "Menu",
				homeLink: "Home",
				budgetLink: "Budget",
				summaryLink: "Monthly Budget",
				backAction: "Back",
				downloadAppButton: "Download App",
				languageLabel: "Language",
				appName: "Budgeting App",
				currencyLabel: "Currency",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (pound)",
				currencyUsd: "USD (dollar)",
				currencyEur: "EUR (euro)",
				monthLabel: "Selected month",
				forecastButton: "Budget Forecast Planner",
				forecastTitle: "Budget Forecast Planner",
				forecastTargetDateLabel: "Analyze up to date",
				forecastWhatIfDateLabel: "What-if purchase date",
				forecastWhatIfAmountLabel: "What-if amount",
				forecastDateQuickPickLabel: "Click a date for quick analysis:",
				forecastBaseUntilLabel: "Spending until that date:",
				forecastWithPurchaseLabel: "Spending with this purchase:",
				forecastDifferenceLabel: "Difference:",
				forecastMonthEndImpactLabel: "Updated month-end balance:",
				saveAllButton: "Save",
				saveAllDone: "Changes saved.",
				registerTitle: "Register",
				loginTitle: "Sign in",
				usernameLabel: "Username",
				emailLabel: "Email address",
				emailConfirmLabel: "Confirm email address",
				passwordLabel: "Password",
				passwordConfirmLabel: "Confirm password",
				registerButton: "Create account",
				loginButton: "Sign in",
				logoutButton: "Sign out",
				loginRequired: "Please sign in or register to manage entries.",
				incomeFormTitle: "Add income",
				expenseFormTitle: "Add expense",
				categoryLabel: "Category",
				amountLabel: "Amount",
				incomeDateLabel: "Expected date",
				expenseDateLabel: "Deduction date",
				saveIncomeButton: "Save income",
				saveExpenseButton: "Save expense",
				updateIncomeButton: "Update income",
				updateExpenseButton: "Update expense",
				cancelEditButton: "Cancel edit",
				monthlyIncomeTitle: "Total monthly income",
				monthlyExpenseTitle: "Total monthly expense",
				spentToDateTitle: "Spent to date",
				monthEndTitle: "Expected month-end balance",
				incomeEntriesTitle: "Income entries this month",
				expenseEntriesTitle: "Expense entries this month",
				loggedOut: "No user is signed in.",
				loggedIn: "Signed in as:",
				guestUser: "Guest",
				emailMismatch: "Email addresses do not match.",
				passwordMismatch: "Passwords do not match.",
				usernameTaken: "This username is already taken.",
				registerSuccess: "Registration successful.",
				loginSuccess: "Signed in successfully.",
				logoutSuccess: "Signed out successfully.",
				invalidLogin: "Invalid username or password.",
				appDownloaded: "App downloaded.",
				appInstallUnavailable: "App install is not available on this device right now.",
				loginFirst: "Please sign in first.",
				entrySaved: "Entry saved.",
				entryUpdated: "Entry updated.",
				entryDeleted: "Entry deleted.",
				confirmDelete: "Delete this entry?",
				emptyEntries: "No saved entries for this month.",
				exportEmpty: "There are no entries to export for this month.",
				exportDone: "Monthly CSV export started.",
				editAction: "Edit",
				deleteAction: "Delete",
				csvType: "Type",
				csvCategory: "Category",
				csvAmount: "Amount",
				csvDate: "Date",
				typeIncome: "Income",
				typeExpense: "Expense",
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
		let currentUser = loadSession(users);
		let appLanguage = loadLanguage();
		let appCurrency = loadCurrency();
		let appState = getCurrentUserState();

		const registerForm = document.getElementById("register-form");
		const loginForm = document.getElementById("login-form");
		const incomeForm = document.getElementById("income-form");
		const expenseForm = document.getElementById("expense-form");
		const forecastToggleButton = document.getElementById("forecast-toggle-button");
		const saveStateButton = document.getElementById("save-state-button");
		const menuToggle = document.getElementById("menu-toggle");
		const menuPanel = document.getElementById("menu-panel");
		const menuBackButton = document.getElementById("menu-back-button");
		const installAppButton = document.getElementById("install-app-button");
		const menuLogoutButton = document.getElementById("menu-logout-button");
		const authMessage = document.getElementById("auth-message");
		const sessionInfo = document.getElementById("session-info");
		const authSection = document.getElementById("auth-section");
		const budgetContent = document.getElementById("budget-content");
		const lockedMessage = document.getElementById("locked-message");
		const activeMonthInput = document.getElementById("active-month");
		const languageSelect = document.getElementById("app-language");
		const currencySelect = document.getElementById("app-currency");
		const monthlyIncomeEl = document.getElementById("monthly-income");
		const monthlyExpenseEl = document.getElementById("monthly-expense");
		const spentToDateEl = document.getElementById("spent-to-date");
		const monthEndLeftEl = document.getElementById("month-end-left");
		const incomeList = document.getElementById("income-list");
		const expenseList = document.getElementById("expense-list");
		const incomeSubmitButton = document.getElementById("income-submit-button");
		const expenseSubmitButton = document.getElementById("expense-submit-button");
		const incomeCancelEdit = document.getElementById("income-cancel-edit");
		const expenseCancelEdit = document.getElementById("expense-cancel-edit");
		const forecastPlanner = document.getElementById("forecast-planner");
		const forecastTargetDateInput = document.getElementById("forecast-target-date");
		const forecastWhatIfDateInput = document.getElementById("forecast-whatif-date");
		const forecastWhatIfAmountInput = document.getElementById("forecast-whatif-amount");
		const forecastDatePicks = document.getElementById("forecast-date-picks");
		const forecastBaseUntilEl = document.getElementById("forecast-base-until");
		const forecastWithPurchaseEl = document.getElementById("forecast-with-purchase");
		const forecastDifferenceEl = document.getElementById("forecast-difference");
		const forecastMonthEndEl = document.getElementById("forecast-month-end");
		let deferredInstallPrompt = null;

		initializePage();

		languageSelect.addEventListener("change", () => {
			appLanguage = languageSelect.value;
			saveLanguage();
			applyTranslations();
			render();
		});

		currencySelect.addEventListener("change", () => {
			appCurrency = currencySelect.value;
			saveCurrency();
			render();
		});

		activeMonthInput.addEventListener("change", render);
		forecastToggleButton.addEventListener("click", () => {
			const monthParam = encodeURIComponent(activeMonthInput.value || toMonthInput(today));
			window.location.href = `budget-forecast.html?month=${monthParam}`;
		});
		saveStateButton.addEventListener("click", () => {
			saveState();
			showMessage(t("saveAllDone"), false);
		});
		forecastTargetDateInput.addEventListener("change", renderForecastPlanner);
		forecastWhatIfDateInput.addEventListener("change", renderForecastPlanner);
		forecastWhatIfAmountInput.addEventListener("input", renderForecastPlanner);
		forecastDatePicks.addEventListener("click", (event) => {
			const button = event.target.closest("button[data-date]");
			if (!button) {
				return;
			}
			forecastTargetDateInput.value = button.dataset.date;
			renderForecastPlanner();
		});
		menuBackButton.addEventListener("click", () => {
			window.history.back();
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
		menuLogoutButton.addEventListener("click", handleLogout);
		incomeCancelEdit.addEventListener("click", resetIncomeForm);
		expenseCancelEdit.addEventListener("click", resetExpenseForm);

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

		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
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
			window.addEventListener("load", () => {
				navigator.serviceWorker.register("sw.js").catch(() => {
					// Service worker errors should not block usage.
				});
			});
		}

		registerForm.addEventListener("submit", async (event) => {
			event.preventDefault();
			const username = document.getElementById("register-username").value.trim();
			const email = document.getElementById("register-email-address").value.trim();
			const emailConfirm = document.getElementById("register-email-address-confirm").value.trim();
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

		incomeForm.addEventListener("submit", (event) => {
			event.preventDefault();
			if (!requireLogin()) {
				return;
			}

			const entry = buildEntryFromForm("income");
			const editId = document.getElementById("income-edit-id").value;

			if (editId) {
				upsertEntry("incomes", { ...entry, id: editId });
				showMessage(t("entryUpdated"), false);
			} else {
				upsertEntry("incomes", { ...entry, id: createEntryId() });
				showMessage(t("entrySaved"), false);
			}

			saveState();
			resetIncomeForm();
			render();
		});

		expenseForm.addEventListener("submit", (event) => {
			event.preventDefault();
			if (!requireLogin()) {
				return;
			}

			const entry = buildEntryFromForm("expense");
			const editId = document.getElementById("expense-edit-id").value;

			if (editId) {
				upsertEntry("expenses", { ...entry, id: editId });
				showMessage(t("entryUpdated"), false);
			} else {
				upsertEntry("expenses", { ...entry, id: createEntryId() });
				showMessage(t("entrySaved"), false);
			}

			saveState();
			resetExpenseForm();
			render();
		});

		incomeList.addEventListener("click", (event) => {
			handleEntryAction(event, "incomes");
		});

		expenseList.addEventListener("click", (event) => {
			handleEntryAction(event, "expenses");
		});

		function initializePage() {
			if (!currentUser) {
				window.location.href = "index.html";
				return;
			}

			activeMonthInput.value = toMonthInput(today);
			languageSelect.value = appLanguage;
			currencySelect.value = appCurrency;
			resetIncomeForm();
			resetExpenseForm();
			setDefaultForecastDates();
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

			document.querySelectorAll("#income-category option, #expense-category option").forEach((option) => {
				option.textContent = translateCategory(option.value);
			});

			updateSessionLabel();
			updateFormButtonLabels();
		}

		function render() {
			if (!currentUser) {
				monthlyIncomeEl.textContent = formatCurrency(0);
				monthlyExpenseEl.textContent = formatCurrency(0);
				spentToDateEl.textContent = formatCurrency(0);
				monthEndLeftEl.textContent = formatCurrency(0);
				paintList(incomeList, []);
				paintList(expenseList, []);
				return;
			}

			const activeMonth = activeMonthInput.value;
			const todayText = toDateInput(new Date());
			const incomes = monthEntries(appState.incomes, activeMonth);
			const expenses = monthEntries(appState.expenses, activeMonth);

			monthlyIncomeEl.textContent = formatCurrency(sumEntries(incomes));
			monthlyExpenseEl.textContent = formatCurrency(sumEntries(expenses));
			spentToDateEl.textContent = formatCurrency(sumEntries(expenses.filter((item) => item.date <= todayText)));
			monthEndLeftEl.textContent = formatCurrency(sumEntries(incomes) - sumEntries(expenses));

			paintList(incomeList, incomes, "incomes");
			paintList(expenseList, expenses, "expenses");
			renderForecastPlanner();
		}

		function setDefaultForecastDates() {
			const monthValue = activeMonthInput.value || toMonthInput(today);
			forecastTargetDateInput.value = getMonthEndDate(monthValue);
			forecastWhatIfDateInput.value = toDateInput(today);
			forecastWhatIfAmountInput.value = "0";
		}

		function renderForecastPlanner() {
			if (!currentUser) {
				forecastBaseUntilEl.textContent = formatCurrency(0);
				forecastWithPurchaseEl.textContent = formatCurrency(0);
				forecastDifferenceEl.textContent = formatCurrency(0);
				forecastMonthEndEl.textContent = formatCurrency(0);
				forecastDatePicks.innerHTML = "";
				return;
			}

			const activeMonth = activeMonthInput.value;
			const incomes = monthEntries(appState.incomes, activeMonth);
			const expenses = monthEntries(appState.expenses, activeMonth);
			let targetDate = forecastTargetDateInput.value || getMonthEndDate(activeMonth);
			if (!targetDate.startsWith(activeMonth)) {
				targetDate = getMonthEndDate(activeMonth);
				forecastTargetDateInput.value = targetDate;
			}

			let whatIfDate = forecastWhatIfDateInput.value;
			if (whatIfDate && !whatIfDate.startsWith(activeMonth)) {
				whatIfDate = targetDate;
				forecastWhatIfDateInput.value = whatIfDate;
			}
			const whatIfAmount = Number(forecastWhatIfAmountInput.value || 0);

			const baseUntil = sumEntries(expenses.filter((item) => item.date <= targetDate));
			const includeWhatIf = whatIfAmount > 0 && Boolean(whatIfDate) && whatIfDate <= targetDate && whatIfDate.startsWith(activeMonth);
			const simulatedUntil = baseUntil + (includeWhatIf ? whatIfAmount : 0);
			const difference = simulatedUntil - baseUntil;

			const monthIncomeTotal = sumEntries(incomes);
			const monthExpenseTotal = sumEntries(expenses);
			const monthEndWithWhatIf = monthIncomeTotal - monthExpenseTotal - (whatIfAmount > 0 && whatIfDate.startsWith(activeMonth) ? whatIfAmount : 0);

			forecastBaseUntilEl.textContent = formatCurrency(baseUntil);
			forecastWithPurchaseEl.textContent = formatCurrency(simulatedUntil);
			forecastDifferenceEl.textContent = formatCurrency(difference);
			forecastMonthEndEl.textContent = formatCurrency(monthEndWithWhatIf);

			renderForecastDatePicks(expenses, targetDate, activeMonth);
		}

		function renderForecastDatePicks(expenses, selectedDate, activeMonth) {
			const dateSet = new Set(expenses.map((item) => item.date));
			dateSet.add(toDateInput(today));
			dateSet.add(getMonthEndDate(activeMonth));

			const sorted = Array.from(dateSet).filter((date) => date.startsWith(activeMonth)).sort();
			forecastDatePicks.innerHTML = sorted
				.map((date) => `<button type="button" class="inline-button ${date === selectedDate ? "secondary" : ""}" data-date="${date}">${formatDisplayDate(date)}</button>`)
				.join("");
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

			entries
				.slice()
				.sort((left, right) => left.date.localeCompare(right.date))
				.forEach((entry) => {
					const li = document.createElement("li");
					li.className = "entry-row";
					li.innerHTML = `
						<div>
							<span>${formatDisplayDate(entry.date)}</span>
							<strong>${translateCategory(entry.category)}</strong>
						</div>
						<span>${formatCurrency(entry.amount)}</span>
						<div class="row-actions">
							<button type="button" class="inline-button" data-action="edit" data-id="${entry.id}">${t("editAction")}</button>
							<button type="button" class="inline-button danger" data-action="delete" data-id="${entry.id}">${t("deleteAction")}</button>
						</div>
					`;
					target.appendChild(li);
				});
		}

		function handleEntryAction(event, listType) {
			const button = event.target.closest("button[data-action]");
			if (!button) {
				return;
			}

			const entryId = button.dataset.id;
			const action = button.dataset.action;
			const entry = appState[listType].find((item) => item.id === entryId);

			if (!entry) {
				return;
			}

			if (action === "edit") {
				populateFormForEdit(listType, entry);
				return;
			}

			if (action === "delete" && window.confirm(t("confirmDelete"))) {
				appState[listType] = appState[listType].filter((item) => item.id !== entryId);
				saveState();
				if (listType === "incomes") {
					resetIncomeForm();
				} else {
					resetExpenseForm();
				}
				showMessage(t("entryDeleted"), false);
				render();
			}
		}

		function populateFormForEdit(listType, entry) {
			if (listType === "incomes") {
				document.getElementById("income-edit-id").value = entry.id;
				document.getElementById("income-category").value = entry.category;
				document.getElementById("income-amount").value = entry.amount;
				document.getElementById("income-date").value = entry.date;
				incomeCancelEdit.classList.remove("hidden");
			} else {
				document.getElementById("expense-edit-id").value = entry.id;
				document.getElementById("expense-category").value = entry.category;
				document.getElementById("expense-amount").value = entry.amount;
				document.getElementById("expense-date").value = entry.date;
				expenseCancelEdit.classList.remove("hidden");
			}

			updateFormButtonLabels();
		}

		function resetIncomeForm() {
			incomeForm.reset();
			document.getElementById("income-edit-id").value = "";
			document.getElementById("income-date").value = toDateInput(today);
			incomeCancelEdit.classList.add("hidden");
			updateFormButtonLabels();
		}

		function resetExpenseForm() {
			expenseForm.reset();
			document.getElementById("expense-edit-id").value = "";
			document.getElementById("expense-date").value = toDateInput(today);
			expenseCancelEdit.classList.add("hidden");
			updateFormButtonLabels();
		}

		function updateFormButtonLabels() {
			incomeSubmitButton.textContent = document.getElementById("income-edit-id").value ? t("updateIncomeButton") : t("saveIncomeButton");
			expenseSubmitButton.textContent = document.getElementById("expense-edit-id").value ? t("updateExpenseButton") : t("saveExpenseButton");
		}

		function buildEntryFromForm(prefix) {
			return {
				category: document.getElementById(`${prefix}-category`).value,
				amount: Number(document.getElementById(`${prefix}-amount`).value),
				date: document.getElementById(`${prefix}-date`).value
			};
		}

		function upsertEntry(collectionName, entry) {
			const existingIndex = appState[collectionName].findIndex((item) => item.id === entry.id);
			if (existingIndex >= 0) {
				appState[collectionName][existingIndex] = entry;
				return;
			}

			appState[collectionName].push(entry);
		}

		function exportMonthCsv() {
			if (!requireLogin()) {
				return;
			}

			const activeMonth = activeMonthInput.value;
			const rows = [[t("csvType"), t("csvCategory"), t("csvAmount"), t("csvDate")]];

			monthEntries(appState.incomes, activeMonth).forEach((entry) => {
				rows.push([t("typeIncome"), translateCategory(entry.category), String(entry.amount), entry.date]);
			});

			monthEntries(appState.expenses, activeMonth).forEach((entry) => {
				rows.push([t("typeExpense"), translateCategory(entry.category), String(entry.amount), entry.date]);
			});

			if (rows.length === 1) {
				showMessage(t("exportEmpty"), true);
				return;
			}

			const csv = rows.map((row) => row.map(escapeCsv).join(";")).join("\n");
			const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = `budget-${currentUser}-${activeMonth}.csv`;
			link.click();
			URL.revokeObjectURL(url);
			showMessage(t("exportDone"), false);
		}

		function escapeCsv(value) {
			const text = String(value).replace(/"/g, '""');
			return `"${text}"`;
		}

		function handleLogout() {
			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			currentUser = "";
			appState = { incomes: [], expenses: [] };
			localStorage.removeItem(SESSION_KEY);
			window.location.href = "index.html";
		}

		function updateAccessUI() {
			authSection.classList.add("hidden");
			lockedMessage.classList.add("hidden");
			budgetContent.classList.remove("hidden");
			menuToggle.disabled = false;
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

		function loginUser(username) {
			currentUser = username;
			if (username !== GUEST_SESSION_VALUE) {
				ensureUserData(username);
			}
			appState = getCurrentUserState();
			localStorage.setItem(SESSION_KEY, username);
			resetIncomeForm();
			resetExpenseForm();
			updateAccessUI();
			render();
		}

		function requireLogin() {
			if (currentUser) {
				return true;
			}

			showMessage(t("loginFirst"), true);
			return false;
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

		function showMessage(message, isError) {
			authMessage.textContent = message;
			authMessage.classList.toggle("error", isError);
			authMessage.classList.toggle("ok", !isError);
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

		function loadCurrency() {
			const saved = localStorage.getItem(CURRENCY_KEY);
			return ["HUF", "GBP", "USD", "EUR"].includes(saved) ? saved : "HUF";
		}

		function saveCurrency() {
			localStorage.setItem(CURRENCY_KEY, appCurrency);
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

		function saveState() {
			if (currentUser === GUEST_SESSION_VALUE) {
				saveGuestData(appState);
				return;
			}

			if (!currentUser || !users[currentUser]) {
				return;
			}

			users[currentUser].data = appState;
			saveUsers();
		}

		function loadLanguage() {
			return localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "hu";
		}

		function saveLanguage() {
			localStorage.setItem(LANGUAGE_KEY, appLanguage);
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

		function saveGuestData(data) {
			localStorage.setItem(GUEST_DATA_KEY, JSON.stringify({
				incomes: Array.isArray(data.incomes) ? data.incomes : [],
				expenses: Array.isArray(data.expenses) ? data.expenses : []
			}));
		}