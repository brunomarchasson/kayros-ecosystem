import { createToken } from "../core";
import sql, { dbConfig } from "../database/database-layer";

const get = (req, res, next) => {
  const id = req.params.userId;
  if (id && usersData[id]) {
    res.json(usersData[id]);
    res.status(200).send();
  } else {
    // Not Found
    res.status(404).send();
  }
};
// to retrieve resource
const getAll = (req, res, next) => {
  // Respond with some data and return status OK
  res.json(usersData);
  res.status(200).send();
};
// to create new resources
const upsert = (req, res, next) => {
  // Return our request body and return status OK
  res.json(req.body).status(200).send();
};

const login = async (req, res) => {
 const mocked = {
  id: 1,
  email: 'toto@toto.com',
  language: 'fr',
 }
  const user = dbConfig.mocked ? mocked : null
  if (!user) {
    return res.status(400).json({ error: 'bad credentials' });
  }

  const token = await createToken(
    {
      user: {
        id: user.id,
        email: user.email,
        language: user.language,
      },
    }
  );
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

export default {
  get,
  getAll,
  upsert,
  login,
}
