import sql from 'mssql';
import db from "../core/db";
import RepositoryBase from "./repositoryBase";

class ArticleRepository extends RepositoryBase {
  constructor() {
    super();
    db.query('SELECT * FROM TAB_TYPE_ARTICLE').then(r => r.recordset).then(d => {
      this.TYPE_ARTICLES = d
    })
  }

  format(dbData) {
    if (!dbData) return null
    return {
      id: dbData.id,
      TypeArticle: dbData.TypeArticle,
      Designation: dbData.DESIGNATION,
      Famille: dbData.Famille,
      SousFamille: dbData.Sous_Famille,
      TYPE_MAJ: dbData.TYPE_MAJ,
      DATE_MAJ: dbData.DATE_MAJ,
    }
  }

  async getAll({type, id, extra}) {

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
      // .catch(console.error)

    return r
  }

  async getById(id) {
    return this.getAll({id}).then(([r]) => r)
  }


}

export default ArticleRepository;
