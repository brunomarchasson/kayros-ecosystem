import { schema } from '../apiExplorer'

export const accountSchema = schema().object({
  id: schema().number().description('Unique ID in Database'),
  email: schema().string().required().description('Account Email'),
  first_name: schema().string().required().description('Account First name'),
  last_name: schema().string().required().description('Account Last name'),
  language: schema().string().description('Account Language (FR/EN)'),
  dark_theme: schema()
    .boolean()
    .description('Account Theme (true when dark, false when light)'),
  ts_inserted: schema().date().description('Creation date (Timestamp)'),
});

export default accountSchema;
