import { getDate } from 'date-fns';
import parse from 'date-fns/parse';
import sql from 'mssql';
import db from "../core/db";
import { insert } from '../core/db/utils';
import { getProduct } from '../routes/rolls/product';
import { getProvider } from '../routes/rolls/provider';
import RepositoryBase from "./repositoryBase";

class RollRepository extends RepositoryBase {
  constructor() {
    super();

  }

 async logRoll(eanSeqBob, util, action) {
  console.log('log')
  db.request()
  .input('eanSeqBob',eanSeqBob)
  .input('util',util)
  .input('action',action)
  .query(
    `INSERT INTO HIS_BOBINES_STK (EAN_Séq_Bob,[Date],Util,Origine,[Action])
      VALUES( @eanSeqBob,GETDATE(),  @util,'P', @action)`
  )
 }

  async getRoll(rollId) {
    const roll = await db.request()
      .input('rollId', rollId)
      .query(
        `SELECT TOP 1 '003'+S.Préfixe_EAN+S.EAN_Séq_Bob as rollId,S.EAN_Séq_Bob as eanId, S.Préfixe_EAN as eanSuplier,Séq_Article as articleId,Ident_Tiers as providerId,
      EAN_Largeur as width,EAN_Longueur as length ,Indice as rollIdx,Désignation as label,
      Localisation as location,Date_Entrée as inputDate,Code_Etape as status, [UTIL] as [user], [Date_Etape] as status_ts
        FROM F_BOBINES_STK S WITH(NOLOCK)
        LEFT JOIN K_30 K WITH(NOLOCK) ON K.Identifiant = cast(Séq_Article as varchar)+'.'+cast(Ident_Tiers as varchar)
        WHERE '003'+S.Préfixe_EAN+S.EAN_Séq_Bob =  @rollId
        ORDER BY CASE WHEN Code_Etape = 'T' then 1 else 0 end,  indice desc
    `
      ).then(r => r?.recordset?.[0])
    console.log(roll)
    if (!roll) return null;
    roll.lastCheckTs = roll.inputDate?.getTime?.();

    const bookings = await db.request()
      .input('eanId', roll?.eanId)
      .query(`SELECT Code_Fab as orderId ,Indice_Fab as orderIndex, Indice_Ligne as orderLine , Longueur as bookedLength
    FROM [VUE_BOBINES_RESERVATION] WITH(NOLOCK)
    WHERE EAN_Séq_Bob =  @eanId AND Statut IS NULL
    `).then(r => r.recordset)

    roll.bookings = bookings;
    return roll;

  }

  async getAll({ type, id, extra }) {

  }

  findOne = async (data) => {
    return this.getRoll(data.rollId);
  }

  setLocation = async (data) => {
    const roll = await this.getRoll(data.rollId);
    console.log('tt', roll)
    if (!roll) return null;

    await db
      .request()
      .input('eanId', roll.eanId)
      .input('eanPrefix', roll.eanSuplier)
      .input('rollIdx', roll.rollIdx)
      .input('location', data.location)
      .input('user', data.currentUser)
      .query(`
      UPDATE F_BOBINES_STK SET [Anc_Localisation] = Localisation,Localisation = @location, UTIL = @user
      WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
    `)
    console.log('ss')
    return this.getRoll(data.rollId);
  }

  setStatus = async (data)=> {
    const roll = await this.getRoll(data.rollId);

    if (!roll) return null;

    await db
      .request()
      .input('eanId', roll.eanId)
      .input('eanPrefix', roll.eanSuplier)
      .input('rollIdx', roll.rollIdx)
      .input('status', data.location)
      .input('user', data.currentUser)
      .query(`
      UPDATE F_BOBINES_STK SET Code_Etape = @status, Date_Etape = GetDate(), UTIL = @user
      WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
    `)
    return this.getRoll(data.rollId);

  }

  setLength = async (data) => {
    const roll = await this.getRoll(data.rollId);

    if (!roll) return null;

    if (data.length >= roll.length) {


      await db.request()
        .input('eanId', roll.eanId)
        .input('eanPrefix', roll.eanSuplier)
        .input('rollIdx', roll.rollIdx)
        .input('length', data.length)
        .input('user', data.currentUser)
        .query(`UPDATE F_BOBINES_STK SET EAN_Longueur = @length, Date_Entrée = GetDate(), UTIL = @user ${roll.status === 'Z'
          ? ", Code_Etape = 'L', Date_Etape = GETDATE()"
          : ''
          }
      WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
      `)

      if (data.length > roll.length) {
        this.logRoll(
          roll.rollId,
          data.currentUser,
          `Modification de la longueur de la bobine, passée de ${roll.length} à ${data.length} ml.`,
        );
      }
      return this.getRoll(data.rollId);
    }

    const transaction = new sql.Transaction()

    await transaction.begin()

    try {
      await db.request(transaction)
        .input('eanId', roll.eanId)
        .input('eanPrefix', roll.eanSuplier)
        .input('rollIdx', roll.rollIdx)
        .input('user', data.currentUser)
        .input('usedLength', data.length)
        .query(`
    UPDATE F_BOBINES_STK SET
    Code_Etape = 'T',Longueur_Utilisée = @usedLength, Code_Fab = 999999,UTIL =  @user,Date_Etape = GETDATE()
    WHERE Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
    `)

      await db.request(transaction)
        .input('eanId', roll.eanId)
        .input('eanPrefix', roll.eanSuplier)
        .input('rollIdx', roll.rollIdx)
        .input('user', data.currentUser)
        .input('length', data.lengt)
        .query(`
    INSERT INTO F_BOBINES_STK (Séq_Article, Indice,
      Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, EAN_Longueur,
      EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
      Indice_Livraison, Code_Etape, Code_Fab, Quantité,Date_Entrée, Date_Etape, Longueur_Initiale,
      Longueur_Utilisée, Type_Provenance, Prix, Date_Livraison, UTIL,Localisation)
    SELECT Séq_Article,(SELECT coalesce(max(indice), 0) +1 from f_bobines_stk where  EAN_Séq_Bob = @eanId),
    Préfixe_EAN, Ident_Tiers, EAN_Produit, EAN_Séq_Bob, EAN_Largeur, @length,
    EAN_Taille_Mandrin, EAN_Enroulage, EAN_Nbre_Raccords, EAN_Date_Fab, Numéro_Cde, Indice_Cde, Indice_Ligne,
     Indice_Livraison, 'L', NULL, Quantité, GETDATE(),GETDATE(),  Longueur_Initiale,
      0, 'I', Prix, Date_Livraison, @user,Localisation
    FROM F_BOBINES_STK WHERE  Préfixe_EAN = @eanPrefix AND EAN_Séq_Bob = @eanId AND Indice = @rollIdx
    `)



    await transaction.commit()
    this.logRoll(
      roll.rollId,
      data.currentUser,
      `Modification de la longueur de la bobine, passée de ${roll.length} à ${data.length} ml.`,
    );
      return this.getRoll(data.rollId);
    } catch (e) {
      console.error(e)
      await transaction.rollback()
      throw e;
    }

  }

  create = async (data) => {
    console.log('create roll')
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
    const idArticle = product.id.split('.')[0]
    const transaction = new sql.Transaction()
    await transaction.begin()

    try {

      const {idx} = await db.request(transaction)
        .input('idArticle', idArticle)
        .query('SELECT cast(coalesce(MAX(Indice),0)+1 as varchar)  AS idx FROM F_BOBINES_STK  WHERE Séq_Article = @idArticle')
        .then(r => r.recordset[0])

      const now = new Date()

      await insert({
        F_BOBINES_STK: {
          Séq_Article: idArticle,
          Indice: idx,
          Préfixe_EAN: eanProvider,
          Ident_Tiers: provider.id,
          EAN_Produit: eanProduct,
          EAN_Séq_Bob: eanIdRoll,
          EAN_Largeur: rollWidth,
          EAN_Longueur: length,
          EAN_Taille_Mandrin: mandrelSize,
          EAN_Enroulage: windingDirection,
          EAN_Nbre_Raccords: fitting,
          EAN_Date_Fab: bestBefore,
          Numéro_Cde: null,
          Indice_Cde: null,
          Indice_Ligne: null,
          Indice_Livraison: null,
          Code_Etape: 'L',
          Code_Fab: null,
          Quantité: 1,
          Date_Entrée: now,
          Date_Etape: now,
          Longueur_Initiale: length,
          Longueur_Utilisée: 0,
          Type_Provenance: data.mode,
          Prix: 0,
          Date_Livraison: now,
          UTIL: 'PDA',
          Localisation: data.location,
        }
      })
      await transaction.commit()
      const roll = await this.getRoll(data.rollIdCode);
      return (roll)
    } catch (e) {
      console.error(e)
      await transaction.rollback()
      throw e;
    }
  }
}

export default RollRepository;
