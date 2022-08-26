const util = require('util');
const validateSchemaMW = require('./middleWare');
const ValidationError = require('./SchemaGenerators/ValidationError');

const registerApi = (
  {
    router, route, method = 'get', middleware = [], ...apiConfig
  },
  callback,
) => {
  const inputHandler = () => new Promise((resolve) => {
    resolve();
  });

  const resultHandler = (req, res, dataToSend) => {
    try {
      const formatedData = apiConfig.returns ? apiConfig.returns.validate(dataToSend) : null;
      res.json(formatedData);
    } catch (e) {
      if (e instanceof ValidationError) {
        console.error(e)
        return res.status(500).json({ errors: 'bad format' });
      }
      throw e;
    }
    return null;
  };

  const handler = (req, res) => inputHandler(
    req,
    res,
  )
    .then(
      () => callback(
        req.data,
        (data) => resultHandler(req, res, data),
        { req, res },
      ),
    );

  const s = router[method](
    route,
    [...middleware, validateSchemaMW(apiConfig)],
    handler,
  );
  const created = s.stack.find(
    (layer) => layer.route?.stack[layer.route.stack.length - 1].handle === handler,
  );
  created.route.apiExplorer = { ...apiConfig, method };
};

module.exports  ={registerApi}
