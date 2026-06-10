function safeParseObject(raw) {
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : null;
	} catch (_error) {
		return null;
	}
}

function normalizeEntriesData(data) {
	return {
		incomes: Array.isArray(data && data.incomes) ? data.incomes : [],
		expenses: Array.isArray(data && data.expenses) ? data.expenses : []
	};
}

describe("safeParseObject", () => {
	test("returns a valid JSON object", () => {
		expect(safeParseObject('{"a":1}')).toEqual({ a: 1 });
	});

	test("returns null for empty input", () => {
		expect(safeParseObject(null)).toBeNull();
		expect(safeParseObject("")).toBeNull();
	});

	test("returns null for invalid JSON", () => {
		expect(safeParseObject("not json")).toBeNull();
	});

	test("returns null if value is not an object", () => {
		expect(safeParseObject("42")).toBeNull();
	});
});

describe("normalizeEntriesData", () => {
	test("keeps incomes and expenses when they are arrays", () => {
		const data = { incomes: [1, 2], expenses: [3] };
		expect(normalizeEntriesData(data)).toEqual({ incomes: [1, 2], expenses: [3] });
	});

	test("returns empty arrays for missing fields", () => {
		expect(normalizeEntriesData({})).toEqual({ incomes: [], expenses: [] });
		expect(normalizeEntriesData(null)).toEqual({ incomes: [], expenses: [] });
	});
});
