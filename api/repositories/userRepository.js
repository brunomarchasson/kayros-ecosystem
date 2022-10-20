import db from "../core/db";
import sql from 'mssql'
import RepositoryBase from "./repositoryBase";

class UserRepository extends RepositoryBase {
  constructor() {
    super();
  }

  format(dbData) {
    if (!dbData) return null
    console.log(dbData)
    return {
      "idOrganisation": dbData.Code_Société,
      "type": dbData.Type_Ident_F,
      "ident": dbData.Ident,
      "rangCorr": dbData.Rang_Corr,
      "email": dbData.Adr_E_Mail,
      "language": "fr",
    }
  }

  async get(type, ident, rang) {
    const r = await db
      .request()
      .input('type', sql.Char, type)
      .input('ident', sql.Int, ident)
      .input('rang', sql.Int, rang)
      .query(
        `SELECT C.Code_Société, C.Type_Ident_F, C.Ident, C.Rang_Corr, M.Adr_E_Mail
    FROM FMAIL_DCT M
    LEFT JOIN F_CORRES_DCT C ON C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
    LEFT JOIN FMAIL_DCT_APPLICATIONS A ON A.Code_Société = C.Code_Société AND A.Type_Ident_F = C.Type_Ident_F AND A.Ident = C.Ident AND A.Rang_Corr = C.Rang_Corr
    WHERE M.Type_Ident_F = @type AND M.ident = @ident AND C.Rang_Corr = @rang AND Code_Application='DEVWEB'`
      )
      .then((r) => r.recordset[0])
      .catch(console.error)

    return this.format(r)
  }

  async getById(id) {
    return this.usersCollection.find(user => user._id == id);
  }

  async getWithCreds(customerId, email, password) {
    if (!customerId || !email) {
      console.log('eee')
      return null;//res.status(400).json({ error: "bad credentials" });
    }
    const r = await db
      .request()
      .input('ident', sql.Int, customerId)
      .input('email', sql.VarChar, email)
      .input('pwd', sql.VarChar, password)
      .query(
        `SELECT C.Code_Société, C.Type_Ident_F, C.Ident, C.Rang_Corr, M.Adr_E_Mail
  FROM FMAIL_DCT M
  LEFT JOIN F_CORRES_DCT C ON C.Code_Société = M.Code_Société AND C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
  LEFT JOIN FMAIL_DCT_APPLICATIONS A ON A.Code_Société = C.Code_Société AND A.Type_Ident_F = C.Type_Ident_F AND A.Ident = C.Ident AND A.Rang_Corr = C.Rang_Corr
  WHERE M.Type_Ident_F = 'C' AND M.ident = @ident AND Adr_E_Mail = @email AND Mot_de_Passe=@pwd AND Code_Application='DEVWEB'`
      )
      .then((r) => r.recordset[0])
      .catch(console.error)
    return this.format(r)

  }

  getByEmail(email) {
    return this.usersCollection.find(user => user.email == email);
  }
}

export default UserRepository;
