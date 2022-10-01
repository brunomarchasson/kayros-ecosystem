import { createToken } from "../core";
import db from "../core/db.js";


const get = async (req, res) => {
  const u = req.currentUser;

  var params = { type: u.type, ident: u.ident, rang: u.rangCorr };
  // const u = knex.raw("select * from foo where x1 = :x1 and dude = :dude",params);

  const r = await db
    .raw(
      `SELECT C.Type_Ident_F, C.Ident, C.Rang_Corr, M.Adr_E_Mail
  FROM FMAIL_DCT M
  LEFT JOIN F_CORRES_DCT C ON C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
  LEFT JOIN FMAIL_DCT_APPLICATIONS A ON A.Code_Société = C.Code_Société AND A.Type_Ident_F = C.Type_Ident_F AND A.Ident = C.Ident AND A.Rang_Corr = C.Rang_Corr
  WHERE M.Type_Ident_F = :type AND M.ident = :ident AND C.Rang_Corr = :rang AND Code_Application='DEVWEB'`,
      params,
    )
    .then((r) => r[0]);

    if (!r) {
      return res.status(400).json({ error: "bad credentials" });
    }

  const user =  {
    type: r.Type_Ident_F,
    ident: r.Ident,
    rangCorr: r.Rang_Corr,
    email: r.Adr_E_Mail,
    language: "fr",
  };
  // const user = mockedUser;// dbConfig.mocked ? mockedUser : null

  //todo Fetch user from db


  const token = await createToken(user);
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

const login = async (req, res) => {
  const { customerId, email, password } = req.data;

  // const regex = /(\d*)<(.*)>/;
  // const [, ident, email] = userLogin.match(regex) ?? [];

  if (!customerId || !email) {
    return res.status(400).json({ error: "bad credentials" });
  }

  var params = { ident: customerId, email, pwd: password };
  const r = await db
    .raw(
`SELECT C.Type_Ident_F, C.Ident, C.Rang_Corr, M.Adr_E_Mail
FROM FMAIL_DCT M
LEFT JOIN F_CORRES_DCT C ON C.Code_Société = M.Code_Société AND C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
LEFT JOIN FMAIL_DCT_APPLICATIONS A ON A.Code_Société = C.Code_Société AND A.Type_Ident_F = C.Type_Ident_F AND A.Ident = C.Ident AND A.Rang_Corr = C.Rang_Corr
WHERE M.Type_Ident_F = 'C' AND M.ident = :ident AND Adr_E_Mail = :email AND Mot_de_Passe=:pwd AND Code_Application='DEVWEB'`,
      params,
    )
    .then((r) => r[0])
    .catch(e => console.error(e))
  if (!r) {
    return res.status(400).json({ error: "bad credentials" });
  }

  const user = {
    type: r.Type_Ident_F,
    ident: r.Ident,
    rangCorr: r.Rang_Corr,
    email: r.Adr_E_Mail,
    language: "fr",
  };

  const token = await createToken(user);
  console.log(token)
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

export default {
  get,
  login,
};
