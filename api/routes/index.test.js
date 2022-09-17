import request from "supertest";
import server from '../server';

jest.mock('../core/db')

describe("API discover", () => {

  it("should respond to GET", async () => {
    const response = await request(server)
    .get(`/api/hello`)
    .expect(200);
  expect(response).toHaveProperty("body",{
    url: process.env.API_ORIGIN
  });
  });
  it("should not respond to POST", async () => {
    await request(server)
    .post(`/api/hello`)
    .expect(404);

  });
});
