// use strict
const express = require ( 'express');
const http = require ( 'http');
const cors = require ( 'cors');
const helmet = require ( 'helmet');
const {setupLogging} = require ( "./logging");
const apiConfig = require ( './apiConfig');
const { createProxyMiddleware } =require ('http-proxy-middleware');
const axios = require('axios');
const { nextTick } = require('process');
const app = express()
const port = 3001;

setupLogging(app);
// setupProxies(app, ROUTES);


// const customRouter = function (req) {
//   const{ApiId} = req.params
//   console.log('headres', req.headers)

//   console.log(apiConfig[ApiId])
//   return apiConfig[ApiId]
// //  return 'http://localhost:8000'; // protocol + host
// };

// const options = {
//   target: 'http://xxx:8000',
//   router: customRouter,
//   changeOrigin: true,
//   secure: false,
//   on: {proxyReq: function onProxyReq(proxyReq, req, res) {
//     // add custom header to request
//     proxyReq.setHeader('x-access-token', req.headers['x-access-token'])

//   }},
//   logLevel: "debug",
//   pathRewrite: {
//     '^\/[^\/]*/' : '/' //remove /ApiId
//   }
// };

// const myProxy = createProxyMiddleware(options);
// app.enable("trust proxy");
// app.disable("x-powered-by");
// // app.use(helmet());
// app.use(cors());
// app.get('/hello', (req, resp) => {
//   return resp.send('HELLO WORLD FROM GATEWAY!');
// })

const agent = new http.Agent({
  rejectUnauthorized: false
});

app.use('/:ApiId',async  (req, res, next) => {
  const{ApiId} = req.params
  // console.log(req)
  console.log('ApiId=>',ApiId)
  // console.log('req.app=>', req.app)
  console.log('req.baseUrl=>', req.baseUrl)
  console.log('req.hostname=>', req.hostname)
  console.log('req.method=>', req.method)
  console.log('req.originalUrl=>', req.originalUrl)
  console.log('req.path=>', req.path)
  console.log('req.protocol=>', req.protocol)
  console.log('req.query=>', req.query)
  console.log('req.route=>', req.route)

  const newPath = req.path.replace('^\/[^\/]*/' , '/');
  const newUrl =  apiConfig[ApiId]
  if(!newUrl) return next()
  console.log('newPath: ', newPath)
  console.log('newUrl: ', newUrl)

  await axios.get('http://www.google.fr').then(console.log).catch(console.log)
  try{
    await axios({
      method: req.method,
      url: newUrl +newPath,
      httpAgent: agent,
      httpsAgent: agent,
      data: req.data
    })
    .then(r => {
      console.log('--> ', r)
      console.log('--> ', r.data)
      res.json(r.data)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    });
 }
 catch(err){
    console.error("GG", err);
 }

  // got[req.method](newUrl + '/'+newPath)
  // return resp.send('HELLO WORLD FROM GATEWAY!');
})

// app.use('/', createProxyMiddleware({
//   target: 'http://93.12.25.82:8850',
//   changeOrigin: true,
//   secure: false,
//   logLevel: "debug",
// }));

// app.use('/:ApiId', myProxy); // add the proxy to express

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
