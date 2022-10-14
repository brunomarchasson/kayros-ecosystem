import controler, { formatArticle } from "./article.controller";
import db from "../core/db";
import { mockRequest, mockResponse } from "../utils/testUtils";
import repository from "../repositories/repository";

jest.mock("../core/db.js");
jest.mock("../repositories/article.repository.js");
// jest.mock("../core/jwt.js");


const mockArticles  =[ {
  id: 1,
  TypeArticle : 'SUP',
  DESIGNATION : "support 1",
  Famille: 'famille 1',
  Sous_Famille : 'sous famille 1',
  TYPE_MAJ : '',
  DATE_MAJ : '',
},  {
  id: 1,
  TypeArticle : 'MAN',
  DESIGNATION : "article 2 1",
  Famille: 'famille 1',
  Sous_Famille : 'sous famille 1',
  TYPE_MAJ : '',
  DATE_MAJ : '',
}]


describe("param Controller", function () {
  describe("getAll", function () {
    it("should return all articles", async () => {
      const res = mockResponse();
      const req = mockRequest();
      repository.article.getAll.mockResolvedValue(mockArticles)

      // db.query.mockResolvedValue({dataset: []})
      // .mockResolvedValueOnce({dataset: mockArticles})

      await controler.getAll(req, res);

      expect(res.sendResult).toHaveBeenCalledWith(mockArticles);
    });

    it("should return articles by type", async () => {
      const res = mockResponse();
      const req = mockRequest(({type: 'SUP'}))

      repository.article.getAll.mockResolvedValue(mockArticles.filter(a => a.type === 'SUP'))

      // db.query.mockResolvedValue([])
      // .mockResolvedValueOnce(mockArticles)

      await controler.getAll(req, res);

      expect(res.sendResult).toHaveBeenCalledWith(mockArticles.filter(a => a.type === 'SUP'));
    });
  });

});
