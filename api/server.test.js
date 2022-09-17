import request from "supertest";
import server from './server';
jest.mock('./core/db')

// jest.mock('./database/database-layer')

describe("API is alive", () => {
  it("shoult respond to query", async () => {
    const response = await request(server)
    .get(`/hello`)
    .expect(200);
  expect(response).toHaveProperty("text","HELLO WORLD FROM API!");
  });

});
