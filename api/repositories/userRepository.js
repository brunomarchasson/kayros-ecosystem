import RepositoryBase from "./repositoryBase";

class UserRepository extends RepositoryBase {
  constructor() {
    super();
  }

  format(dbData){
    if(!dbData) return null
    return {
      "type": dbData.Type_Ident_F,
      "ident": dbData.Ident,
      "rangCorr": dbData.Rang_Cott,
      "email": dbData.Adr_E_Mail,
      "language": "fr",
    }
  }

  async get(type,ident,rang){
    var params = { type: type, ident: ident, rang: rang };
    const r = await db
    .raw(
      `SELECT *
  FROM FMAIL_DCT M
  LEFT JOIN F_CORRES_DCT C ON C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
  WHERE M.Type_Ident_F = :type AND M.ident = :ident AND Rang_Corr = :rang`,
      params,
    )
    .then((r) => r[0]);
      return this.format(r)
  }
  async getById(id) {
    return this.usersCollection.find(user => user._id == id);
  }

  async getWithCreds( customerId, email, password) {
    if(email === 'sdf')
    return {
      id: 123,
      email: 'toto@tt.com'
    }

    // return this.usersCollection.find(user => user._id == id);
  }

  getByEmail(email) {
    return this.usersCollection.find(user => user.email == email);
  }
}

export default UserRepository;
