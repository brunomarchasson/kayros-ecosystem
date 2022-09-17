import express from 'express';
import { registerApi, schema } from '../apiExplorer';
import paramsController from '../controller/params.controller';

const router = express.Router();
registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'List application parameters',
    returns: schema().object({
      PROJECT_STEPS: schema().object(),
      PROJECT_STATUS: schema().object(),
    }),
  },
  paramsController.get

);

export default router;
