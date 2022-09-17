import mockControler from "../utils/testUtils/controler";
import request from "supertest";
import server from '../server';
import paramsController from '../controller/params.controller';

jest.mock('../core/db')
jest.mock('../middleware/authJWT');
jest.mock('../controller/params.controller', () => mockControler());

describe("params routes", () => {
  it("shoult respond to GET", async () => {
    const response = await request(server)
    .get(`/api/params`)
    .expect(200);
    expect(response).toHaveProperty("body");
    expect(paramsController.get).toHaveBeenCalled();
  });
  it("shoult not respond POST", async () => {
    await request(server)
    .post(`/api/params`).send()
    .expect(404);
  });
});
