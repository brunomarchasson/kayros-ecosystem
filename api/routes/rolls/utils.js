import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import sql from '../../database/database-layer';
import rollSchema from '../../schemas/rollSchema';

export const getRoll = async (rollId) => {
  const request = new sql.Request();
  request.input('rollId', sql.VarChar, rollId);

  const roll = await request
    .query(
      `SELECT TOP 1 '003'+S.Préfixe_EAN+S.EAN_Séq_Bob as rollId,S.EAN_Séq_Bob as eanId, S.Préfixe_EAN as eanSuplier,Séq_Article as articleId,Ident_Tiers as providerId, 
      EAN_Largeur as width,EAN_Longueur as length ,Indice as rollIdx,Désignation as label,
      Localisation as location,Date_Entrée as inputDate,Code_Etape as status, [UTIL] as [user], [Date_Etape] as status_ts
        FROM F_BOBINES_STK S 
        LEFT JOIN K_30 K ON K.Identifiant = cast(Séq_Article as varchar)+'.'+cast(Ident_Tiers as varchar)
        WHERE '003'+S.Préfixe_EAN+S.EAN_Séq_Bob =  @rollId 
        ORDER BY CASE WHEN Code_Etape = 'T' then 1 else 0 end,  indice desc
    `,
    )
    .then((r) => r.recordset[0]);
  if (!roll) return null;
  roll.lastCheckTs = roll.inputDate?.getTime?.();
  request.input('eanId', sql.VarChar, roll?.eanId);
  const bookings = await request
    .query(
      `SELECT Code_Fab as orderId ,Indice_Fab as orderIndex, Indice_Ligne as orderLine , Longueur as bookedLength
      FROM [VUE_BOBINES_RESERVATION] 
      WHERE EAN_Séq_Bob =  @eanId AND Statut IS NULL
      `,
    )
    .then((r) => r.recordset);
  roll.bookings = bookings;
  return roll;
};

export const logRoll = async (eanSeqBob, util, action) => {
  const request = new sql.Request();
  request.input('ean_seq_bob', sql.VarChar, eanSeqBob);
  request.input('util', sql.VarChar, util);
  request.input('action', sql.VarChar, action);

  await request
    .query(
      `INSERT INTO HIS_BOBINES_STK (EAN_Séq_Bob,[Date],Util,Origine,[Action]) 
      VALUES( @ean_seq_bob,GETDATE(),  @util,'P', @action)`,
    );
};
export default { getRoll, logRoll };
