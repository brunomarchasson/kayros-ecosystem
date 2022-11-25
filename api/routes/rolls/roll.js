import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import rollController from '../../controller/roll.controller';
import db from '../../core/db';
import rollSchema from '../../schemas/rollSchema';

const router = express.Router({ mergeParams: true });

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'getRoll',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
    }),
    returns: rollSchema,
  },
  rollController.get
);

registerApi(
  {
    router,
    route: '/location/:location',
    method: 'post',
    description: 'Update roll location',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
      location: schema().string().description('roll location'),
    }),
    returns: rollSchema,
  },
  rollController.setLocation
);

registerApi(
  {
    router,
    route: '/status/:status',
    method: 'post',
    description: 'Update roll status',
    params: schema().object({
      rollId: schema().string().description('Roll id'),
      status: schema()
        .string()
        .required()
        .oneOf(['Z', 'L', 'R'])
        .description('roll status'),
    }),
    returns: rollSchema,
  },
  rollController.setStatus
);

registerApi(
  {
    router,
    route: '/length/:length',
    method: 'post',
    description: 'Update roll length',
    params: schema().object({
      rollId: schema().string().description('EAN SEQ bob'),
      length: schema().number().required().description('roll length'),
    }),
    returns: rollSchema,
  },
  rollController.setLength
);

export default router;
