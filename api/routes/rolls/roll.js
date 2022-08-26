import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import sql from '../../database/database-layer';
import rollSchema from '../../schemas/rollSchema';
import { getRoll, logRoll } from './utils';

// const util = require('util');

const router = express.Router({ mergeParams: true });

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'List rolls',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
    }),
    returns: rollSchema,
  },
  async (data, returns) => {
    const roll = await getRoll(data.rollId);
    returns(roll);
  },
);

registerApi(
  {
    router,
    route: '/location/:location',
    method: 'post',
    description: 'Update roll location',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
      location: schema().string().description('roll location'),
    }),
    returns: rollSchema,
  },
  async (data, returns, { res }) => {
    const roll = await getRoll(data.rollId);

    if (!roll) {
      return res.status(404).end();
    }
    const request = new sql.Request();
    request.input('eanId', roll.eanId);
    request.input('eanPrefix', roll.eanSuplier);
    request.input('rollIdx', roll.rollIdx);
    request.input('location', sql.VarChar, data.location);
    request.input('user', sql.VarChar, data.currentUser);
    await request.query(
      `UPDATE F_BOBINES_STK SET [Anc_Localisation] = Localisation,Localisation = @location, UTIL = @user
        WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
        `,
    );
    return returns(await getRoll(data.rollId));
  },
);

registerApi(
  {
    router,
    route: '/status/:status',
    method: 'post',
    description: 'Update roll status',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
      status: schema()
        .string()
        .required()
        .oneOf(['Z', 'L', 'R'])
        .description('roll status'),
    }),
    returns: rollSchema,
  },
  async (data, returns, { res }) => {
    const roll = await getRoll(data.rollId);

    if (!roll) {
      return res.status(404).end();
    }
    const request = new sql.Request();
    request.input('eanId', roll.eanId);
    request.input('eanPrefix', roll.eanSuplier);
    request.input('rollIdx', roll.rollIdx);
    request.input('status', sql.VarChar, data.status);
    request.input('user', sql.VarChar, data.currentUser);
    const r = await request.query(
      `UPDATE F_BOBINES_STK SET Code_Etape = @status, Date_Etape = GetDate(), UTIL = @user
        WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
        `,
    );
    return returns(await getRoll(data.rollId));
  },
);

registerApi(
  {
    router,
    route: '/length/:length',
    method: 'post',
    description: 'Update roll length',
    params: schema().object({
      rollId: schema().string().description('EAN SEQ bob'),
      length: schema().number().required().description('roll length'),
    }),
    returns: rollSchema,
  },
  async (data, returns, { res }) => {
    const roll = await getRoll(data.rollId);
    if (!roll) {
      return res.status(404).end();
    }
    console.log(data)
    if (data.length >= roll.length) {
      const request = new sql.Request();
      request.input('eanId', roll.eanId);
      request.input('eanPrefix', roll.eanSuplier);
      request.input('rollIdx', roll.rollIdx);
      request.input('length', sql.Int, data.length);
      request.input('user', sql.VarChar, data.currentUser);
      await request.query(
        `UPDATE F_BOBINES_STK SET EAN_Longueur = @length, Date_Entrée = GetDate(), UTIL = @user ${
          roll.status === 'Z'
            ? ", Code_Etape = 'L', Date_Etape = GETDATE()"
            : ''
        }
        WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
        `,
      );
      if (data.length > roll.length) {
        logRoll(
          roll.rollId,
          data.currentUser,
          `Modification de la longueur de la bobine, passée de ${roll.length} à ${data.length} ml.`,
        );
      }
      return returns(await getRoll(data.rollId));
    }
    const transaction = new sql.Transaction();
    try {
      await transaction.begin();
      const request = new sql.Request(transaction);

      request.input('eanId', roll.eanId);
      request.input('eanPrefix', roll.eanSuplier);
      request.input('rollIdx', roll.rollIdx);
      request.input('usedLength', roll.length - data.length);
      request.input('length', data.length);
      request.input('user', sql.VarChar, data.currentUser);

      await request.query(
        `
        UPDATE F_BOBINES_STK SET
        Code_Etape = 'T',Longueur_Utilisée = @usedLength, Code_Fab = 999999,UTIL =  @user,Date_Etape = GETDATE()
        WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
        `,
      );

      await request.query(
        `
          INSERT INTO F_BOBINES_STK (Séq_Article, Indice,
            Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, EAN_Longueur,
            EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
            Indice_Livraison, Code_Etape, Code_Fab, Quantité,Date_Entrée, Date_Etape, Longueur_Initiale,
            Longueur_Utilisée, Type_Provenance, Prix, Date_Livraison, UTIL,Localisation)
          SELECT Séq_Article,(SELECT coalesce(max(indice), 0) +1 from f_bobines_stk where  EAN_Séq_Bob = @rollId),
          Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, @length,
          EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
           Indice_Livraison, 'L', NULL, Quantité, GETDATE(),GETDATE(),  Longueur_Initiale,
            0, 'I', Prix, Date_Livraison, @user,Localisation
          FROM F_BOBINES_STK WHERE  Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
          `,
      );
      logRoll(
        roll.rollId,
        data.currentUser,
        `Modification de la longueur de la bobine, passée de ${roll.length} à ${data.length} ml.`,
      );
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
    return returns(await getRoll(data.rollId));
  },
);

export default router;
