import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import sql from '../../database/database-layer';
import providerSchema from '../../schemas/providerSchema';
import rollSchema from '../../schemas/rollSchema';

const router = express.Router();

export const getProvider = async (eanProvider) => {
  const request = new sql.Request();
  console.log(eanProvider)
  request.input('eanProvider', sql.VarChar, eanProvider);

  const provider = await request
    .query(
      `
  SELECT        Ident as id, Nom_Tiers as name, Code_EAN as eanCode, NbEAN as codeCount
  FROM            FPR_TIERS
  WHERE        Code_EAN = @eanProvider
  `,
    )
    .then((r) => r.recordset[0]);
  return provider;
};

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'List providers',
    returns: schema().array(providerSchema),
  },
  async (data, returns) => {
    const request = new sql.Request();

    const providers = await request
      .query(
        `
      SELECT        Ident as id, Nom_Tiers as name, Code_EAN as eanCode, NbEAN as codeCount
      FROM            FPR_TIERS
      WHERE        (Code_EAN IS NOT NULL) AND (LTRIM(Code_EAN) <> '')
      `,
      )
      .then((r) => r.recordset);
    returns(providers);
  },
);

export default router;
