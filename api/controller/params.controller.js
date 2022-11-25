import db from "../core/db/index.js";


const get = async (req, res) => {
  const gpaoParams = await db
    .query('SELECT * FROM TAB_GPAO_PARAM')
    .then((r) => r.recordset[0]);
  const socParams = await db
    .query('SELECT DATE_INVENTAIRE,INVENTAIRE_TERMINE FROM TAB_GEN_SOC')
    .then((r) => r.recordset[0]);

  const params = {
    isGpao: gpaoParams.TOP_GESTION_GPAO,
    minRollLength: gpaoParams.LONGUEUR_MIN_BOB,
    localisationManagment: gpaoParams.TOP_GESTION_LOCALISATION,
    inventoryPassword: gpaoParams.MDP_INVENTAIRE,
    inventoryDate: socParams.DATE_INVENTAIRE?.getTime?.(),
    inventoryClosed: socParams.INVENTAIRE_TERMINE,
  };

  res.sendResult(params);
};


export default {
  get,
};
