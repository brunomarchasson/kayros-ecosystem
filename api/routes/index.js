import express from 'express';
import { apiExplorerRoutes, registerApi, schema } from '../apiExplorer';
import isAuthentified from '../middleware/authJWT';
import articleRoutes from './article';
import params from './params.route';
import product from './product';
import quotationRoutes from './quotation';
import roll from './rolls';
import toolsRoutes from './tools';

const router = express.Router();

router.use('/apiExplorer', apiExplorerRoutes);
router.use('/tools', toolsRoutes);
router.use('/article', [isAuthentified], articleRoutes);
router.use('/quotation', [isAuthentified], quotationRoutes);
router.use('/roll', [isAuthentified], roll);
// router.use('/product', [isAuthentified], product);
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
      localUrl: process.env.API_LOCAL_ORIGIN,
    });
  },
);

export default router;
