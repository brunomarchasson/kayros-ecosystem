import {  schema } from '../apiExplorer';
import { tsSchema } from './genericSchemas';

export const projectSchema = schema()
  .object({
    id: schema().number().description('project ID'),
    name: schema().string().required().description('project name'),
    description: schema()
      .string()
      .required()
      .description('project description'),
    status: schema().number().oneOf([-1, 0, 1, 2, 3, 4, 5, 6]).description(`file status => 
    UPLOADING: 0,
    PROCESSING: 1,
    READY: 2,
    ERROR: 3`),
    row_num: schema().number().description('row number of dataset'),
    creation_ts: schema().date().description('creation date'),
    storeys: schema()
      .array(
        schema().object({
          name: schema().string().description("storey's name"),
          GlobalId: schema().string().description("storey's GUID"),
          elevation: schema()
            .number()
            .description('elevation of upper Stab nin storey'),
        }),
      )
      .description('storeys list'),
  })
  .combine(tsSchema);

export const projectFormSchema = schema()
  .object({
    id: schema().number().description('Project ID in database'),
    name: schema().string().required().description('Project name'),
    description: schema()
      .string()
      .required()
      .description('Project description'),
  })
  .combine(tsSchema);

export default projectSchema;
