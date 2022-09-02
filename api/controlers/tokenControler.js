import { createToken } from "../core";
import sql, { dbConfig } from "../database/database-layer";

const mockedUser = {
  id: 1,
  email: 'toto@toto.com',
  language: 'fr',
 }

const get = async (req, res, next) => {
  console.log('CONTROLER_GET')
  const u = req.currentUser;
  const user = dbConfig.mocked ? mockedUser : null
  //todo Fetch user from db

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

const login = async (req, res) => {

 console.log('rrr')
  const user = dbConfig.mocked ? mockedUser : null
  //tofo fetch user in db
  console.log('x', user)
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
  console.log('t', token)
  res.sendResult({
    user: user,
    success: true,
    token,
  });
};

export default {
  get,
  login,
}
