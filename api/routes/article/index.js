import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import articleSchema from '../../schemas/articleSchema';
import articleControler from '../../controller/articleController';

const router = express.Router();

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'gat all articles',
    params: schema().object({
      type: schema().string().description('article Type'),
      date: schema().string().description('last sync date'),
    }),
    returns: schema().array(articleSchema),
  },
  articleControler.getAll
);
registerApi(
  {
    router,
    route: '/:id',
    method: 'get',
    description: 'get article',
    params: schema().object({
      id: schema().number().description('articleId'),
    }),
    returns: articleSchema,
  },
  articleControler.get
);

export default router;
