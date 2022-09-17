import tokenControler from "./tokenController";
import db from "../core/db";
import { mockedResponse } from "../utils/testUtils";

jest.mock("../core/db.js");
jest.mock("../core/jwt.js");

const req = {
  data: {},
  currentUser: {
    // for testing create vehicle
    type: "X",
    ident: 123,
    rangCorr: 2,
  },
};

describe("token Controller", function () {
  describe("get", function () {
    it("should return current user", async () => {
      const res = mockedResponse();

      const dbResult = {
        Type_Ident_F: "X",
        Ident: 123,
        Rang_Corr: "2",
        Adr_E_Mail: "toto@toto.com",
      };
      db.raw.mockResolvedValue([dbResult]);

      await tokenControler.get(req, res);

      expect(db.raw).toHaveBeenCalledWith(expect.anything(), {
        // for testing create vehicle
        type: "X",
        ident: 123,
        rang: 2,
      });
      expect(res.sendResult).toHaveBeenCalledWith({
        token: "TOKEN",
        success: true,
        user: {
          type: dbResult.Type_Ident_F,
          ident: dbResult.Ident,
          rangCorr: dbResult.Rang_Corr,
          email: dbResult.Adr_E_Mail,
          language: "fr",
        },
      });
    });
    it("should return 400 if user not existscurrent user", async () => {
      const res = mockedResponse();
      db.raw.mockResolvedValue([]);

      await tokenControler.get(req, res);
      expect(res._status).toBe(400);
    });
  });
  describe("login", function () {
    it("should reject if no credentials", async () => {
      const res = mockedResponse();
      await tokenControler.login(req, res);
      expect(res._status).toBe(400);
    });
    it("should reject if bad credentials", async () => {
      const res = mockedResponse();
      db.raw.mockResolvedValue([]);

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
      const res = mockedResponse();

      const reqData = {
        customerId: 111,
        email: "toto@toto.com",
        password: "pwd",
      };
      const dbResult = {
        Type_Ident_F: "X",
        Ident: 123,
        Rang_Corr: "2",
        Adr_E_Mail: "toto@toto.com",
      };
      db.raw.mockResolvedValue([dbResult]);

      await tokenControler.login({ data: reqData }, res);

      expect(db.raw).toHaveBeenCalledWith(expect.anything(), {
        ident: reqData.customerId,
        email: reqData.email,
        pwd: reqData.password,
      });
      expect(res.sendResult).toHaveBeenCalledWith({
        token: "TOKEN",
        success: true,
        user: {
          type: dbResult.Type_Ident_F,
          ident: dbResult.Ident,
          rangCorr: dbResult.Rang_Corr,
          email: dbResult.Adr_E_Mail,
          language: "fr",
        },
      });
    });
    it("should return 400 if user not exists current user", async () => {
      const res = mockedResponse();
      db.raw.mockResolvedValue([]);

      await tokenControler.get(req, res);
      expect(res._status).toBe(400);
    });
  });
});
