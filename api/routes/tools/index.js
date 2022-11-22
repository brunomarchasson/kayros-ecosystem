import express from 'express';
import { registerApi, schema } from '../../apiExplorer';
import articleSchema from '../../schemas/articleSchema';
import articleControler from '../../controller/article.controller';
import  QRCode  from 'qrcode';

const router = express.Router();

registerApi(
  {
    router,
    route: '/qrcode',
    method: 'get',
    description: 'create qrcode',
    params: schema().object({
      data: schema().string().description('data to encode'),
    }),
    returns: schema().array(articleSchema),
  },
 async (req, res)=> {
  const options = {}
  try{

    const r = QRCode.toFileStream(res,req.data.data, options)
  } catch(e){
    console.error(e)
  }
 }
);

export default router;
