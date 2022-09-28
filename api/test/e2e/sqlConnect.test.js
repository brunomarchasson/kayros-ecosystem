import db from "../../core/db";

describe("Database", () => {
  beforeAll(() => {});
  it("should query with parameters", async () => {
    // Arrange
    const query = "SELECT (:p + 5) as res";
    const params = { p: 73 };

    const expectedResult = 78;

    const result = await db.raw(query, params);

    expect(result[0]?.res).toBe(expectedResult);
  });
});
