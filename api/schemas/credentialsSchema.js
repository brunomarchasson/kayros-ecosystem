import { schema } from '../apiExplorer';
import { accountSchema } from './accountSchema';

export const credentialSchema = schema().object({
  success: schema().boolean().description('Login is successfull'),
  token: schema()
    .string()
    .required()
    .description('Account token used in app for connexion'),
});

export default credentialSchema;
