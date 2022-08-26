import {  schema } from '../apiExplorer';

export const paginationSchema = schema().object({
  sortKey: schema()
    .string()
    .description('Sorting key, must be a DB column name'),
  isSortAscending: schema()
    .boolean()
    .description('Sort ASCending if true, else DESCending'),
  lastItem: schema()
    .JSON()
    .description(
      'JSON stringified of last item fetched. Must contains at least id and [sortKey]',
    ),
});

export const tsSchema = schema().object({
  ts_inserted: schema().date().description('Inserted date'),
  ts_updated: schema().date().description('Last update date'),
  ts_deleted: schema().date().description('Deleted date'),
});

export const positionSchema = schema().object({
  x: schema()
    .number()
    .required()
    .description('x distance in m from scene origin'),
  y: schema()
    .number()
    .required()
    .description('y distance in m from scene origin'),
  z: schema()
    .number()
    .required()
    .description('z distance in m from scene origin'),
});

export default paginationSchema;
