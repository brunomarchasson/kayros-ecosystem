import paramControler from "./params.controller";
import db from "../core/db";
import { mockResponse } from "../utils/testUtils";

jest.mock("../core/db.js");
// jest.mock("../core/jwt.js");


const gpaoParams = {
  TOP_GESTION_GPAO: true,
  LONGUEUR_MIN_BOB: 2000,
  TOP_GESTION_LOCALISATION: true,
  MDP_INVENTAIRE: "1234"
}
const socParams = {
  DATE_INVENTAIRE : new Date('01/01/2022'),
  INVENTAIRE_TERMINE: true
}
describe("param Controller", function () {
  describe("get", function () {
    it("should return params", async () => {
      const res = mockResponse();

      db.query.mockResolvedValue({recordset: []})
      .mockResolvedValueOnce({recordset: [gpaoParams]})
      .mockResolvedValueOnce({recordset: [socParams]});

      await paramControler.get(null, res);

      expect(res.sendResult).toHaveBeenCalledWith({
        isGpao: gpaoParams.TOP_GESTION_GPAO,
    minRollLength: gpaoParams.LONGUEUR_MIN_BOB,
    localisationManagment: gpaoParams.TOP_GESTION_LOCALISATION,
    inventoryPassword: gpaoParams.MDP_INVENTAIRE,
    inventoryDate: socParams.DATE_INVENTAIRE?.getTime?.(),
    inventoryClosed: socParams.INVENTAIRE_TERMINE,
      });
    });
  });

});
