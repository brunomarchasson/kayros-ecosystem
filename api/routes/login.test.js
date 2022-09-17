import request from "supertest";
import server from '../server';
import tokenController from '../controlers/tokenControler';

jest.mock('../core/db')
jest.mock('../middleware/authJWT');
jest.mock('../controlers/tokenControler')

const user= {
    id: 123,
    email: "user@email.com",
    language: "userlang",

}
const authData = {
  user: user,
  success: true,
  token: "TOKEN",
}
afterEach(() => {
  jest.clearAllMocks();
});
describe("login routes", () => {
  it("shoult respond to GET", async () => {
    const response = await request(server)
    .get(`/api/login`)
    .expect(200);
    expect(response).toHaveProperty("body",authData);
    expect(tokenController.get).toHaveBeenCalled();
  });
  it("shoult respond POST", async () => {
    await request(server)
    .post(`/api/login`).send({
      email: 'toto@toto.com',
      password: 'passwd',
    })
    .expect(200);
    expect(tokenController.login).toHaveBeenCalled();
  });
  it("shoult be user and password in POST", async () => {
    await request(server)
    .post(`/api/login`)
    .expect(400);
    expect(tokenController.login).not.toHaveBeenCalled();
  });

});
