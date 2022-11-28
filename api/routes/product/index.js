import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import db from '../../core/db';
import productSchema from '../../schemas/productSchema';
const router = express.Router();

export const getProduct = async (productCode) => {
  return db.request().input('productCode', productCode.substring(0, 12))
    .query(`
  SELECT   Code_EAN+CodeEPSMA as eanCode, Désignation as name,Identifiant as id
  FROM K_30  K
  LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
  where Code_EAN+CodeEPSMA = @productCode
`).then(r => r?.recordset?.[0])
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
  async (req, res) => {
    const { data } = req
    const product = await getProduct(data.productCode);
    if (!product) return res.status(404).end();
    res.sendResult(product);
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
  async (dreq, res) => {
    const { data } = req
    await db
      .input('productCode', data.productCode.substring(6, 12))
      .input('EANCode', data.productCode.substring(0, 6))
      .input('idProduct', data.producrID)
      .query(
        `
        UPDATE K_30 SET CodeEPSMA=@productCode
        FROM K_30  K
        LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
        where T.Code_EAN =@EANCode AND K.Id = @idProduct+'.'+cast(T.Ident as varchar)
      `
      )
      .then((r) => r.recordset[0]);

    const product = await getProduct(data.productCode);
    if (!product) return res.status(404).end();
    res.sendResult(product);
  },
);
export default router;
