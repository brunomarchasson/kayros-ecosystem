import tokenControler from "./tokenController";
import db from "../core/db";
import { mockResponse } from "../utils/testUtils";
// import { mockedResponse } from "../utils/testUtils";
import repository from "../repositories/repository";

jest.mock("../core/db.js");
jest.mock("../repositories/userRepository.js");
jest.mock("../core/jwt");

const req = {
  data: {},
  currentUser: {
    type: "X",
    ident: 123,
    rangCorr: 2,
  },
};

describe("token Controller", function () {
  describe("get", function () {
    it("should return current user", async () => {
      const res = mockResponse();

      const repositoryValue = {
        type: "X",
        ident: 123,
        rangCorr: "2",
        email: "toto@toto.com",
        language: "fr",
      };

      repository.user.get.mockResolvedValue(repositoryValue)
      // db.raw.mockResolvedValue([dbResult]);

      await tokenControler.get(req, res);
      expect(repository.user.get).toHaveBeenCalledWith(
        req.currentUser.type,
        req.currentUser.ident,
        req.currentUser.rangCorr,
      )

      expect(res.sendResult).toHaveBeenCalledWith({
        token: "TOKEN",
        success: true,
        user: repositoryValue
      });
    });
    it("should return 400 if user not exists", async () => {
      const res = mockResponse();

      repository.user.get.mockResolvedValue(null)

      await tokenControler.get(req, res);
      expect(res._status).toBe(400);
    });
  });
  describe("login", function () {
    it("should reject if no credentials", async () => {
      const res = mockResponse();
      await tokenControler.login(req, res);
      expect(res._status).toBe(400);
    });
    it("should reject if bad credentials", async () => {
      const res = mockResponse();
      repository.user.get.mockResolvedValue(null)

      await tokenControler.login(
        {
          data: {
            customerId: 111,
            email: "toto@toto.com",
            password: "pwd",
          },
        },
        res,
      );

      expect(res._status).toBe(400);
    });
    it("accept login", async () => {
      const res = mockResponse();

      const repositoryValue = {
        type: "X",
        ident: 123,
        rangCorr: "2",
        email: "toto@toto.com",
        language: "fr",
      };

      repository.user.getWithCreds.mockResolvedValue(repositoryValue)

      const reqData = {
        customerId: 111,
        email: "toto@toto.com",
        password: "pwd",
      };
      // const dbResult = {
      //   Type_Ident_F: "X",
      //   Ident: 123,
      //   Rang_Corr: "2",
      //   Adr_E_Mail: "toto@toto.com",
      // };
      // console.log(repository.user)
      // db.raw.mockResolvedValue([dbResult]);

      await tokenControler.login({ data: reqData }, res);

      expect(repository.user.getWithCreds).toHaveBeenCalledWith(
        reqData.customerId,
        reqData.email,
        reqData.password,
      )

      // expect(db.raw).toHaveBeenCalledWith(expect.anything(), {
      //   ident: reqData.customerId,
      //   email: reqData.email,
      //   pwd: reqData.password,
      // });
      expect(res.sendResult).toHaveBeenCalledWith({
        token: "TOKEN",
        success: true,
        user: repositoryValue,
      });
    });
    it("should return 400 if user not exists current user", async () => {
      const res = mockResponse();
      db.raw.mockResolvedValue([]);

      await tokenControler.get(req, res);
      expect(res._status).toBe(400);
    });
  });
});
