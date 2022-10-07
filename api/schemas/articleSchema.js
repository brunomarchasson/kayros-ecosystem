import { schema } from '../apiExplorer';

export const articleSchema = schema().object({
  id: schema().number(),
  TypeArticle: schema().string(),//.oneOf(['SUP', 'PEL', 'DORC', 'DORF', 'VER', 'MAN']),
  Designation: schema().string(),
  Famille:schema().string(),
  SousFamille:schema().string(),
  TYPE_MAJ:schema().string(),
  DATE_MAJ:schema().date(),

});

export default articleSchema;
