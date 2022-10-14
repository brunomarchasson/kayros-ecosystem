import { createToken } from "../core";
import db from "../core/db.js";
import repository from "../repositories/repository";

const get = async (req, res) => {
  const u = req.currentUser;
  const user = await repository.user.get(u.type, u.ident, u.rangCorr);

  if (!user) return res.status(400).json({ error: "bad credentials" });
  const token = await createToken(user);
  res.sendResult({
    success: true,
    token,
    user,
  });
};

const login = async (req, res) => {
  const { customerId, email, password } = req.data;

  const user = await repository.user.getWithCreds(customerId, email, password);

  if (!user) return res.status(400).json({ error: "bad credentials" });

  const token = await createToken(user);
  res.sendResult({
    success: true,
    token,
    user: user,
  });
};

export default {
  get,
  login,
};
