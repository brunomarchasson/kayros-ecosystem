import { schema } from '../apiExplorer';

export const quotationSchema = schema().object({
  id: schema().number(),
  index: schema().number(),
  label: schema().string().required(),
  reference: schema().string().required(),
  quantyty1: schema().number().required(),
  quantyty2: schema().number(),
  quantyty3: schema().number(),
  references: schema().number().required(),
  shape: schema().number().oneOf([0,1,2,3]).required().description('0: round, 1:oval, 2: rectangle, 3:special  '),
  width: schema().number().required(),
  height: schema().number().required(),
  backing: schema().number().required(),
  printProcess: schema().number().required().oneOf([103,106]).description('103 : uv flexography, 106: digital'),
  print: schema().string().required().oneOf([
  '4Q',
  '1P',
  '2P',
  '3P',
  '4P',
  '6H',
  '4Q+B',
  '6H+B',
  ]),
  gliddingType: schema().number().oneOf([801,802]).description('801: cold foil, 802:hot foil' ),
  glidding: schema().number(),
  varnish: schema().number(),
  lamination: schema().number(),
  blackSpot: schema().boolean(),
  perforation: schema().boolean(),
  packagingType: schema().string().required().oneOf(['Bo', 'Pa']),
  numberAbreast: schema().number(),
  quantityPerSpool: schema().number(),
  maxDiameter: schema().number(),
  mandrel: schema().number(),
  winding: schema().number().oneOf([0,1]).description('0: inner, 1: external'),
  output: schema().number().oneOf([0,1,2,3]).description('0: right, 1: left, 2: foot, 3: head'),
  labelPerfanfold: schema().number(),
  fanfoldPerPack: schema().number(),
  country: schema().string(),
  postcode: schema().string(),


});

export const quotationResultSchema = schema().object({
  id: schema().number(),
  index: schema().number(),
  pices: schema().array(schema().object({
    quantity: schema().number(),
    pricePerThousand: schema().number(),
  })),
  additionalCosts: schema().array(schema().object({
    label: schema().string(),
    quantity: schema().number(),
    unitPrice: schema().number()
  }))
});
