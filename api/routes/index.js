import express from 'express';
import token from './token';
import params from './params';
import roll from './rolls';
import loginRoutes from './login';
import provider from './provider';
import product from './product';
import isAuthentified from '../middleware/authJWT';
import { apiExplorerRoutes, registerApi, schema } from '../apiExplorer';

const router = express.Router();

router.use('/login', loginRoutes);
router.use('/token', token);
router.use('/apiExplorer', apiExplorerRoutes);
router.use('/roll', [isAuthentified], roll);
router.use('/provider', [isAuthentified], provider);
router.use('/product', [isAuthentified], product);
router.use('/params', [isAuthentified], params);
registerApi(
  {
    router,
    route: '/hello',
    method: 'get',
    description: 'Service discover',

    returns: schema().object({
      url: schema().string().required(),
    }),
  },
  async (req, res) => {
    res.sendResult({
      url: process.env.API_ORIGIN,
    });
  },
);

export default router;
