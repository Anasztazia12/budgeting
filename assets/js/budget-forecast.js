const shared = window.BudgetAppShared;
		const {
			USERS_KEY,
			SESSION_KEY,
			LANGUAGE_KEY,
			THEME_KEY,
			CURRENCY_KEY,
			INSTALL_STATUS_KEY,
			GUEST_DATA_KEY
		} = shared.KEYS;
		const { GUEST_SESSION_VALUE } = shared;

		const dictionary = {
			hu: {
				pageTitle: "Költségvetési előrejelző",
				heroTitle: "Költségvetési előrejelző",
				heroText: "Tervezd meg előre a kiadásaidat dátum és előrejelzés alapján.",
				menuButton: "Menü",
				homeLink: "Kezdőlap",
				budgetLink: "Költségvetés",
				summaryLink: "Havi összegzés",
				themeModeLabel: "Téma",
				themeModeLight: "Világos",
				themeModeDark: "Sötét",
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
				forecastButton: "Vissza a Költségvetéshez",
				forecastTitle: "Költségvetési előrejelző",
				forecastTargetDateLabel: "Elemzés dátuma",
				forecastAddRowButton: "+ Extra, váratlan tétel hozzáadása",
				forecastRowTypeLabel: "Típus",
				forecastRowAmountLabel: "Összeg",
				forecastRowDateLabel: "Dátum",
				forecastTypeExpense: "Extra kiadás",
				forecastTypeIncome: "Extra bevétel",
				forecastRemoveRow: "Sor törlése",
				forecastBaseUntilLabel: "Egyenleg eddig a dátumig:",
				forecastWithPurchaseLabel: "Egyenleg tervezett tételekkel:",
				forecastDifferenceLabel: "Különbség:",
				forecastMonthEndImpactLabel: "Hóvégi egyenleg új állapotban:",
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
				cancelEditButton: "Szerkesztés",
				monthlyIncomeTitle: "Összes havi bevétel",
				monthlyExpenseTitle: "Összes havi kiadás",
				spentToDateTitle: "Kiadás mai napig",
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
				pageTitle: "Budget Forecast Planner",
				heroTitle: "Budget Forecast Planner",
				heroText: "Plan your future spending based on date and forecast.",
				menuButton: "Menu",
				homeLink: "Home",
				budgetLink: "Budget",
				summaryLink: "Monthly Budget",
				themeModeLabel: "Theme",
				themeModeLight: "Light",
				themeModeDark: "Dark",
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
				forecastButton: "Back to Budget",
				forecastTitle: "Budget Forecast Planner",
				forecastTargetDateLabel: "Analyze up to date",
				forecastAddRowButton: "+ Add extra unexpected item",
				forecastRowTypeLabel: "Type",
				forecastRowAmountLabel: "Amount",
				forecastRowDateLabel: "Date",
				forecastTypeExpense: "Extra expense",
				forecastTypeIncome: "Extra income",
				forecastRemoveRow: "Remove row",
				forecastBaseUntilLabel: "Balance until date:",
				forecastWithPurchaseLabel: "Balance with planned rows:",
				forecastDifferenceLabel: "Difference:",
				forecastMonthEndImpactLabel: "Updated month-end balance:",
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
				cancelEditButton: "Edit",
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
		const pageParams = new URLSearchParams(window.location.search);
		const users = loadUsers();
		let currentUser = loadSession(users);
		let appLanguage = loadLanguage();
		let appTheme = loadTheme();
		let appCurrency = loadCurrency();
		let appState = getCurrentUserState();

		const incomeForm = document.getElementById("income-form");
		const expenseForm = document.getElementById("expense-form");
		const forecastToggleButton = document.getElementById("forecast-toggle-button");
		const menuToggle = document.getElementById("menu-toggle");
		const menuPanel = document.getElementById("menu-panel");
		const menuBackButton = document.getElementById("menu-back-button");
		const installAppButton = document.getElementById("install-app-button");
		const themeLightButton = document.getElementById("theme-light-button");
		const themeDarkButton = document.getElementById("theme-dark-button");
		const menuLogoutButton = document.getElementById("menu-logout-button");
		const authMessage = document.getElementById("auth-message");
		const budgetContent = document.getElementById("budget-content");
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
		const incomeDeleteButton = document.getElementById("income-delete");
		const expenseCancelEdit = document.getElementById("expense-cancel-edit");
		const expenseDeleteButton = document.getElementById("expense-delete");
		const forecastPlanner = document.getElementById("forecast-planner");
		const forecastTargetDateInput = document.getElementById("forecast-target-date");
		const addWhatIfRowButton = document.getElementById("add-whatif-row");
		const whatIfRowsContainer = document.getElementById("whatif-rows");
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
			window.location.href = "budget.html";
		});
		forecastTargetDateInput.addEventListener("change", renderForecastPlanner);
		addWhatIfRowButton.addEventListener("click", () => {
			appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value });
			renderForecastPlanner();
		});
		whatIfRowsContainer.addEventListener("input", renderForecastPlanner);
		whatIfRowsContainer.addEventListener("change", renderForecastPlanner);
		whatIfRowsContainer.addEventListener("click", (event) => {
			const removeButton = event.target.closest("button[data-action='remove-whatif']");
			if (!removeButton) {
				return;
			}
			removeButton.closest(".whatif-row")?.remove();
			if (!whatIfRowsContainer.children.length) {
				appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value });
			}
			renderForecastPlanner();
		});
		if (menuBackButton) {
			menuBackButton.addEventListener("click", () => {
				window.history.back();
			});
		}
		if (installAppButton) {
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
		}
		if (menuLogoutButton) {
			menuLogoutButton.addEventListener("click", handleLogout);
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
		if (incomeCancelEdit) {
			incomeCancelEdit.addEventListener("click", resetIncomeForm);
		}
		if (incomeDeleteButton) {
			incomeDeleteButton.addEventListener("click", () => {
				handleDeleteFromForm("incomes", "income-edit-id", resetIncomeForm);
			});
		}
		if (expenseCancelEdit) {
			expenseCancelEdit.addEventListener("click", resetExpenseForm);
		}
		if (expenseDeleteButton) {
			expenseDeleteButton.addEventListener("click", () => {
				handleDeleteFromForm("expenses", "expense-edit-id", resetExpenseForm);
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

			applyTheme();
			syncThemeButtons();
			const queryMonth = pageParams.get("month");
			activeMonthInput.value = queryMonth && /^\d{4}-\d{2}$/.test(queryMonth) ? queryMonth : toMonthInput(today);
			languageSelect.value = appLanguage;
			currencySelect.value = appCurrency;
			resetIncomeForm();
			resetExpenseForm();
			setDefaultForecastDates();
			setDefaultWhatIfRows();
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

			document.querySelectorAll("#income-category option, #expense-category option").forEach((option) => {
				option.textContent = translateCategory(option.value);
			});

			updateFormButtonLabels();
			refreshWhatIfRowLabels();
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
		}

		function setDefaultWhatIfRows() {
			whatIfRowsContainer.innerHTML = "";
			appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value || toDateInput(today) });
		}

		function appendWhatIfRow(row) {
			const wrapper = document.createElement("div");
			wrapper.className = "grid forecast-grid whatif-row";
			wrapper.innerHTML = `
				<div>
					<label>${t("forecastRowTypeLabel")}</label>
					<select class="forecast-whatif-type">
						<option value="expense">${t("forecastTypeExpense")}</option>
						<option value="income">${t("forecastTypeIncome")}</option>
					</select>
				</div>
				<div>
					<label>${t("forecastRowAmountLabel")}</label>
					<input type="number" class="forecast-whatif-amount" min="0" step="1" value="${row.amount ?? ""}">
				</div>
				<div>
					<label>${t("forecastRowDateLabel")}</label>
					<input type="date" class="forecast-whatif-date" value="${row.date || ""}">
				</div>
				<div class="control-action">
					<button type="button" class="secondary" data-action="remove-whatif">${t("forecastRemoveRow")}</button>
				</div>
			`;

			const typeSelect = wrapper.querySelector(".forecast-whatif-type");
			typeSelect.value = row.type || "expense";
			whatIfRowsContainer.appendChild(wrapper);
		}

		function refreshWhatIfRowLabels() {
			whatIfRowsContainer.querySelectorAll(".whatif-row").forEach((row) => {
				const labels = row.querySelectorAll("label");
				if (labels[0]) {
					labels[0].textContent = t("forecastRowTypeLabel");
				}
				if (labels[1]) {
					labels[1].textContent = t("forecastRowAmountLabel");
				}
				if (labels[2]) {
					labels[2].textContent = t("forecastRowDateLabel");
				}

				const typeSelect = row.querySelector(".forecast-whatif-type");
				const currentType = typeSelect ? typeSelect.value : "expense";
				if (typeSelect) {
					typeSelect.innerHTML = `
						<option value="expense">${t("forecastTypeExpense")}</option>
						<option value="income">${t("forecastTypeIncome")}</option>
					`;
					typeSelect.value = currentType;
				}

				const removeButton = row.querySelector("button[data-action='remove-whatif']");
				if (removeButton) {
					removeButton.textContent = t("forecastRemoveRow");
				}
			});
		}

		function collectWhatIfRows(activeMonth) {
			return Array.from(whatIfRowsContainer.querySelectorAll(".whatif-row")).map((row) => {
				const type = row.querySelector(".forecast-whatif-type")?.value || "expense";
				const amount = Number(row.querySelector(".forecast-whatif-amount")?.value || 0);
				const date = row.querySelector(".forecast-whatif-date")?.value || "";
				return {
					type,
					amount,
					date,
					valid: amount > 0 && Boolean(date) && date.startsWith(activeMonth)
				};
			});
		}

		function renderForecastPlanner() {
			if (!currentUser) {
				forecastBaseUntilEl.textContent = formatCurrency(0);
				forecastWithPurchaseEl.textContent = formatCurrency(0);
				forecastDifferenceEl.textContent = formatCurrency(0);
				forecastMonthEndEl.textContent = formatCurrency(0);
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

			const whatIfRows = collectWhatIfRows(activeMonth);
			const baseUntil = sumEntries(incomes.filter((item) => item.date <= targetDate)) - sumEntries(expenses.filter((item) => item.date <= targetDate));
			const adjustmentsUntilTarget = whatIfRows
				.filter((item) => item.valid && item.date <= targetDate)
				.reduce((sum, item) => sum + (item.type === "income" ? item.amount : -item.amount), 0);
			const simulatedUntil = baseUntil + adjustmentsUntilTarget;
			const difference = adjustmentsUntilTarget;

			const monthIncomeTotal = sumEntries(incomes);
			const monthExpenseTotal = sumEntries(expenses);
			const allAdjustmentsInMonth = whatIfRows
				.filter((item) => item.valid)
				.reduce((sum, item) => sum + (item.type === "income" ? item.amount : -item.amount), 0);
			const monthEndWithWhatIf = monthIncomeTotal - monthExpenseTotal + allAdjustmentsInMonth;

			forecastBaseUntilEl.textContent = formatCurrency(baseUntil);
			forecastWithPurchaseEl.textContent = formatCurrency(simulatedUntil);
			forecastDifferenceEl.textContent = formatCurrency(difference);
			forecastMonthEndEl.textContent = formatCurrency(monthEndWithWhatIf);
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

		function handleDeleteFromForm(collectionName, editIdField, resetForm) {
			const editId = document.getElementById(editIdField).value;
			if (!editId) {
				resetForm();
				return;
			}

			if (!window.confirm(t("confirmDelete"))) {
				return;
			}

			appState[collectionName] = appState[collectionName].filter((item) => item.id !== editId);
			saveState();
			resetForm();
			showMessage(t("entryDeleted"), false);
			render();
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
			if (budgetContent) {
				budgetContent.classList.remove("hidden");
			}
			menuToggle.disabled = false;
		}

		function requireLogin() {
			return Boolean(currentUser);
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

		function showMessage(message, isError) {
			if (!authMessage) {
				return;
			}
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

		function loadCurrency() {
			return shared.loadCurrency();
		}

		function saveCurrency() {
			shared.saveCurrency(appCurrency);
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

		function createEntryId() {
			return shared.createEntryId();
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
			return shared.loadUsers();
		}

		function saveUsers() {
			shared.saveUsers(users);
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
			return shared.loadSession(userMap);
		}

		function getCurrentUserState() {
			return shared.getCurrentUserState(currentUser, users);
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
			return shared.loadLanguage();
		}

		function saveLanguage() {
			shared.saveLanguage(appLanguage);
		}

		function loadGuestData() {
			return shared.loadGuestData();
		}

		function saveGuestData(data) {
			shared.saveGuestData(data);
		}