import { schema } from '../apiExplorer';

export const rollSchema = schema().object({
  rollId: schema().string().required().description('EAN Séq bob'),
  articleId: schema().number().required().description('Roll Id'),
  providerId: schema().number().required().description('Provider ID'),
  width: schema().number().required().description('Roll width'),
  length: schema().number().required().description('Roll length'),
  rollIdx: schema().number().required().description('Roll index'),
  label: schema().string().required().description('Roll label'),
  location: schema().string().required().description('Roll location'),
  inputDate: schema().date().description('Roll input date'),
  lastCheckTs: schema().date().description('Roll last check date'),
  status: schema()
    .string()
    .required()
    .oneOf(['L', 'R', 'Z'])
    .description('Roll status'),
  bookings: schema().array(
    schema().object({
      orderId: schema().number().required().description('Order Id'),
      orderIndex: schema().number().required().description('Order index'),
      orderLine: schema().number().required().description('Order line'),
      bookedLength: schema()
        .number()
        .required()
        .description('Order booked length'),
    }),
  ),
});

export default rollSchema;
