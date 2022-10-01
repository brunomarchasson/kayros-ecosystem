// import { DBhooks } from "./helper/db";
const sql =require("mssql");
const { sqlConfig } = require("./helper/db");

let transaction;
let request;
beforeAll(async () => {
  // Init the server
  const pool = await sql.connect(sqlConfig).catch(console.error);
  transaction = new sql.Transaction(pool);
  await transaction.begin();
  request = new sql.Request(transaction);
});

afterAll(async () => {
  jest.resetAllMocks();
  jest.resetModules();
  await transaction.rollback();
});
describe("Database", () => {
  it("should query with parameters", async () => {
    // transaction.begin(async () => {

      // Arrange
      // db.input('p', sql.Int, 73).query('SELECT (@p + 5) as res')
      // expect(true).toBe(true)
      const expectedResult = 78;
      // const request = new sql.Request(transaction)
      const result = await request
        .input("p", sql.Int, 73)
        .query("SELECT (@p + 5) as res");
      expect(result.recordset[0]?.res).toBe(expectedResult);
      //  transaction.rollback();
    });
  });
// });
