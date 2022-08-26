import { schema } from '../apiExplorer';

export const providerSchema = schema().object({
  id: schema().number().required().description('Provider id'),
  eanCode: schema().string().required().description('Provider ean code'),
  name: schema().string().required().description('Provider name'),
  codeCount: schema().number().required().description('ean code counr'),
});

export default providerSchema;
