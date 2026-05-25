		import {
			deleteCurrentAccount,
			getFirebaseErrorMessage,
			logoutCurrentUser,
			restoreSession,
			saveCurrentUserData
		} from "./firebase-service.js";

		const shared = window.BudgetAppShared;
		const {
			SESSION_KEY,
			DISPLAY_NAME_KEY,
			THEME_KEY,
			INSTALL_STATUS_KEY
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
				summaryLink: "Összesítés",
				versionLabel: "Verzió",
				themeModeLabel: "Téma",
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
				appName: "Költségvetési app",
				currencyLabel: "Pénznem\nválasztó",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (font)",
				currencyUsd: "USD (dollár)",
				currencyEur: "EUR (euró)",
				periodLabel: "Választott időszak",
				periodFromLabel: "-tól",
				periodToLabel: "-ig",
				forecastButton: "Vissza a Költségvetéshez",
				forecastTitle: "Költségvetési előrejelző",
				forecastTargetDateLabel: "Elemzés dátuma",
				forecastAddRowButton: "+ Extra, váratlan tétel hozzáadása",
				forecastRowTypeLabel: "Típus",
				forecastRowAmountLabel: "Összeg",
				forecastRowDateLabel: "Dátum",
				forecastRowNoteLabel: "Megjegyzés",
				forecastRowNotePlaceholder: "Rövid megjegyzés (opcionális)",
				forecastTypeExpense: "Extra kiadás",
				forecastTypeIncome: "Extra bevétel",
				forecastRemoveRow: "Törlés",
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
				forecastScenarioEmpty: "Nincs menthető forecast sor.",
				forecastScenarioSaved: "A terv elmentve.",
				forecastScenarioUpdated: "A terv frissítve.",
				forecastScenarioLoaded: "A kiválasztott terv(ek) betöltve.",
				forecastScenarioSelectRequired: "Válassz ki legalább egy mentett tervet.",
				forecastRowSaved: "A sor elmentve a tervhez.",
				deleteAccountNeedsSecondClick: "Kattints újra 7 másodpercen belül a fiók törléséhez.",
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
				monthlyIncomeTitle: "Bevétel",
				monthlyExpenseTitle: "Kiadás",
				spentToDateTitle: "Kiadás mai napig",
				monthEndTitle: "Várható bevétel",
				incomeEntriesTitle: "Bevételek",
				expenseEntriesTitle: "Kiadások",
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
				exportDone: "A CSV export letöltése elindult.",
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
					rent: "Albérlet",
					biztositas: "Biztosítás",
					"hitelkartya 3": "Hitelkártya 3",
					onkormanyzat: "Önkormányzat",
					zilch: "Zilch",
					tv: "TV",
					telefon: "Telefon",
					internet: "Internet",
					iskola: "Iskola",
					suli: "Iskola",
					"egyeb kiadas": "Egyéb kiadás"
				}
			       },
			       en: {
				       heroTitle: "Budget Forecast Planner",
				       heroText: "Plan your upcoming expenses by date with forecast scenarios.",
				       menuButton: "Menu",
				       homeLink: "Home",
				       budgetLink: "Budget",
				       summaryLink: "Summary",
				       versionLabel: "Version",
				       themeModeLabel: "Theme",
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
				       appName: "Budgeting App",
				       currencyLabel: "Currency\nselector",
				currencyHuf: "HUF (forint)",
				currencyGbp: "GBP (pound)",
				currencyUsd: "USD (dollar)",
				currencyEur: "EUR (euro)",
				periodLabel: "Selected period",
				periodFromLabel: "from",
				periodToLabel: "to",
				forecastButton: "Back to Budget",
				forecastTitle: "Budget Forecast Planner",
				forecastTargetDateLabel: "Analysis date",
				forecastAddRowButton: "+ Add an extra unexpected item",
				forecastRowTypeLabel: "Type",
				forecastRowAmountLabel: "Amount",
				forecastRowDateLabel: "Date",
				forecastRowNoteLabel: "Note",
				forecastRowNotePlaceholder: "Short note (optional)",
				forecastTypeExpense: "Extra expense",
				forecastTypeIncome: "Extra income",
				forecastRemoveRow: "Delete",
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
				forecastScenarioEmpty: "There are no forecast rows to save.",
				forecastScenarioSaved: "Plan saved.",
				forecastScenarioUpdated: "Plan updated.",
				forecastScenarioLoaded: "Selected plan(s) loaded.",
				forecastScenarioSelectRequired: "Select at least one saved plan.",
				forecastRowSaved: "Row saved to plan.",
				deleteAccountNeedsSecondClick: "Click again within 7 seconds to delete the account.",
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
				monthlyIncomeTitle: "Income",
				monthlyExpenseTitle: "Expenses",
				spentToDateTitle: "Spent to date",
				monthEndTitle: "Expected income",
				incomeEntriesTitle: "Income entries",
				expenseEntriesTitle: "Expense entries",
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
				exportDone: "CSV export started.",
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
					onkormanyzat: "Municipality",
					zilch: "Zilch",
					tv: "TV",
					telefon: "Phone",
					internet: "Internet",
					iskola: "School",
					suli: "School",
					   "egyeb kiadas": "Other expense"
					   },
					   currencyHuf: "HUF (forint)",
					   currencyGbp: "GBP (pound)",
					   currencyUsd: "USD (dollar)",
					   currencyEur: "EUR (euro)",
					   periodLabel: "Selected period",
					   periodFromLabel: "from",
					   periodToLabel: "to",
					   forecastButton: "Back to Budget",
					   forecastTitle: "Budget Forecast Planner",
					   forecastTargetDateLabel: "Analysis date",
					   forecastAddRowButton: "+ Add an extra unexpected item",
					   forecastRowTypeLabel: "Type",
					   forecastRowAmountLabel: "Amount",
					   forecastRowDateLabel: "Date",
					   forecastRowNoteLabel: "Note",
					   forecastRowNotePlaceholder: "Short note (optional)",
					   forecastTypeExpense: "Extra expense",
					   forecastTypeIncome: "Extra income",
					   forecastRemoveRow: "Delete",
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
					   forecastScenarioEmpty: "There are no forecast rows to save.",
					   forecastScenarioSaved: "Plan saved.",
					   forecastScenarioUpdated: "Plan updated.",
					   forecastScenarioLoaded: "Selected plan(s) loaded.",
					   forecastScenarioSelectRequired: "Select at least one saved plan.",
					   forecastRowSaved: "Row saved to plan.",
					   deleteAccountNeedsSecondClick: "Click again within 7 seconds to delete the account.",
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
				       monthlyIncomeTitle: "Income",
				       monthlyExpenseTitle: "Expenses",
				       spentToDateTitle: "Spent to date",
				       monthEndTitle: "Expected income",
				       incomeEntriesTitle: "Income entries",
				       expenseEntriesTitle: "Expense entries",
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
				       exportDone: "CSV export started.",
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
					       onkormanyzat: "Municipality",
					       zilch: "Zilch",
					       tv: "TV",
					       telefon: "Phone",
					       internet: "Internet",
					       iskola: "School",
					       suli: "School",
					       "egyeb kiadas": "Other expense"
				       }
			       }
			};

		const today = new Date();
		const pageParams = new URLSearchParams(window.location.search);
		let currentUser = localStorage.getItem(SESSION_KEY) || "";
		let currentProfile = null;
		let appLanguage = loadLanguage();
		let appTheme = loadTheme();
		let appCurrency = loadCurrency();
		let appState = { incomes: [], expenses: [] };
		let deleteAccountConfirmArmed = false;
		let deleteAccountConfirmTimer = null;

		const incomeForm = document.getElementById("income-form");
		const expenseForm = document.getElementById("expense-form");
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
		const forecastScenarioNameInput = document.getElementById("forecast-scenario-name");
		const forecastScenarioList = document.getElementById("forecast-scenario-list");
		const forecastLoadScenarioButton = document.getElementById("forecast-load-scenario");
		const forecastBaseUntilEl = document.getElementById("forecast-base-until");
		const forecastWithPurchaseEl = document.getElementById("forecast-with-purchase");
		const forecastDifferenceEl = document.getElementById("forecast-difference");
		const forecastMonthEndEl = document.getElementById("forecast-month-end");
		let deferredInstallPrompt = null;
		let forecastScenarios = [];
		let activeForecastScenarioId = "";

		languageSelect.addEventListener("change", () => {
		currencySelect.addEventListener("change", () => {
		window.addEventListener('DOMContentLoaded', () => {
			void initializePage();
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
			// ...add all other event listeners here as needed...
		});

		[periodStartInput, periodEndInput].forEach((input) => {
			if (!input) {
				return;
			}
			input.addEventListener("change", () => {
				normalizePeriodInputs();
				render();
			});
		});
		forecastToggleButton.addEventListener("click", () => {
			window.location.href = "budget.html";
		});
		if (summaryToggleButton) {
			summaryToggleButton.addEventListener("click", () => {
				const periodStart = periodStartInput?.value || toDateInput(today);
				const monthParam = encodeURIComponent(periodStart.slice(0, 7));
				window.location.href = `monthly_budget.html?month=${monthParam}`;
			});
		}
		forecastTargetDateInput.addEventListener("change", renderForecastPlanner);
		addWhatIfRowButton.addEventListener("click", () => {
			appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value, note: "", rowId: createEntryId() });
			renderForecastPlanner();
		});
		if (forecastLoadScenarioButton) {
			forecastLoadScenarioButton.addEventListener("click", loadSelectedForecastScenarios);
		}
		whatIfRowsContainer.addEventListener("input", renderForecastPlanner);
		whatIfRowsContainer.addEventListener("change", renderForecastPlanner);
		whatIfRowsContainer.addEventListener("click", (event) => {
			const actionButton = event.target.closest("button[data-action]");
			if (!actionButton) {
				return;
			}

			const rowElement = actionButton.closest(".whatif-row");
			if (!rowElement) {
				return;
			}

			const action = actionButton.dataset.action;
			if (action === "remove-whatif") {
				const removedRowId = rowElement.dataset.rowId;
				if (removedRowId) {
					let changed = false;
					forecastScenarios = forecastScenarios.map((scenario) => {
						const nextRows = scenario.rows.filter((row) => row.rowId !== removedRowId);
						if (nextRows.length !== scenario.rows.length) {
							changed = true;
							return { ...scenario, rows: nextRows };
						}
						return scenario;
					});
					if (changed) {
						saveForecastScenarios();
						renderScenarioList();
					}
				}
				rowElement.remove();
				if (!whatIfRowsContainer.children.length) {
					appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value, note: "", rowId: createEntryId() });
				}
				renderForecastPlanner();
				return;
			}

			if (action === "save-whatif") {
				saveWhatIfRow(rowElement);
			}
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
		if (menuLogoutButton) {
			menuLogoutButton.addEventListener("click", handleLogout);
		}
		if (deleteAccountButton) {
			deleteAccountButton.addEventListener("click", handleAccountDelete);
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
			const queryMonth = pageParams.get("month");
			setDefaultPeriodRange(queryMonth);
			languageSelect.value = appLanguage;
			currencySelect.value = appCurrency;
			resetIncomeForm();
			resetExpenseForm();
			setDefaultForecastDates();
			setDefaultWhatIfRows();
			loadForecastScenarios();
			renderScenarioList();
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
			document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
				element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
			});

			document.querySelectorAll("#income-category option, #expense-category option").forEach((option) => {
				option.textContent = translateCategory(option.value);
			});

			updateFormButtonLabels();
			refreshWhatIfRowLabels();
			renderScenarioList();
			updateMenuSessionLabel();
		}

		function getForecastScenarioStorageKey() {
			const sessionKey = currentUser === GUEST_SESSION_VALUE ? "guest" : (currentUser || "anon");
			return `budgetAppForecastScenarios:${sessionKey}`;
		}

		function normalizeScenarioRows(rows) {
			return (Array.isArray(rows) ? rows : []).map((row) => {
				const rowId = String(row?.rowId || createEntryId());
				const type = row?.type === "income" ? "income" : "expense";
				const amount = Number(row?.amount || 0);
				const date = String(row?.date || "");
				const note = String(row?.note || "").trim().slice(0, 80);
				return { rowId, type, amount, date, note };
			});
		}

		function loadForecastScenarios() {
			const raw = localStorage.getItem(getForecastScenarioStorageKey());
			if (!raw) {
				forecastScenarios = [];
				return;
			}

			try {
				const parsed = JSON.parse(raw);
				forecastScenarios = (Array.isArray(parsed) ? parsed : []).map((scenario) => ({
					id: String(scenario?.id || createEntryId()),
					name: String(scenario?.name || "").trim().slice(0, 50),
					targetDate: String(scenario?.targetDate || ""),
					rows: normalizeScenarioRows(scenario?.rows)
				})).filter((scenario) => scenario.name);
			} catch (_error) {
				forecastScenarios = [];
			}
		}

		function saveForecastScenarios() {
			localStorage.setItem(getForecastScenarioStorageKey(), JSON.stringify(forecastScenarios));
		}

		function renderScenarioList() {
			if (!forecastScenarioList) {
				return;
			}
			const selectedIds = new Set(
				Array.from(forecastScenarioList.querySelectorAll(".forecast-scenario-checkbox:checked")).map((checkbox) => checkbox.value)
			);

			forecastScenarioList.innerHTML = "";
			if (!forecastScenarios.length) {
				const empty = document.createElement("p");
				empty.className = "forecast-scenario-empty";
				empty.textContent = t("forecastScenarioNone");
				forecastScenarioList.appendChild(empty);
				return;
			}

			forecastScenarios.forEach((scenario) => {
				const row = document.createElement("label");
				row.className = "forecast-scenario-item";
				row.innerHTML = `
					<input type="checkbox" class="forecast-scenario-checkbox" value="${scenario.id}">
					<span>${scenario.name}</span>
				`;
				const checkbox = row.querySelector(".forecast-scenario-checkbox");
				if (checkbox && (selectedIds.has(scenario.id) || scenario.id === activeForecastScenarioId)) {
					checkbox.checked = true;
				}
				forecastScenarioList.appendChild(row);
			});
		}

		function getWhatIfRowsForScenario() {
			return Array.from(whatIfRowsContainer.querySelectorAll(".whatif-row")).map((row) => ({
				rowId: row.dataset.rowId || createEntryId(),
				type: row.querySelector(".forecast-whatif-type")?.value || "expense",
				amount: Number(row.querySelector(".forecast-whatif-amount")?.value || 0),
				date: row.querySelector(".forecast-whatif-date")?.value || "",
				note: String(row.querySelector(".forecast-whatif-note")?.value || "").trim().slice(0, 80)
			})).filter((row) => row.amount > 0 || row.date || row.note);
		}

		function ensureActiveScenario(scenarioName) {
			const targetDate = forecastTargetDateInput?.value || "";
			if (activeForecastScenarioId) {
				const existing = forecastScenarios.find((scenario) => scenario.id === activeForecastScenarioId);
				if (existing && existing.name === scenarioName) {
					existing.name = scenarioName;
					existing.targetDate = targetDate;
					return existing;
				}
			}

			const byName = forecastScenarios.find((scenario) => scenario.name === scenarioName);
			if (byName) {
				byName.targetDate = targetDate;
				activeForecastScenarioId = byName.id;
				return byName;
			}

			const created = {
				id: createEntryId(),
				name: scenarioName,
				targetDate,
				rows: []
			};
			forecastScenarios.push(created);
			activeForecastScenarioId = created.id;
			return created;
		}

		function loadSelectedForecastScenarios() {
			const selectedIds = Array.from(forecastScenarioList?.querySelectorAll(".forecast-scenario-checkbox:checked") || [])
				.map((checkbox) => checkbox.value);

			if (!selectedIds.length) {
				showMessage(t("forecastScenarioSelectRequired"), true);
				return;
			}

			const selectedScenarios = forecastScenarios.filter((scenario) => selectedIds.includes(scenario.id));
			if (!selectedScenarios.length) {
				showMessage(t("forecastScenarioSelectRequired"), true);
				return;
			}

			whatIfRowsContainer.innerHTML = "";
			selectedScenarios.forEach((scenario) => {
				normalizeScenarioRows(scenario.rows).forEach((row) => {
					appendWhatIfRow(row);
				});
			});

			if (!whatIfRowsContainer.children.length) {
				appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value || toDateInput(today), note: "", rowId: createEntryId() });
			}

			if (selectedScenarios.length === 1) {
				activeForecastScenarioId = selectedScenarios[0].id;
				if (forecastScenarioNameInput) {
					forecastScenarioNameInput.value = selectedScenarios[0].name;
				}
			} else {
				activeForecastScenarioId = "";
				if (forecastScenarioNameInput) {
					forecastScenarioNameInput.value = "";
				}
			}

			renderForecastPlanner();
			showMessage(t("forecastScenarioLoaded"), false);
		}

		function saveWhatIfRow(rowElement) {
			const scenarioName = String(forecastScenarioNameInput?.value || "").trim();
			if (!scenarioName) {
				showMessage(t("forecastScenarioNameRequired"), true);
				return;
			}

			const rowData = {
				rowId: rowElement.dataset.rowId || createEntryId(),
				type: rowElement.querySelector(".forecast-whatif-type")?.value || "expense",
				amount: Number(rowElement.querySelector(".forecast-whatif-amount")?.value || 0),
				date: rowElement.querySelector(".forecast-whatif-date")?.value || "",
				note: String(rowElement.querySelector(".forecast-whatif-note")?.value || "").trim().slice(0, 80)
			};
			rowElement.dataset.rowId = rowData.rowId;

			if (!(rowData.amount > 0 && rowData.date)) {
				showMessage(t("forecastScenarioEmpty"), true);
				return;
			}

			const scenario = ensureActiveScenario(scenarioName);
			const rowIndex = scenario.rows.findIndex((row) => row.rowId === rowData.rowId);
			if (rowIndex >= 0) {
				scenario.rows[rowIndex] = rowData;
				showMessage(t("forecastScenarioUpdated"), false);
			} else {
				scenario.rows.push(rowData);
				showMessage(t("forecastRowSaved"), false);
			}

			scenario.targetDate = forecastTargetDateInput?.value || scenario.targetDate;
			saveForecastScenarios();
			renderScenarioList();
			if (forecastScenarioNameInput) {
				forecastScenarioNameInput.value = "";
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

			return localStorage.getItem(DISPLAY_NAME_KEY) || currentProfile?.nickname || currentProfile?.username || currentUser;
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

			const period = getSelectedPeriod();
			const todayText = toDateInput(new Date());
			const incomes = periodEntries(appState.incomes, period.start, period.end);
			const expenses = periodEntries(appState.expenses, period.start, period.end);

			monthlyIncomeEl.textContent = formatCurrency(sumEntries(incomes));
			monthlyExpenseEl.textContent = formatCurrency(sumEntries(expenses));
			spentToDateEl.textContent = formatCurrency(sumEntries(expenses.filter((item) => item.date <= todayText)));
			monthEndLeftEl.textContent = formatCurrency(sumEntries(incomes) - sumEntries(expenses));

			paintList(incomeList, incomes, "incomes");
			paintList(expenseList, expenses, "expenses");
			renderForecastPlanner();
		}

		function setDefaultForecastDates() {
			const period = getSelectedPeriod();
			forecastTargetDateInput.value = period.end;
		}

		function setDefaultWhatIfRows() {
			whatIfRowsContainer.innerHTML = "";
			appendWhatIfRow({ type: "expense", amount: "", date: forecastTargetDateInput.value || toDateInput(today), note: "", rowId: createEntryId() });
		}

		function appendWhatIfRow(row) {
			const wrapper = document.createElement("div");
			wrapper.className = "grid forecast-grid whatif-row";
			wrapper.dataset.rowId = String(row.rowId || createEntryId());
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
				<div>
					<label>${t("forecastRowNoteLabel")}</label>
					<input type="text" class="forecast-whatif-note" maxlength="80" placeholder="${t("forecastRowNotePlaceholder")}">
				</div>
				<div class="control-action">
					<button type="button" class="secondary" data-action="remove-whatif">${t("forecastRemoveRow")}</button>
				</div>
				<div class="control-action">
					<button type="button" class="btn btn-outline-info" data-action="save-whatif">${t("forecastSaveRow")}</button>
				</div>
			`;

			const typeSelect = wrapper.querySelector(".forecast-whatif-type");
			typeSelect.value = row.type || "expense";
			const noteInput = wrapper.querySelector(".forecast-whatif-note");
			if (noteInput) {
				noteInput.value = String(row.note || "").slice(0, 80);
			}
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
				if (labels[3]) {
					labels[3].textContent = t("forecastRowNoteLabel");
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

				const saveButton = row.querySelector("button[data-action='save-whatif']");
				if (saveButton) {
					saveButton.textContent = t("forecastSaveRow");
				}

				const noteInput = row.querySelector(".forecast-whatif-note");
				if (noteInput) {
					noteInput.setAttribute("placeholder", t("forecastRowNotePlaceholder"));
				}
			});
		}

		function collectWhatIfRows(periodStart, periodEnd) {
			return Array.from(whatIfRowsContainer.querySelectorAll(".whatif-row")).map((row) => {
				const type = row.querySelector(".forecast-whatif-type")?.value || "expense";
				const amount = Number(row.querySelector(".forecast-whatif-amount")?.value || 0);
				const date = row.querySelector(".forecast-whatif-date")?.value || "";
				const note = String(row.querySelector(".forecast-whatif-note")?.value || "").trim().slice(0, 80);
				return {
					type,
					amount,
					date,
					note,
					valid: amount > 0 && Boolean(date) && date >= periodStart && date <= periodEnd
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

			const period = getSelectedPeriod();
			const incomes = periodEntries(appState.incomes, period.start, period.end);
			const expenses = periodEntries(appState.expenses, period.start, period.end);
			let targetDate = forecastTargetDateInput.value || period.end;
			targetDate = clampDateToRange(targetDate, period.start, period.end);
			forecastTargetDateInput.value = targetDate;

			const whatIfRows = collectWhatIfRows(period.start, period.end);
			const baseUntil = sumEntries(incomes.filter((item) => item.date <= targetDate)) - sumEntries(expenses.filter((item) => item.date <= targetDate));
			const adjustmentsUntilTarget = whatIfRows
				.filter((item) => item.valid && item.date <= targetDate)
				.reduce((sum, item) => sum + (item.type === "income" ? item.amount : -item.amount), 0);
			const simulatedUntil = baseUntil + adjustmentsUntilTarget;
			const difference = adjustmentsUntilTarget;

			const monthIncomeTotal = sumEntries(incomes);
			const monthExpenseTotal = sumEntries(expenses);
			const allAdjustmentsInPeriod = whatIfRows
				.filter((item) => item.valid)
				.reduce((sum, item) => sum + (item.type === "income" ? item.amount : -item.amount), 0);
			const monthEndWithWhatIf = monthIncomeTotal - monthExpenseTotal + allAdjustmentsInPeriod;

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

			if (action === "delete") {
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

			appState[collectionName] = appState[collectionName].filter((item) => item.id !== editId);
			saveState();
			resetForm();
			showMessage(t("entryDeleted"), false);
			render();
		}

		async function handleLogout() {
			menuPanel.classList.remove("is-open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
			if (currentUser && currentUser !== GUEST_SESSION_VALUE) {
				await logoutCurrentUser().catch(() => null);
			}
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
				if (deleteAccountConfirmTimer) {
					window.clearTimeout(deleteAccountConfirmTimer);
				}
				deleteAccountConfirmTimer = window.setTimeout(() => {
					resetDeleteAccountConfirmState();
				}, 7000);
				showMessage(t("deleteAccountNeedsSecondClick"), true);
				return;
			}

			resetDeleteAccountConfirmState();

			const email = currentProfile?.email || "";
			try {
				showMessage(appLanguage === "en" ? "Deleting account..." : "Fiók törlése folyamatban...", false);
				await deleteCurrentAccount();
				await shared.sendAccountDeletionEmail(appLanguage, email, currentUser);
				await logoutCurrentUser().catch(() => null);
				shared.setFlashMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
				currentUser = "";
				currentProfile = null;
				localStorage.removeItem(SESSION_KEY);
				localStorage.removeItem(DISPLAY_NAME_KEY);
				showMessage(shared.getDeleteAccountSuccessMessage(appLanguage), false);
				window.setTimeout(() => {
					window.location.href = "index.html";
				}, 500);
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
			if (budgetContent) {
				budgetContent.classList.remove("hidden");
			}
			menuToggle.disabled = false;
		}

		function requireLogin() {
			return Boolean(currentUser);
		}

		function periodEntries(entries, startDate, endDate) {
			return entries.filter((item) => item.date >= startDate && item.date <= endDate);
		}

		function getDateRange(startDate, endDate) {
			if (!startDate || !endDate || startDate <= endDate) {
				return { start: startDate, end: endDate };
			}
			return { start: endDate, end: startDate };
		}

		function getSelectedPeriod() {
			normalizePeriodInputs();
			const fallback = toDateInput(today);
			const start = periodStartInput?.value || fallback;
			const end = periodEndInput?.value || start;
			return getDateRange(start, end);
		}

		function normalizePeriodInputs() {
			if (!periodStartInput || !periodEndInput) {
				return;
			}
			const range = getDateRange(periodStartInput.value, periodEndInput.value);
			if (range.start) {
				periodStartInput.value = range.start;
			}
			if (range.end) {
				periodEndInput.value = range.end;
			}
		}

		function setDefaultPeriodRange(queryMonth) {
			const monthValue = queryMonth && /^\d{4}-\d{2}$/.test(queryMonth) ? queryMonth : toMonthInput(today);
			const start = `${monthValue}-01`;
			const end = getMonthEndDate(monthValue);
			if (periodStartInput) {
				periodStartInput.value = start;
			}
			if (periodEndInput) {
				periodEndInput.value = end;
			}
		}

		function clampDateToRange(dateText, startDate, endDate) {
			if (!dateText || dateText < startDate) {
				return startDate;
			}
			if (dateText > endDate) {
				return endDate;
			}
			return dateText;
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
			authMessage.textContent = String(message || "");
			authMessage.classList.toggle("hidden", !message);
			authMessage.classList.toggle("error", isError);
			authMessage.classList.toggle("ok", !isError);
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

		function applyAuthenticatedState(session) {
			currentUser = String(session?.profile?.username || currentUser || "").trim();
			currentProfile = session?.profile || null;
			if (!currentUser) {
				return;
			}
			localStorage.setItem(SESSION_KEY, currentUser);
		}

		function saveState() {
			if (currentUser === GUEST_SESSION_VALUE) {
				saveGuestData(appState);
				return;
			}

			if (!currentUser) {
				return;
			}

			void saveCurrentUserData(appState)
				.then((savedState) => {
					appState = savedState || appState;
				})
				.catch((error) => {
					showMessage(getFirebaseErrorMessage(error, appLanguage, "save"), true);
				});
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
	}