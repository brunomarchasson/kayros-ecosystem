import request from "supertest";
import server from '../server';
import tokenControler from '../controlers/tokenControler';

  
// import y'../controlers/tokenControler'
// jest.mock('../controlers/tokenControler');
jest.mock('../middleware/authJWT');
jest.mock('../controlers/tokenControler')
jest.mock('../database/database-layer')

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
    expect(tokenControler.get).toHaveBeenCalled();
  });
  it("shoult respond POST", async () => {
    const response = await request(server)
    .post(`/api/login`).send({
      email: 'toto@toto.com',
      password: 'passwd',
    })
    .expect(200);
    expect(tokenControler.login).toHaveBeenCalled();
  });
  it("shoult be user and password in POST", async () => {
    const response = await request(server)
    .post(`/api/login`)
    .expect(400);
    expect(tokenControler.login).not.toHaveBeenCalled();
  });
 
});
