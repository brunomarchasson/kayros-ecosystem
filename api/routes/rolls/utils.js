import db from '../../core/db';

export const getRoll = async (rollId) => {
  const roll = await db.raw(
    `SELECT TOP 1 '003'+S.Préfixe_EAN+S.EAN_Séq_Bob as rollId,S.EAN_Séq_Bob as eanId, S.Préfixe_EAN as eanSuplier,Séq_Article as articleId,Ident_Tiers as providerId,
      EAN_Largeur as width,EAN_Longueur as length ,Indice as rollIdx,Désignation as label,
      Localisation as location,Date_Entrée as inputDate,Code_Etape as status, [UTIL] as [user], [Date_Etape] as status_ts
        FROM F_BOBINES_STK S
        LEFT JOIN K_30 K ON K.Identifiant = cast(Séq_Article as varchar)+'.'+cast(Ident_Tiers as varchar)
        WHERE '003'+S.Préfixe_EAN+S.EAN_Séq_Bob =  :rollId
        ORDER BY CASE WHEN Code_Etape = 'T' then 1 else 0 end,  indice desc
    `,
    { rollId }

  )
    .then((r) => r[0]);
  if (!roll) return null;
  roll.lastCheckTs = roll.inputDate?.getTime?.();

  const bookings = await db.raw(
    `SELECT Code_Fab as orderId ,Indice_Fab as orderIndex, Indice_Ligne as orderLine , Longueur as bookedLength
      FROM [VUE_BOBINES_RESERVATION]
      WHERE EAN_Séq_Bob =  :eanId AND Statut IS NULL
      `,
    {
      eanId: roll?.eanId
    }
  )

  roll.bookings = bookings;
  return roll;
};

export const logRoll = async (eanSeqBob, util, action) => {

  await db.raw(
    `INSERT INTO HIS_BOBINES_STK (EAN_Séq_Bob,[Date],Util,Origine,[Action])
      VALUES( :ean_seq_bob,GETDATE(),  :util,'P', :action)`,
    {
      eanSeqBob,
      util,
      action,
    }
  );
};
export default { getRoll, logRoll };
