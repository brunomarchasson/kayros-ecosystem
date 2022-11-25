import express from 'express';
import { registerApi, schema } from '../../../apiExplorer';
import db from '../../../core/db';
import sql from 'mssql';

// const util = require('util');

const router = express.Router();

const productSchema = schema().object({
  id: schema().string().required().description('EAN Séq bob'),
  eanCode: schema().string().required().description('product code'),
  name: schema().string().required().description('product name'),
});


export const getProduct = async (productCode) => {
  console.log('rrr',productCode)
  return db.request()
  .input('productCode', sql.VarChar, productCode.substring(0, 12))
  .query(
    `
  SELECT   Code_EAN+CodeEPSMA as eanCode, Désignation as name,Identifiant as id
  FROM K_30  K WITH(NOLOCK)
  LEFT JOIN FPR_TIERS T WITH(NOLOCK) ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
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
  async (req, res) => {
    const {data} = req;
    console.log('productCode', data.productCode)
    const product = await getProduct(data.productCode);
    console.log('get', product)
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
      id: schema().string().required().description('product id'),
    }),
    returns: productSchema,
  },
  async (req, res) => {
    const {data} = req;
    console.log('rr', data)
    const product = await getProduct(data.productCode);
    console.log('ttt', product)
    //if (!product) return res.status(404).end();
    console.log('rr2', product)

    const request = db.request();
    console.log('ddd');
    request.input('productCode', sql.VarChar, data.productCode.substring(6, 12));
    request.input('EANCode', sql.VarChar, data.productCode.substring(0, 6));
    request.input('idProduct', sql.VarChar, data.id);
    console.log(data.productCode.substring(6, 12));
    console.log(data.productCode.substring(0, 6));
    console.log(data.id);
    await request
      .query(
        `
        UPDATE K_30
        SET CodeEPSMA=@productCode
        FROM K_30  K
        LEFT JOIN FPR_TIERS T ON cast(T.Ident as varchar) = reverse(left(reverse([Identifiant]), charindex('.', reverse([Identifiant])) - 1))
        where T.Code_EAN =@EANCode AND K.identifiant = @idProduct+'.'+cast(T.Ident as varchar)
      `,
      );
    console.log('rr')
    const newProduct = await getProduct(data.productCode);
    res.sendResult(newProduct);
  },
);
export default router;
