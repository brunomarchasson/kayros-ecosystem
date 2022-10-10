import db from "../core/db";
import sql from 'mssql'
import RepositoryBase from "./repositoryBase";

import { exec } from "child_process";
import util from 'util';

const Pexec = util.promisify(exec);

async function calDev(id) {
  try {

    const { stdout, stderr } = await Pexec('pwd');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

const getArticleSupplier = (id) => {
  return db.request()
    .input('id', sql.Int, id)
    .query(`SELECT Ident FROM F_TARQ_ARTICLES WHERE Type_Ident_F = 'T' AND Séq_Article = @id AND Code_Tarif = 'B' ORDER BY Tarif`)
    .then(r => r.recordset[0].Ident)
}

const getQuotationId = async (id) => {
  if (id) {
    return db.request()
      .input('id', sql.Int, id)
      .query('SELECT coalesce(MAX(Ind_Devis),0)+1 as index FROM FDC_DEVIS WHERE Code_Devis = @id')
      .then((r) => ({ id, index: r.recordset[0].index }))
  }
  return db.query('SELECT coalesce(MAX(Code_Devis),0)+1 as id FROM FDC_DEVIS')
    .then(r => ({ id: r.recordset[0].id, index: 0 }))
}

const insert = async (data, { transaction }) => {
  console.log(data)
  return Promise.all(
    Object.entries(data).map(([tableName, cols]) => {
      const req = db.request(transaction)
      Object.entries(cols).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      const q = `INSERT INTO ${tableName} (${Object.keys(cols).join(', ')}) VALUES(${Object.keys(cols).map(name => `@${name}`).join(', ')})`
      console.log('q=>', q)
      return req.query(q)
    })
    )
}

const upsert = async (obj, { transaction }) => {
  console.log('upsert', obj)

  return Promise.all(
    Object.entries(obj).map(([tableName, { key, data }]) => {
      const req = db.request(transaction)
      Object.entries(data).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      Object.entries(key).forEach(([colName, value]) => {
        req.input(colName, value)
      })
      const q = `
      BEGIN TRAN
        UPDATE ${tableName} WITH (UPDLOCK, SERIALIZABLE)
         SET ${Object.keys(data).map(name => `${name} = @${name}`).join(', ')}
       WHERE ${Object.keys(key).map(name => `${name} = @${name}`).join(' AND ')} }

      IF (@@ROWCOUNT = 0)
      BEGIN
        INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES(${Object.keys(data).map(name => `@${name}`).join(', ')})
      END
      COMMIT
      `;
      console.log('q =>' ,q)
      return req.query(q)

    })
    )
}
class QuotationRepository extends RepositoryBase {
  constructor() {
    super();

  }


  async create(data) {


    //handle customer




    const { currentUser } = data;

    const transaction = new sql.Transaction()

    await transaction.begin()
    try {



      const { id, index } = await getQuotationId(data.basisId)
      const newId = `${id} / ${index}`

      console.log('------------------------------------------------------')
      console.log(newId)
      console.log('------------------------------------------------------')

      await insert({
        FDC_DEVIS: {
          Code_Société: currentUser.idOrganisation,
          Type_Ident_F: currentUser.type,
          Ident: currentUser.ident,
          Code_Devis: id,
          Ind_Devis: index,
          Designation: data.label,
          Deviseur: currentUser.rangCorr,
          Date_Création: new Date(),
          Etape: 1,
          DateEtape: new Date(),
          Id_Thésaurus: 13,
          // Ident_Représentant: ,
          Version1: 0,
          TOP_Valide: 1,
          Devis_en_Ligne: 1
        }
      }, { transaction })
      console.log('rr')
      const columns = await db.request(transaction).query(`
SELECT CAST(A.name AS VARCHAR) AS colName FROM SYSCOLUMNS A WITH(NOLOCK)
        LEFT JOIN SYSOBJECTS B ON B.[id] = A.[id] WHERE B.[name] = 'K_13' ORDER BY A.colid

`).then(r => r.recordset.map(({colName})=> colName))
console.log('cols', columns)
const q =`INSERT INTO K_13 SELECT ${columns.map(c => c === 'Identifiant' ? `'${newId}'` : c).join(', ')} FROM K_13 WHERE Identifiant = @basisId`
console.log(q)
console.log(data.basisId)

      //insert K13 from default
      await db.request(transaction)
      .input('basisId', data.basisId ?? '1')
      .query(`INSERT INTO K_13 SELECT ${columns.map(c => c === 'Identifiant' ? `'${newId}'` : c).join(', ')} FROM K_13 WHERE Identifiant = @basisId`)

console.log('po')
      await upsert({
        K_13: {
          key: { identifiant: newId },
          data: {
            DEV_NbEtiq1: data.quantyty1,
            DEV_NbEtiq2: data.quantyty2,
            DEV_NbEtiq3: data.quantyty3,
            DEV_Lib: data.label,
            DEV_Corres: currentUser.rangCorr,
            DEV_RefCli: data.reference,
            DEV_FormEtiq: data.shape,
            DEV_LzEtiq: data.width,
            DEV_AvEtiqS: data.height,
            DEV_NbRef: data.references,
            DEV_Support: data.backing,
            DEV_Fousup: await getArticleSupplier(data.backing),
            DEV_NvPelli: 0,
            DEV_CondType: data.packagingType,
            DEV_CondEtiqFront: data.numberAbreast,
            DEV_DiamMandrin: data.mandrelDiameter,
            DEV_CondEtiqFeuil: data.labelPerfanfold,
            DEV_CondPlaPqt: data.fanfoldPerPack,
            DEV_CondEtiqPqt: data.fanfoldPerPack,
            DEV_CondNbEtiqBob: data.quantityPerSpool,
            DEV_CondDiamBob: data.maxDiameter,
            DEV_CondSensDeroul: data.winding,
            DEV_CondSensSortie: data.output,
            DEV_PaysLivr: data.country,
            DEV_CPLivr: data.postcode,
            DEV_NbLivraison : 1,
            DEV_GammePF: 'NC',
            ... (data.lamination && ({ DEV_PresPelli: 1, DEV_PelliFilm: data.lamination, DEV_FouPelliFilm: await getArticleSupplier(data.lamination) })),
            ... (data.perforation && ({ DEV_AutresDecoupes: 1, DEV_PresPerfo: 1, DEV_NbPerfo: 1, DEV_NbEtiqEntrePerfo: 1 })),
          }
        }
      }, { transaction })
      console.log('ss')
      const dataType = {
        '4Q': [{ DEV_Nbre: 4, DEV_Type: 0 }],
        '1P': [{ DEV_Nbre: 1, DEV_Type: 2 }],
        '2P': [{ DEV_Nbre: 2, DEV_Type: 2 }],
        '3P': [{ DEV_Nbre: 3, DEV_Type: 2 }],
        '4P': [{ DEV_Nbre: 4, DEV_Type: 2 }],
        '6H': [{ DEV_Nbre: 6, DEV_Type: 1 }],
        '4Q+B': [{ DEV_Nbre: 4, DEV_Type: 0 }, { DEV_Nbre: 1, DEV_Type: 10 }],
        '6H+B': [{ DEV_Nbre: 6, DEV_Type: 1 }, { DEV_Nbre: 1, DEV_Type: 10 }],
      }
      if (data.print) {
        await Promise.all((dataType[data.print] || []).forEach((printRow, i) => {
          insert({
            K_13_Couleurs: {
              Identifiant: newId,
              indice: i,
              DEV_PQ: data.printProcess,
              DEV_Face: 0,
              DEV_Couv: 100,
              DEV_ClicheFourins: 0,
              DEV_NbChangeCoul: 0,
              DEV_NbChangCliche: 0,
              DEV_RechTeinte: 0,
              ...printRow
            }
          }, { transaction })
        }))
      }
      if (data.varnish) await insert({
        K_13_Couleurs: {
          Identifiant: newId,
          indice: 2,
          DEV_PQ: 103,
          DEV_Type: 6,
          DEV_Matière: data.varnish,
          DEV_Face: 0,
          DEV_Nbre: 1,
          DEV_Couv: 100,
          DEV_ClicheFourins: 0,
          DEV_NbChangeCoul: 0,
          DEV_NbChangCliche: 0,
          DEV_RechTeinte: 0,
        }
      }, { transaction })
      if (data.gliddingType) await insert({
        K_13_Couleurs: {
          Identifiant: newId,
          indice: 3,
          DEV_PQ: data.gliddingType,
          DEV_Type: 8,
          DEV_Matière: data.gliding,
          DEV_Face: 0,
          DEV_Nbre: 1,
          DEV_Couv: 50,
          DEV_ClicheFourins: 0,
          DEV_NbChangeCoul: 0,
          DEV_NbChangCliche: 0,
          DEV_RechTeinte: 0,
        }
      }, { transaction })
      if (data.blackSpot) await insert({
        K_13_Couleurs: {
          Identifiant: newId,
          indice: 4,
          DEV_PQ: 103,
          DEV_Type: 4,
          DEV_Face: 0,
          DEV_Nbre: 1,
          DEV_Couv: 10,
          DEV_ClicheFourins: 0,
          DEV_NbChangeCoul: 0,
          DEV_NbChangCliche: 0,
          DEV_RechTeinte: 0,
        }
      }, { transaction })


      await transaction.commit()
    } catch (e) {
      console.error(e)
      await transaction.rollback()
    }
    await calDev()
    //exec CalDev

    //read K_13_SOL_PQN

    // read FDC_DEVIS_RES

    //read K_13_FraisDev

    const r = await db
      .request()
      .input('type', sql.Char, type)
      .input('id', sql.Int, id)
      .query(
        `SELECT distinct  case when Pelli = 1 then 'PEL' else COALESCE(SF.TYPE_ARTICLE,F.TYPE_ARTICLE,G.TYPE_ARTICLE) end  as TypeArticle,
        A.SEQ_ARTICLE as id, A.DESIGNATION , F.Famille, SF.Sous_Famille,TYPE_MAJ, DATE_MAJ
        FROM TAB_ARTICLES A
        LEFT JOIN FDCT_ARTICLES fa on fa.Type_Ident_F ='T' and fa.Séq_Article = A.SEQ_ARTICLE
        LEFT JOIN TAB_GAM_ARTICLES G   ON G.CODE_GAMME= A.GAMME
      LEFT JOIN TAB_FAM_ARTICLES F  ON F.CODE_GAMME = A.GAMME AND F.CODE_FAMILLE = A.FAMILLE
      LEFT JOIN TAB_SFAM_ART SF  ON SF.CODE_GAMME = A.GAMME AND SF.CODE_FAMILLE = A.FAMILLE AND SF.CODE_SOUS_FAMILLE=  A.SOUS_FAMILLE
      LEFT JOIN K_30 K30  ON K30.Identifiant = concat(cast(A.SEQ_ARTICLE as VARCHAR(50)) , '.',cast(fa.Ident  as VARCHAR(50)) )
      LEFT JOIN TAB_WEB_ARTICLES W  ON W.SEQ_ARTICLE = A.SEQ_ARTICLE
      WHERE
      (@type is null or ( case when Pelli = 1 then 'PEL' else COALESCE(SF.TYPE_ARTICLE,F.TYPE_ARTICLE,G.TYPE_ARTICLE) end = @type))
      AND VISIBLE_WEB = 1
      `
      )
      .then((r) => r.recordset.map(this.format))
      .catch(console.error)

    return r
  }

  async getById(id) {
    return this.getAll({ id }).then(([r]) => r)
  }


}

export default QuotationRepository;
