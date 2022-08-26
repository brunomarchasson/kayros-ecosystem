import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import sql from '../../database/database-layer';
import productSchema from '../../schemas/productSchema';
import providerSchema from '../../schemas/providerSchema';
const router = express.Router();

export const getProduct = async (productCode) => {
  console.log(productCode);
  const request = new sql.Request();
  request.input('productCode', sql.VarChar, productCode.substring(0,12));
  return request.query(
    `
  SELECT   Code_EAN+CodeEPSMA as eanCode, Désignation as name,Identifiant as id
  FROM K_30  K
  LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
  where Code_EAN+CodeEPSMA = @productCode
`,
  )
    .then((r) => r?.recordset[0]);
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
    const request = new sql.Request();

    request.input('productCode', sql.VarChar, data.productCode.substring(6, 12));
    request.input('EANCode', sql.VarChar, data.productCode.substring(0, 6));
    request.input('idProduct', sql.VarChar, data.producrID);

    await request
      .query(
        `
        UPDATE K_30 SET CodeEPSMA=@productCode
        FROM K_30  K
        LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
        where T.Code_EAN =@EANCode AND K.Id = @idProduce+'.'+cast(T.Ident as varchar)
      `,
      )
      .then((r) => r?.recordset[0]);

    const product = await getProduct(data.productCode);
    if (!product) return res.status(404).end();
    returns(product);
  },
);
export default router;
