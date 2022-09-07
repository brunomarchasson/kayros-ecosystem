import { UniqueIdentifier } from "mssql";
import { createToken } from "../core";
import db from "../core/db.js";

const mockedUser = {
  id: 1,
  email: "toto@toto.com",
  language: "fr",
};

const get = async (req, res, next) => {
  console.log("CONTROLER_GET");
  const u = req.currentUser;
  console.log(u);
  var params = { type: u.type, ident: u.ident, rang: u.rangCorr };
  // const u = knex.raw("select * from foo where x1 = :x1 and dude = :dude",params);
  const r = await db
    .raw(
      `SELECT *
  FROM FMAIL_DCT M
  LEFT JOIN F_CORRES_DCT C ON C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
  WHERE M.Type_Ident_F = :type AND M.ident = :ident AND Rang_Corr = :rang`,
      params,
    )
    .then((r) => r[0][0]);

  const user = {
    type: r.Type_Ident_F,
    ident: r.Ident,
    rangCorr: r.Rang_Corr,
    email: r.Adr_E_Mail,
    language: "fr",
  };
  // const user = mockedUser;// dbConfig.mocked ? mockedUser : null

  //todo Fetch user from db

  if (!user) {
    return res.status(400).json({ error: "bad credentials" });
  }

  const token = await createToken(user);
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

const login = async (req, res) => {
  const { email: userLogin, password } = req.data;
  const regex = /(\d*)<(.*)>/;
  const [, ident, email] = userLogin.match(regex) ?? [];

  if (!ident || !email) {
    return res.status(400).json({ error: "bad credentials" });
  }

  var params = { ident, email, pwd: password };
  const r = await db
    .raw(
      `SELECT *
FROM FMAIL_DCT M
LEFT JOIN F_CORRES_DCT C ON C.TYPE_IDENT_F = M.TYPE_IDENT_F AND C.IDENT= M.IDENT AND C.Rang_Corr  =M.Indice
WHERE M.Type_Ident_F = 'C' AND M.ident = :ident AND Adr_E_Mail = :email AND Mot_de_Passe=:pwd`,
      params,
    )
    .then((r) => r[0][0]);

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

  console.log("x", user);

  const token = await createToken(user);
  console.log("t", token);
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
