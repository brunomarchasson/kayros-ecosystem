import express from 'express';
import { registerApi, schema } from '../apiExplorer';
import { credentialSchema } from '../schemas/credentialsSchema';
import users from '../users.json';
import { createToken } from '../core';

const router = express.Router();

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'getToken',
    params: schema().object({
      user: schema().string().required().description('Account'),
      password: schema().string().required().description('Account password'),
    }),
    returns: credentialSchema,
  },
  async (data, returns, { res }) => {
    const user = users.find((u) => u.user === data.user && u.password === data.password);
    if (!user) return res.status(400).json({ error: 'bad credentials' });
    const token = createToken({
      user: user.user,
    });
    return returns({
      // user: userWithoutPassword,
      success: true,
      user: user.user,
      token,
    });
  },
);

export default router;
