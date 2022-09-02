import request from "supertest";
import server from '../server';

jest.mock('../database/database-layer')

describe("API discover", () => {
  it("shoult respond to GET", async () => {
    const response = await request(server)
    .get(`/api/hello`)
    .expect(200);
  expect(response).toHaveProperty("body",{
    url: process.env.API_ORIGIN
  });
  });
  it("shoult not respond to POST", async () => {
    const response = await request(server)
    .post(`/api/hello`)
    .expect(404);
 
  });
});
