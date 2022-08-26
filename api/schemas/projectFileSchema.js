import {  schema } from '../apiExplorer';
import { tsSchema } from './genericSchemas';

export const projectFileSchema = schema()
  .object({
    id: schema().number().description('project file ID'),
    id_project: schema().number().description('project ID'),
    name: schema().string().required().description('project file name'),
    type: schema().string().required().description('project file type'),
    path: schema().string().required().description('project file path'),
    status: schema().number().oneOf([0, 1, 2, 3]).description('A DEFINIR'),
  })
  .combine(tsSchema);

export default projectFileSchema;
