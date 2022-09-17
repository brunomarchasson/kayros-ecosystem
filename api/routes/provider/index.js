import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import db from '../../core/db';
import providerSchema from '../../schemas/providerSchema';

const router = express.Router();

export const getProvider = async (eanProvider) => {
  const provider = await db.raw(
      `
  SELECT        Ident as id, Nom_Tiers as name, Code_EAN as eanCode, NbEAN as codeCount
  FROM            FPR_TIERS
  WHERE        Code_EAN = :eanProvider
  `,
  {
    eanProvider: eanProvider
  }
    )
    .then((r) => r[0]);
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
    const providers = await db
      .raw(
        `
      SELECT        Ident as id, Nom_Tiers as name, Code_EAN as eanCode, NbEAN as codeCount
      FROM            FPR_TIERS
      WHERE        (Code_EAN IS NOT NULL) AND (LTRIM(Code_EAN) <> '')
      `,
      );
    returns(providers);
  },
);

export default router;
