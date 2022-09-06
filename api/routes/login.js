import express from 'express';
import { registerApi, schema } from '../apiExplorer';
import { credentialSchema} from '../schemas/credentialsSchema';
import tokenControler from '../controlers/tokenControler';
import isAuthentified from '../middleware/authJWT';

const router = express.Router();

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'Get self token (JWT) when user is already logged in app',
    middleware: [isAuthentified],
    returns: credentialSchema,
  },
  tokenControler.get
);

registerApi(
  {
    router,
    route: '/',
    method: 'post',
    description: 'Process login in app',
    params: schema().object({
      email: schema().string().required().description('Account'),
      password: schema().string().required().description('Account password'),
    }),
    returns: credentialSchema,
  },
  tokenControler.login
);

export default router;
