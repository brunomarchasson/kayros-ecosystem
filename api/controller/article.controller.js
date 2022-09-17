import db from "../core/db.js";

export const formatArticle = ({
  id,
  TypeArticle,
  DESIGNATION: Designation,
  Famille,
  Sous_Famille: SousFamille,
  TYPE_MAJ,
  DATE_MAJ,
}) => ({
  id,
  TypeArticle,
  Designation,
  Famille,
  SousFamille,
  TYPE_MAJ,
  DATE_MAJ,
});

const getAll = async (req, res) => {
  const u = req.currentUser;
  const { type } = req.data;
  const params = { type: type ?? null };
  const r = await db
    .raw(
      `SELECT distinct  case when Pelli = 1 then 'PEL' else COALESCE(SF.TYPE_ARTICLE,F.TYPE_ARTICLE,G.TYPE_ARTICLE) end  as TypeArticle,
  A.SEQ_ARTICLE as id, A.DESIGNATION , F.Famille, SF.Sous_Famille,TYPE_MAJ, DATE_MAJ
  FROM TAB_ARTICLES A
  LEFT JOIN TAB_GAM_ARTICLES G   ON G.CODE_GAMME= A.GAMME
LEFT JOIN TAB_FAM_ARTICLES F  ON F.CODE_GAMME = A.GAMME AND F.CODE_FAMILLE = A.FAMILLE
LEFT JOIN TAB_SFAM_ART SF  ON SF.CODE_GAMME = A.GAMME AND SF.CODE_FAMILLE = A.FAMILLE AND SF.CODE_SOUS_FAMILLE=  A.SOUS_FAMILLE
LEFT JOIN K_30 K  ON K.Identifiant like concat(cast(A.SEQ_ARTICLE as CHAR(50)) , '.%')
LEFT JOIN TAB_WEB_ARTICLES W  ON W.SEQ_ARTICLE = A.SEQ_ARTICLE
WHERE 1=1
${params.type
        ? `AND case when Pelli = 1 then 'PEL' else COALESCE(SF.TYPE_ARTICLE,F.TYPE_ARTICLE,G.TYPE_ARTICLE) end = :type`
        : ""
      }
AND VISIBLE_WEB = 1
`,
      params,
    )
    .then((r) => r.map(formatArticle));
  res.sendResult(r);
};

const get = async (req, res, next) => { };

export default {
  getAll,
  get,
};
