import express from 'express';
import { registerApi, schema } from '../apiExplorer';
import db from '../core/db';

// TODO Inventory date
// TODO roll suppliers

const router = express.Router();
registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'List application parameters',
    returns: schema().object({
      PROJECT_STEPS: schema().object(),
      PROJECT_STATUS: schema().object(),
    }),
  },
  async (data, returns) => {
    const gpaoParams = await db
      .query('SELECT * FROM TAB_GPAO_PARAM')
      .then((r) => r.recordset[0]);
    const socParams = await db
      .query('SELECT DATE_INVENTAIRE,INVENTAIRE_TERMINE FROM TAB_GEN_SOC')
      .then((r) => r.recordset[0]);

    console.log('rrrrrr', socParams);
    console.log(socParams.DATE_INVENTAIRE);
    console.log(socParams.DATE_INVENTAIRE?.getTime?.());
    const params = {
      isGpao: gpaoParams.TOP_GESTION_GPAO,
      minRollLength: gpaoParams.LONGUEUR_MIN_BOB,
      localisationManagment: gpaoParams.TOP_GESTION_LOCALISATION,
      inventoryPassword: gpaoParams.MDP_INVENTAIRE,
      inventoryDate: socParams.DATE_INVENTAIRE?.getTime?.(),
      inventoryClosed: socParams.INVENTAIRE_TERMINE,
    };

    returns(params);
  },
);

export default router;
