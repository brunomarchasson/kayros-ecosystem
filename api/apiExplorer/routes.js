const express = require('express');
const { registerApi } = require('./register');
const { apiEplorerSchema, testSchema } = require('./schemas');
const { getEndpoints } = require('./getEndPoints');

const router = express.Router({ mergeParams: true });

registerApi(
  {
    router,
    route: '/',
    method: 'get',
    description: 'get all routes ',
    returns: apiEplorerSchema,
  },
  async (data, returns, { req }) => {
    const routes = getEndpoints(req.app).filter((r) => r.apiExplorer);

    const formated = Object.values(routes).map((route) => ({
      route: route?.path,
      description: route.apiExplorer?.description,
      params: route.apiExplorer?.params?.toJSON?.(),
      returns: route.apiExplorer?.returns?.toJSON?.(),
      method: route.apiExplorer?.method,
      oneOf: route.apiExplorer?.oneOf,
    }));
    returns(formated);
  },
);

module.exports = router;
