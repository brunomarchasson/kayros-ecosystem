import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import rollController from '../../controller/roll.controller';
import rollSchema from '../../schemas/rollSchema';
import providerRoutes from './provider';
import articleRoutes from './article';
import productRoutes from './product';
import rollRoutes from './roll';

const router = express.Router();

router.use('/provider',  providerRoutes);
router.use('/product',  productRoutes);
router.use('/article',  articleRoutes);

registerApi(
  {
    router,
    route: '/',
    method: 'post',
    description: 'Add new roll',
    params: schema().object({
      mode: schema()
        .string()
        .required()
        .oneOf(['L', 'I'])
        .description('input mode I ( Inventory) / L (delivery )'),
      rollIdCode: schema().string().required().description('rollId code'),
      productIdCode: schema().string().required().description('productId code'),
      rollDetailCode: schema()
        .string()
        .required()
        .description('rollDetail code'),
      bestBeforeCode: schema().string().description('bestBefore code'),
      length: schema().number().description('roll length'),
      location: schema().string().description('roll locationh'),
    }),
    returns: rollSchema,
  },
  rollController.post
);

registerApi(
  {
    router,
    route: '/article/:id',
    method: 'get',
    description: 'getArticle',
    params: schema().object({
      mode: schema()
        .string()
        .required()
        .oneOf(['L', 'I'])
        .description('input mode I ( Inventory) / L (delivery )'),
      rollIdCode: schema().string().required().description('rollId code'),
      productIdCode: schema().string().required().description('productId code'),
      rollDetailCode: schema()
        .string()
        .required()
        .description('rollDetail code'),
      bestBeforeCode: schema().string().description('bestBefore code'),
      length: schema().number().description('roll length'),
      location: schema().string().description('roll locationh'),
    }),
    returns: rollSchema,
  },
  rollController.post
);

router.use('/:rollId', rollRoutes);
export default router;
