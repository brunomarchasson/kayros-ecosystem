import mockControler from "../../utils/testUtils/controler";
import request from "supertest";
import server from '../../server';
import articlesController from '../../controller/article.controller';

jest.mock('../../core/db')
jest.mock('../../middleware/authJWT');
jest.mock('../../controller/article.controller', () => mockControler());

describe("artices routes", () => {
  it("shoult respond to GET ALL", async () => {
    const response = await request(server)
    .get(`/api/article`)
    .expect(200);
    expect(response).toHaveProperty("body");
    expect(articlesController.getAll).toHaveBeenCalled();
  });
  it("shoult not respond GET", async () => {
    const response = await request(server)
    .get(`/api/article/12`)
    .expect(200);
    expect(response).toHaveProperty("body");
    expect(articlesController.get).toHaveBeenCalled();
  });
});
