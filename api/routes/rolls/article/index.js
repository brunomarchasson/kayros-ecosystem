import express from 'express';
import { registerApi, schema } from '../../../apiExplorer';
import db from '../../../core/db';
import sql from 'mssql';

const articleSchema = schema().object({
  id: schema().number().required().description('EAN Séq bob'),
  label: schema().string().required().description('EAN Séq bob'),
  providers: schema().array(
    schema().object({
      id: schema().number().required().description('provider id'),
      name: schema().string().required().description('provider name'),
      articleCode: schema()
        .string()
        .required()
        .description("provider's product code"),
    }),
  ),
  stock: schema()
    .object()
    .required()
    .description('stock '),
});


const router = express.Router();

const getCurrentStock = async (articleId) => {
  return db.request().input('articleId', sql.Int, articleId).query(`
    SELECT coalesce(cast( SUM(
    CASE Type_Cde WHEN 'M+' THEN Quantité ELSE CASE Type_Cde WHEN 'M-' THEN (Quantité * -1) ELSE
    CASE Type_Cde WHEN 'V-' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'V+' THEN Quantité ELSE
    CASE Type_Cde WHEN 'LC' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'LF' THEN Quantité ELSE
    CASE Type_Cde WHEN 'RC' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'RF' THEN Quantité
    END END END END END END END END) as int),0) AS STK
    FROM F_LIGNES_STK WITH(NOLOCK)
    WHERE Ident_Site = 'SIEGE' AND Séq_Article = @articleId AND Quantité <> 0
    AND Top_Défectueux = 0
 `).then((r) => r?.recordset[0].STK);
};

const getInventoryStock = async (articleId) => {
  return db.request().input('articleId', sql.Int, articleId).query(`
    SELECT coalesce(cast( SUM(
    CASE Type_Cde WHEN 'M+' THEN Quantité ELSE CASE Type_Cde WHEN 'M-' THEN (Quantité * -1) ELSE
    CASE Type_Cde WHEN 'V-' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'V+' THEN Quantité ELSE
    CASE Type_Cde WHEN 'LC' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'LF' THEN Quantité ELSE
    CASE Type_Cde WHEN 'RC' THEN (Quantité * -1) ELSE CASE Type_Cde WHEN 'RF' THEN Quantité
    END END END END END END END END) as int),0) AS STK
    FROM F_LIGNES_STK WITH(NOLOCK)
    CROSS JOIN TAB_GEN_SOC
    WHERE Ident_Site = 'SIEGE' AND Séq_Article = @articleId AND Quantité <> 0
    AND Top_Défectueux = 0 AND Date_Livr_Confirmée <= DATE_INVENTAIRE
 `).then((r) => r?.recordset[0].STK);
};

export const getStock = async (articleId) => {
  db.request().input('articleId', sql.Int, articleId);
  const inventoryStock = await getInventoryStock(articleId);
  const currentStock = await getCurrentStock(articleId);
  return {
    inventoryStock,
    currentStock,
  };
};

export const getArticle = async (articleId) => {
  const request = db.request();
  request.input('articleId', sql.Int, articleId);

  const article = await request.query(`
    SELECT SEQ_ARTICLE as id, DESIGNATION as label FROM TAB_ARTICLES A WHERE SEQ_ARTICLE = @articleId
  `).then((r) => r?.recordset[0]);
  if (!article) {
    return null;
  }
  const providers = await request.query(`
    SELECT T.Ident as id, Nom_Tiers as name, coalesce(Référence, '') as articleCode
    FROM FDCT_ARTICLES F
    LEFT JOIN FPR_TIERS T ON F.Type_Ident_F = 'T' AND T.Ident = F.Ident
    WHERE F.Type_Ident_F = 'T' AND Séq_Article = @articleId
  `).then((r) => r?.recordset);
  const stock = await getStock(articleId);

  article.providers = providers;
  article.stock = stock;
  return article;
};

registerApi(
  {
    router,
    route: '/:articleId',
    method: 'get',
    description: 'get Article',
    params: schema().object({
      articleId: schema().string().description('acticle id'),
    }),
    returns: articleSchema,
  },
  async (req,res) => {
    try {
      const {data} = req
      const article = await getArticle(data.articleId);

      if (!article) {
        res.status(404).end();
        return;
      }

      res.sendResult(article);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      res.status(500).end();
    }
  },
);

registerApi(
  {
    router,
    route: '/:articleId/stock/:newStk',
    method: 'post',
    description: 'set article stock',
    params: schema().object({
      articleId: schema().number().required().description('article id'),
      newStk: schema().number().required().description('new stock at inventory date'),
    }),
    returns: articleSchema,
  },
  async (req, res) => {
    try {
      const {data} = req;
      const request = db.request();
      const article = await getArticle(data.articleId);
      if (!article) {
        res.status(404).end();
        return;
      }
      const { companyCode, inventoryDate } = await request.query(`
    SELECT CODE_SOC as companyCode, DATE_INVENTAIRE as inventoryDate FROM TAB_GEN_SOC
    `).then((r) => r?.recordset?.[0]);
      const mv = article.stock.inventoryStock - data.newStk;
      const mvType = mv > 0 ? 'M-' : 'M+';
      request.input('articleId', sql.Int, data.articleId);
      request.input('type', sql.VarChar, mvType);
      const indice = await request.query(`
    SELECT coalesce(MAX(Numéro_Cde), 0)+1 AS indice FROM F_LIGNES_STK WITH(NOLOCK) WHERE Type_Cde=@type
    `).then((r) => r?.recordset?.[0]?.indice);

      request.input('companyCode', sql.VarChar, companyCode);
      request.input('indice', sql.Int, indice);
      request.input('value', sql.Int, Math.abs(mv));
      request.input('inventoryDate', sql.Date, inventoryDate);

      await request.query(`
    INSERT INTO F_LIGNES_STK (
        Code_Société,Type_Cde,Numéro_Cde,Indice_Cde,Indice_Ligne,Indice_Livraison,Ident_Site,Séq_Article,
        Quantité,Prix,Remise,Date_Livr_Confirmée,Poids,Mt_Suppléments,Numéro_BL,Ident_Représentant,Unité,
        Epuisé, Prix_Achat, Utilisateur)
    VALUES (@companyCode,@type, @indice,0 ,0,0,'SIEGE', @articleId,
        @value, 0, 0, @inventoryDate,0 ,0,0,0,'',
        0,0, 'API')
    `);

    res.sendResult(await getArticle(data.articleId));
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  },
);

registerApi(
  {
    router,
    route: '/:articleId/stock/',
    method: 'post',
    description: 'create stock record',
    params: schema().object({
      articleId: schema().number().required().description('article id'),
      type: schema().string().required().description('record type'),
      value: schema().number().required().description('record value'),
    }),
    returns: articleSchema,
  },
  async (req, res) => {
    try {
      const {data} = req;
      const { articleId, type, value } = data;
      const request = db.request();
      request.input('articleId', sql.Int, articleId);

      const { companyCode } = await request.query(`
    SELECT CODE_SOC as companyCode, DATE_INVENTAIRE as inventoryDate FROM TAB_GEN_SOC
    `).then((r) => r?.recordset?.[0]);

      request.input('type', sql.VarChar, type);
      const indice = await request.query(`
    SELECT coalesce(MAX(Numéro_Cde), 0)+1 AS indice FROM F_LIGNES_STK WITH(NOLOCK) WHERE Type_Cde=@type
    `).then((r) => r?.recordset?.[0]?.indice);

      request.input('companyCode', sql.VarChar, companyCode);
      request.input('indice', sql.Int, indice);
      request.input('value', sql.Int, value);

      await request.query(`
    INSERT INTO F_LIGNES_STK (
        Code_Société,Type_Cde,Numéro_Cde,Indice_Cde,Indice_Ligne,Indice_Livraison,Ident_Site,Séq_Article,
        Quantité,Prix,Remise,Date_Livr_Confirmée,Poids,Mt_Suppléments,Numéro_BL,Ident_Représentant,Unité,
        Epuisé, Prix_Achat, Utilisateur)
    VALUES (@companyCode,@type, @indice,0 ,0,0,'SIEGE', @articleId,
        @value, 0, 0, getdate(),0 ,0,0,0,'',
        0,0, 'API')
    `);

    res.sendResult(await getArticle(data.articleId));
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  },
);
export default router;
