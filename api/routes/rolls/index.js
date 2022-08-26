import express from 'express';
import parse from 'date-fns/parse';
import { registerApi, schema } from '../../apiExplorer';
import sql from '../../database/database-layer';
import rollSchema from '../../schemas/rollSchema';
import { getProduct } from '../product';
import rollRoutes from './roll';
import { getRoll, logRoll } from './utils';
import { getProvider } from '../provider';

const router = express.Router();

registerApi(
  {
    router,
    route: '/',
    method: 'post',
    description: 'Add new roll',
    params: schema().object({
      mode: schema()
        .string()
        .required()
        .oneOf(['L', 'I'])
        .description('input mode I ( Inventory) / L (delivery )'),
      rollIdCode: schema().string().required().description('rollId code'),
      productIdCode: schema().string().required().description('productId code'),
      rollDetailCode: schema()
        .string()
        .required()
        .description('rollDetail code'),
      bestBeforeCode: schema().string().description('bestBefore code'),
      length: schema().number().description('roll length'),
      location: schema().string().description('roll locationh'),
    }),
    returns: rollSchema,
  },
  async (data, returns, { res }) => {
    try {
      const request = new sql.Request();

      const eanProvider = data.productIdCode.substring(0, 6);
      const eanProduct = data.productIdCode.substring(6, 12);
      const eanIdRoll = data.rollIdCode.substring(9, 19);
      const rollWidth = parseInt(data.rollDetailCode.substring(4, 8), 10);
      const length = parseInt(data.rollDetailCode.substring(8, 13), 10);
      const mandrelSize = parseInt(data.rollDetailCode.substring(13, 16), 10);
      const windingDirection = data.rollDetailCode.substring(16, 17);
      const fitting = data.rollDetailCode.substring(17, 18);
      const bestBefore = data.bestBeforeCode
        ? parse(data.bestBeforeCode.substring(2, 8), 'yymmdd', new Date())
        : null;
      const product = await getProduct(data.productIdCode);
      const provider = await getProvider(eanProvider);

      console.log(product, provider)

      request.input('user', sql.VarChar, data.currentUser);
      request.input('idArticle', sql.VarChar, product.id.split('.')[0]);

      const idx = await request
        .query(
          'SELECT cast(coalesce(MAX(Indice),0)+1 as varchar)  AS idx FROM F_BOBINES_STK  WHERE Séq_Article = @idArticle',
        )
        .then((r) => r.recordset[0].index);

    console.log('rr')
      request.input('idx', sql.VarChar, idx);
      request.input('eanProvider', sql.VarChar, eanProvider);
      request.input('idProvider', sql.VarChar, provider.id);
      request.input('eanProduct', sql.VarChar, eanProduct);
      request.input('idProduct', sql.VarChar, eanIdRoll);
      request.input('rollWidth', sql.Int, rollWidth);
      request.input('OriginalLength', sql.Int, length);
      request.input('mandrelSize', sql.Int, mandrelSize);
      request.input('windingDirection', sql.VarChar, windingDirection);
      request.input('fitting', sql.VarChar, fitting);
      request.input('bestBeforeDate', sql.Date, bestBefore);
      request.input('length', sql.Int, data.length);
      request.input('InventoryMode', sql.VarChar, data.mode);
      request.input('location', sql.VarChar, data.locatino);

      await request.query(
        `INSERT INTO F_BOBINES_STK
      (Séq_Article, Indice, Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, EAN_Longueur, EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne, Indice_Livraison, Code_Etape, Code_Fab, Quantité, Date_Entrée,Date_Etape, Longueur_Initiale, Longueur_Utilisée, Type_Provenance, Prix, Date_Livraison, UTIL,Localisation)
      VALUES
      (@idArticle, @idx, @eanProvider, @idProvider, @eanProduct, @idProduct, @rollWidth, @OriginalLength, @mandrelSize, @windingDirection, @fitting, @bestBeforeDate, ,NULL,NULL,NULL,NULL,'L',NULL,'1',GETDATE(),GETDATE(),@length, 0, @InventoryMode,CONVERT(money,'0'), ,GETDATE(), @user, @location )
        `,
      );

      const roll = await getRoll(data.rollIdCode);
      returns(roll);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  },
);

router.use('/:rollId', rollRoutes);
export default router;
