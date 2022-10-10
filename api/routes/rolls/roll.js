import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import db from '../../core/db';
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

    await db.raw(
      `UPDATE F_BOBINES_STK SET [Anc_Localisation] = Localisation,Localisation = :location, UTIL = :user
        WHERE Préfixe_EAN = :eanPrefix AND EAN_Séq_Bob = :eanId AND Indice = :rollIdx
        `,{
          eanId: roll.eanId,
eanPrefix: roll.eanSuplier,
rollIdx: roll.rollIdx,
location: data.location,
user: data.currentUser,
        }
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
    await db.raw(
      `UPDATE F_BOBINES_STK SET Code_Etape = :status, Date_Etape = GetDate(), UTIL = :user
        WHERE Préfixe_EAN = :eanPrefix AND EAN_Séq_Bob = :eanId AND Indice = :rollIdx
        `, {
          eanId: roll.eanId,
eanPrefix: roll.eanSuplier,
rollIdx: roll.rollIdx,
status: data.status,
user: data.currentUser,
        }
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
    if (data.length >= roll.length) {

      await db.raw(
        `UPDATE F_BOBINES_STK SET EAN_Longueur = :length, Date_Entrée = GetDate(), UTIL = :user ${
          roll.status === 'Z'
            ? ", Code_Etape = 'L', Date_Etape = GETDATE()"
            : ''
        }
        WHERE Préfixe_EAN = :eanPrefix AND EAN_Séq_Bob = :eanId AND Indice = :rollIdx
        `, {
          eanId: roll.eanId,
      eanPrefix: roll.eanSuplier,
      rollIdx: roll.rollIdx,
      length: data.length,
      user: data.currentUser,
        }
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

    await db.transaction(async trx => {
      trx.raw(
        `
        UPDATE F_BOBINES_STK SET
        Code_Etape = 'T',Longueur_Utilisée = :usedLength, Code_Fab = 999999,UTIL =  :user,Date_Etape = GETDATE()
        WHERE Préfixe_EAN = :eanPrefix AND EAN_Séq_Bob = :eanId AND Indice = :rollIdx
        `,{eanId: roll.eanId,
          eanPrefix: roll.eanSuplier,
          rollIdx: roll.rollIdx,
          user: data.currentUser,
          usedLength: data.length,
        }
      );

      await trx.raw(
        `
          INSERT INTO F_BOBINES_STK (Séq_Article, Indice,
            Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, EAN_Longueur,
            EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
            Indice_Livraison, Code_Etape, Code_Fab, Quantité,Date_Entrée, Date_Etape, Longueur_Initiale,
            Longueur_Utilisée, Type_Provenance, Prix, Date_Livraison, UTIL,Localisation)
          SELECT Séq_Article,(SELECT coalesce(max(indice), 0) +1 from f_bobines_stk where  EAN_Séq_Bob = :rollId),
          Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, :length,
          EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
           Indice_Livraison, 'L', NULL, Quantité, GETDATE(),GETDATE(),  Longueur_Initiale,
            0, 'I', Prix, Date_Livraison, :user,Localisation
          FROM F_BOBINES_STK WHERE  Préfixe_EAN = :eanPrefix AND EAN_Séq_Bob = :eanId AND Indice = :rollIdx
          `,
          {eanId: roll.eanId,
            eanPrefix: roll.eanSuplier,
            rollIdx: roll.rollIdx,
            user: data.currentUser,
            length: data.length, }
      );
      await logRoll(
        roll.rollId,
        data.currentUser,
        `Modification de la longueur de la bobine, passée de ${roll.length} à ${data.length} ml.`,
      );



    })



    return returns(await getRoll(data.rollId));
  },
);

export default router;
