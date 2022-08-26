import { schema } from '../apiExplorer';

export const productSchema = schema().object({
  id: schema().string().required().description('EAN Séq bob'),
  eanCode: schema().string().required().description('product code'),
  name: schema().string().required().description('product name'),
});

export default productSchema;
