import controler, { formatArticle } from "./article.controller";
import db from "../core/db";
import { mockRequest, mockResponse } from "../utils/testUtils";

jest.mock("../core/db.js");
// jest.mock("../core/jwt.js");


const mockArticles  =[ {
  id: 1,
  TypeArticle : 'SUP',
  DESIGNATION : "support 1",
  Famille: 'famille 1',
  Sous_Famille : 'sous famille 1',
  TYPE_MAJ : '',
  DATE_MAJ : '',
}]


describe("param Controller", function () {
  describe("getAll", function () {
    it("should return all articles", async () => {
      const res = mockResponse();
      const req = mockRequest()
      db.raw.mockResolvedValue([])
      .mockResolvedValueOnce(mockArticles)

      await controler.getAll(req, res);

      expect(res.sendResult).toHaveBeenCalledWith(mockArticles.map(formatArticle));
    });
    it("should return articles by type", async () => {
      const res = mockResponse();
      const req = mockRequest(({type: 'SUP'}))
      db.raw.mockResolvedValue([])
      .mockResolvedValueOnce(mockArticles)

      await controler.getAll(req, res);

      expect(res.sendResult).toHaveBeenCalledWith(mockArticles.map(formatArticle));
    });
  });

});
