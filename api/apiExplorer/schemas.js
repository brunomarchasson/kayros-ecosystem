const { schema } =require('./SchemaGenerators');

const apiEplorerParam = schema().object({
  name: schema().string(),
  type: schema().string(),
  description: schema().string(),
  required: schema().boolean(),
  fileName: schema().string(),
});

const apiEplorerRoute  = schema().object({
  route: schema().string().required(),
  param: apiEplorerParam,
  returns: apiEplorerParam,
});

const testSchema = schema().object({
  id: schema().string().required().description('i am an id'),
  str_req: schema().string().required().description('i am a string'),
  int_req: schema().number().required().description('i am a number'),
  date_req: schema().date().required().description('i am a date'),
  bool_req: schema().boolean().required().description('i am a boolean'),
  file_req: schema().file().required().description('i am a file'),
  oneof_req: schema().number().oneOf([0,1,2,3]).required().description(`file status => 
  UPLOADING: 0,
  PROCESSING: 1,
  READY: 2,
  ERROR: 3`),
  json_req: schema().JSON().required().description('i am a stringified json'),
  obj: schema()
    .object({
      int_req: schema().number().required().description('i am a number'),
      str_req: schema().string().required().description('i am a string'),
    })
    .description('i am an object')
    .required(),
  obj_arr: schema()
    .description('i am an array')
    .array(
      schema().object({
        int_req: schema().number().required().description('i am a number'),
        str_req: schema().string().required().description('i am a string'),
      }),
    ),
  str_arr: schema().array(schema().string()),
});

exports.apiEplorerParam = apiEplorerParam;
exports.apiEplorerRoute = apiEplorerRoute;
exports.apiEplorerSchema =  schema().array(apiEplorerRoute);
exports.testSchema =  testSchema;