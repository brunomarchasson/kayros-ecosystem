import express from 'express';
import { registerApi, schema } from './apiExplorer';
import tokenController from './controller/tokenController';
import { credentialSchema } from './schemas/credentialsSchema';
import isAuthentified from './middleware/authJWT';

const router = express.Router();

registerApi(
  {
    router,
    route: '/token',
    method: 'get',
    description: 'renew token',
    returns: credentialSchema,
    middleware: [isAuthentified],
  },
  tokenController.get
);

registerApi(
  {
    router,
    route: '/token',
    method: 'post',
    description: 'create an access token',
    params: schema().object({
      email: schema().string().required().description('Account'),
      password: schema().string().required().description('Account password'),
    }),
    returns: credentialSchema,
  },
    tokenController.login
);
export default router;
