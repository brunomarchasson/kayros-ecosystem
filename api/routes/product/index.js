import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import db from '../../core/db';
import productSchema from '../../schemas/productSchema';
const router = express.Router();

export const getProduct = async (productCode) => {
  return db.raw(
    `
  SELECT   Code_EAN+CodeEPSMA as eanCode, Désignation as name,Identifiant as id
  FROM K_30  K
  LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
  where Code_EAN+CodeEPSMA = :productCode
`,{
  productCode: productCode.substring(0,12)
}
  )
    .then((r) => r[0]);
};

registerApi(
  {
    router,
    route: '/:productCode',
    method: 'get',
    description: 'List providers',
    params: schema().object({
      productCode: schema().string().description('product code'),
    }),
    returns: productSchema,
  },
  async (data, returns, { res }) => {
    const product = await getProduct(data.productCode);
    if (!product) return res.status(404).end();
    returns(product);
  },
);

registerApi(
  {
    router,
    route: '/:productCode/seq/:id',
    method: 'post',
    description: 'set product code to product id',
    params: schema().object({
      productCode: schema().string().required().description('product code'),
      seq: schema().string().required().description('product id'),
    }),
    returns: productSchema,
  },
  async (data, returns, { res }) => {
    await db
      .raw(
        `
        UPDATE K_30 SET CodeEPSMA=:productCode
        FROM K_30  K
        LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
        where T.Code_EAN =:EANCode AND K.Id = :idProduct+'.'+cast(T.Ident as varchar)
      `,{
        productCode: data.productCode.substring(6, 12),
        EANCode: data.productCode.substring(0, 6),
        idProduct :data.producrID,
      }
      )
      .then((r) => r[0]);

    const product = await getProduct(data.productCode);
    if (!product) return res.status(404).end();
    returns(product);
  },
);
export default router;
