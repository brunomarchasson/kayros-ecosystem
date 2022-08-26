const express = require('express')
const {setupLogging} = require("./logging");
const app = express()
const port = 3001;

setupLogging(app);
// setupProxies(app, ROUTES);

const { createProxyMiddleware } = require('http-proxy-middleware');

const customRouter = function (req) {
  return 'http://localhost:8080'; // protocol + host
};

const options = {
  target: 'http://localhost:8080',
  router: customRouter,
};

const myProxy = createProxyMiddleware(options);
app.use(myProxy); // add the proxy to express

app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD FROM GATEWAY!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
