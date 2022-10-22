// use strict
const express = require ( 'express');
const cors = require ( 'cors');
const helmet = require ( 'helmet');
const {setupLogging} = require ( "./logging");
const apiConfig = require ( './apiConfig');
const { createProxyMiddleware } =require ('http-proxy-middleware');

const app = express()
const port = 3001;

setupLogging(app);
// setupProxies(app, ROUTES);


const customRouter = function (req) {
  const{ApiId} = req.params
  console.log('headres', req.headers)

  console.log(apiConfig[ApiId])
  return apiConfig[ApiId]
//  return 'http://localhost:8000'; // protocol + host
};

const options = {
  target: 'http://xxx:8000',
  router: customRouter,
  changeOrigin: true,
  secure: false,
  on: {proxyReq: function onProxyReq(proxyReq, req, res) {
    // add custom header to request
    proxyReq.setHeader('x-access-token', req.headers['x-access-token'])

  }},
  logLevel: "debug",
  pathRewrite: {
    '^\/[^\/]*/' : '/' //remove /ApiId
  }
};

const myProxy = createProxyMiddleware(options);
app.enable("trust proxy");
app.disable("x-powered-by");
// app.use(helmet());
app.use(cors());
app.get('/hello', (req, resp) => {
  return resp.send('HELLO WORLD FROM GATEWAY!');
})

app.use('/', createProxyMiddleware({
  target: 'http://93.12.25.82:8850',
  changeOrigin: true,
  secure: false,
  logLevel: "debug",
}));

// app.use('/:ApiId', myProxy); // add the proxy to express

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
