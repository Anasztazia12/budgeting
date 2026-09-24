// Load the real browser script with minimal globals instead of testing copies of its functions.
function createStorage() {
	const data = new Map();
	return {
		getItem: (key) => (data.has(key) ? data.get(key) : null),
		setItem: (key, value) => data.set(key, String(value)),
		removeItem: (key) => data.delete(key)
	};
}

global.window = global;
global.document = { addEventListener() {} };
global.localStorage = createStorage();
global.sessionStorage = createStorage();
require("../assets/js/app-shared.js");
const shared = global.BudgetAppShared;

describe("sumEntries", () => {
	test("adds numeric and numeric-string amounts", () => {
		expect(shared.sumEntries([{ amount: 100 }, { amount: "50.5" }, { amount: 0 }])).toBeCloseTo(150.5);
	});

	test("treats missing amounts and non-arrays as zero", () => {
		expect(shared.sumEntries([{}, null])).toBe(0);
		expect(shared.sumEntries(null)).toBe(0);
	});
});

describe("getMonthEndDate", () => {
	test("returns the last day of the month", () => {
		expect(shared.getMonthEndDate("2026-01")).toBe("2026-01-31");
		expect(shared.getMonthEndDate("2026-04")).toBe("2026-04-30");
	});

	test("handles February in leap and non-leap years", () => {
		expect(shared.getMonthEndDate("2024-02")).toBe("2024-02-29");
		expect(shared.getMonthEndDate("2026-02")).toBe("2026-02-28");
	});
});

describe("monthEntries", () => {
	test("keeps only entries in the given month", () => {
		const entries = [{ date: "2026-03-01" }, { date: "2026-03-31" }, { date: "2026-04-01" }];
		expect(shared.monthEntries(entries, "2026-03")).toHaveLength(2);
	});
});

describe("guest data", () => {
	test("round-trips and normalizes missing lists", () => {
		shared.saveGuestData({ incomes: [{ amount: 1 }] });
		expect(shared.loadGuestData()).toEqual({ incomes: [{ amount: 1 }], expenses: [] });
	});
});

describe("per-user local data keys", () => {
	test("guests use sessionStorage, users use localStorage", () => {
		expect(shared.getUserStorage(shared.GUEST_SESSION_VALUE)).toBe(global.sessionStorage);
		expect(shared.getUserStorage("anna")).toBe(global.localStorage);
	});

	test("renaming a user moves their debts and plans", () => {
		localStorage.setItem(shared.getDebtsKey("old"), "[1]");
		localStorage.setItem(shared.getForecastScenariosKey("old"), "[2]");
		shared.renameUserLocalData("old", "new");
		expect(localStorage.getItem(shared.getDebtsKey("new"))).toBe("[1]");
		expect(localStorage.getItem(shared.getForecastScenariosKey("new"))).toBe("[2]");
		expect(localStorage.getItem(shared.getDebtsKey("old"))).toBeNull();
	});
});

describe("entriesInRange (budget / summary / forecast totals)", () => {
	const salary = { id: "s", amount: 1000, date: "2026-01-15", repeatMonthly: true, excludedMonths: [] };
	const rent = { id: "r", amount: 400, date: "2026-01-31", repeatMonthly: true, excludedMonths: ["2026-03"] };
	const oneOff = { id: "o", amount: 50, date: "2026-02-10" };

	test("a recurring entry appears once in every month from its start date", () => {
		const result = shared.entriesInRange([salary], "2026-01-01", "2026-06-30");
		expect(result.map((e) => e.date)).toEqual([
			"2026-01-15", "2026-02-15", "2026-03-15", "2026-04-15", "2026-05-15", "2026-06-15"
		]);
		expect(shared.sumEntries(result)).toBe(6000);
	});

	test("does not appear before its start date", () => {
		expect(shared.entriesInRange([salary], "2025-10-01", "2025-12-31")).toEqual([]);
	});

	test("the 31st is moved to the last day of shorter months", () => {
		const dates = shared.entriesInRange([rent], "2026-02-01", "2026-04-30").map((e) => e.date);
		expect(dates).toEqual(["2026-02-28", "2026-04-30"]);
	});

	test("months deleted with 'only this month' are skipped", () => {
		const result = shared.entriesInRange([rent], "2026-03-01", "2026-03-31");
		expect(result).toEqual([]);
	});

	test("one-off entries are counted only on their date", () => {
		expect(shared.sumEntries(shared.entriesInRange([oneOff], "2026-02-01", "2026-02-28"))).toBe(50);
		expect(shared.sumEntries(shared.entriesInRange([oneOff], "2026-03-01", "2026-03-31"))).toBe(0);
	});

	test("period balance: income minus expenses in a month", () => {
		const incomes = shared.entriesInRange([salary], "2026-02-01", "2026-02-28");
		const expenses = shared.entriesInRange([rent, oneOff], "2026-02-01", "2026-02-28");
		expect(shared.sumEntries(incomes) - shared.sumEntries(expenses)).toBe(550);
	});

	test("period boundaries are inclusive", () => {
		const result = shared.entriesInRange([salary], "2026-02-15", "2026-03-15");
		expect(result.map((e) => e.date)).toEqual(["2026-02-15", "2026-03-15"]);
	});

	test("the original entries are not modified", () => {
		shared.entriesInRange([salary], "2026-01-01", "2026-12-31");
		expect(salary.date).toBe("2026-01-15");
	});
});

describe("computeForecastTotals (what-if)", () => {
	test("adds planned income and subtracts planned expenses", () => {
		const totals = shared.computeForecastTotals(
			[{ amount: 1000 }],
			[{ amount: 400 }],
			[{ type: "expense", amount: 250 }, { type: "income", amount: 100 }]
		);
		expect(totals).toEqual({ baseBalance: 600, difference: -150, plannedBalance: 450 });
	});

	test("without planned rows the balance is unchanged", () => {
		expect(shared.computeForecastTotals([{ amount: 10 }], [], [])).toEqual({ baseBalance: 10, difference: 0, plannedBalance: 10 });
	});

	test("decimal amounts", () => {
		const totals = shared.computeForecastTotals([{ amount: 0.1 }, { amount: 0.2 }], [], []);
		expect(totals.baseBalance).toBeCloseTo(0.3);
	});
});

describe("buildDebtPaymentSchedule (debt -> forecast)", () => {
	test("monthly payments until the remaining amount is paid, last one smaller", () => {
		const schedule = shared.buildDebtPaymentSchedule({
			monthlyPayment: 100, paymentDate: "2026-01-10", remainingAmount: 250
		});
		expect(schedule).toEqual([
			{ date: "2026-01-10", amount: 100, note: "" },
			{ date: "2026-02-10", amount: 100, note: "" },
			{ date: "2026-03-10", amount: 50, note: "" }
		]);
	});

	test("stops at the due date", () => {
		const schedule = shared.buildDebtPaymentSchedule({
			monthlyPayment: 100, paymentDate: "2026-01-10", remainingAmount: 1000, dueDate: "2026-03-01"
		});
		expect(schedule.map((p) => p.date)).toEqual(["2026-01-10", "2026-02-10"]);
	});

	test("an early payment reduces the following monthly payments", () => {
		const schedule = shared.buildDebtPaymentSchedule({
			monthlyPayment: 100, paymentDate: "2026-01-10", remainingAmount: 500,
			earlyPaymentDate: "2026-02-01", plannedAmount: 300
		});
		expect(schedule).toEqual([
			{ date: "2026-01-10", amount: 100, note: "" },
			{ date: "2026-02-01", amount: 300, note: "early" },
			{ date: "2026-02-10", amount: 100, note: "" }
		]);
		expect(shared.sumEntries(schedule)).toBe(500);
	});

	test("total paid never exceeds the remaining amount", () => {
		const schedule = shared.buildDebtPaymentSchedule({
			monthlyPayment: 333.33, paymentDate: "2026-01-31", remainingAmount: 1000
		});
		expect(shared.sumEntries(schedule)).toBeCloseTo(1000);
		expect(schedule[1].date).toBe("2026-02-28");
	});

	test("no payment date gives no rows", () => {
		expect(shared.buildDebtPaymentSchedule({ monthlyPayment: 100, remainingAmount: 100 })).toEqual([]);
	});
});
