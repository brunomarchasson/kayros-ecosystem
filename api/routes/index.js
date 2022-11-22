import express from 'express';
import params from './params.route';
import roll from './rolls';
import articleRoutes from './article';
import quotationRoutes from './quotation';
import toolsRoutes from './tools';
import provider from './provider';
import product from './product';
import isAuthentified from '../middleware/authJWT';
import { apiExplorerRoutes, registerApi, schema } from '../apiExplorer';

const router = express.Router();

router.use('/apiExplorer', apiExplorerRoutes);
router.use('/tools', toolsRoutes);
router.use('/article', [isAuthentified], articleRoutes);
router.use('/quotation', [isAuthentified], quotationRoutes);
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
