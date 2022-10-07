import { createToken } from "../core";
import db from "../core/db.js";
import repository from "../repositories/repository";


const get = async (req, res) => {
  const u = req.currentUser;
  console.log(u)
  const user = await repository.user.get( u.type,u.ident, u.rangCorr )

  if(!user) return res.status(400).json({ error: "bad credentials" });
  const token = await createToken(user);
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

const login = async (req, res) => {
  const { customerId, email, password } = req.data;

  const user = await repository.user.getWithCreds( customerId, email, password)

  console.log('user', user)
  if(!user) return res.status(400).json({ error: "bad credentials" });

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
