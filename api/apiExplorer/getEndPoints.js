/* eslint-disable max-len */
const regExpToParseExpressPathRegExp = /^\/\^\\\/(?:(:?[\w\\.-]*(?:\\\/:?[\w\\.-]*)*)|(\(\?:\(\[\^\\\/]\+\?\)\)))\\\/.*/;
const regExpToReplaceExpressPathRegExpParams = /\(\?:\(\[\^\\\/]\+\?\)\)/;
const regexpExpressParamRegexp = /\(\?:\(\[\^\\\/]\+\?\)\)/g;

const EXPRESS_ROOT_PATH_REGEXP_VALUE = '/^\\/?(?=\\/|$)/i';
const STACK_ITEM_VALID_NAMES = ['router', 'bound dispatch', 'mounted_app'];

/**
 * Returns all the verbs detected for the passed route
 */
const getRouteMethods = (route) => {
  let methods = Object.keys(route.methods);

  methods = methods.filter((method) => method !== '_all');
  methods = methods.map((method) => method.toUpperCase());

  return methods;
};

/**
 * Returns the names (or anonymous) of all the middlewares attached to the
 * passed route
 * @param {Object} route
 * @returns {string[]}
 */
const getRouteMiddlewares = (route) => route.stack.map((item) => item.handle.name || 'anonymous');

/**
 * Returns true if found regexp related with express params
 * @param {string} expressPathRegExp
 * @returns {boolean}
 */
const hasParams = (expressPathRegExp) => regexpExpressParamRegexp.test(expressPathRegExp);

/**
 * @param {Object} route Express route object to be parsed
 * @param {string} basePath The basePath the route is on
 * @return {Object[]} Endpoints info
 */
const parseExpressRoute = (route, basePath) => {
  const paths = [];

  if (Array.isArray(route.path)) {
    paths.push(...route.path);
  } else {
    paths.push(route.path);
  }

  const endpoints = paths.map((path) => {
    const completePath = basePath && path === '/' ? basePath : `${basePath}${path}`;
    const endpoint = {
      path: completePath,
      apiExplorer: route.apiExplorer,
      methods: getRouteMethods(route),
      middlewares: getRouteMiddlewares(route),
    };

    return endpoint;
  });
  return endpoints;
};

/**
 * @param {RegExp} expressPathRegExp
 * @param {Object[]} params
 * @returns {string}
 */
const parseExpressPath = (expressPathRegExp, params) => {
  let expressPathRegExpExec = regExpToParseExpressPathRegExp.exec(expressPathRegExp);
  let parsedRegExp = expressPathRegExp.toString();
  let paramIndex = 0;

  while (hasParams(parsedRegExp)) {
    const paramName = params[paramIndex].name;
    const paramId = `:${paramName}`;

    parsedRegExp = parsedRegExp.replace(
      regExpToReplaceExpressPathRegExpParams,
      paramId,
    );

    paramIndex++;
  }

  if (parsedRegExp !== expressPathRegExp.toString()) {
    expressPathRegExpExec = regExpToParseExpressPathRegExp.exec(parsedRegExp);
  }

  const parsedPath = expressPathRegExpExec[1].replace(/\\\//g, '/');

  return parsedPath;
};

/**
 * @param {Object} app
 * @param {string} [basePath]
 * @param {Object[]} [endpoints]
 * @returns {Object[]}
 */
const parseEndpoints = (app, basePath, endpoints) => {
  // eslint-disable-next-line no-underscore-dangle
  const stack = app.stack || (app._router && app._router.stack);
  endpoints = endpoints || [];
  basePath = basePath || '';

  if (!stack) {
    endpoints = addEndpoints(endpoints, [
      {
        path: basePath,
        methods: [],
        middlewares: [],
      },
    ]);
  } else {
    endpoints = parseStack(stack, basePath, endpoints);
  }
  return endpoints;
};

/**
 * Add endpoint to list of detected endPonts
 *
 * @param {Object[]} currentEndpoints Array of current endpoints
 * @param {Object[]} endpointsToAdd New endpoints to be added to the array
 * @returns {Object[]} Updated endpoints array
 */
const addEndpoints = (currentEndpoints, endpointsToAdd) => {
  endpointsToAdd.forEach((newEndpoint) => {
    currentEndpoints.push(newEndpoint);
  });

  return currentEndpoints;
};

/**
 * @param {Object} stack
 * @param {string} basePath
 * @param {Object[]} endpoints
 * @returns {Object[]}
 */
const parseStack = (stack, basePath, endpoints) => {
  stack.forEach((stackItem) => {
    if (stackItem.route) {
      const newEndpoints = parseExpressRoute(stackItem.route, basePath);

      endpoints = addEndpoints(endpoints, newEndpoints);
    } else if (STACK_ITEM_VALID_NAMES.includes(stackItem.name)) {
      const isExpressPathRegexp = regExpToParseExpressPathRegExp.test(
        stackItem.regexp,
      );

      let newBasePath = basePath;

      if (isExpressPathRegexp) {
        const parsedPath = parseExpressPath(stackItem.regexp, stackItem.keys);

        newBasePath += `/${parsedPath}`;
      } else if (
        !stackItem.path
        && stackItem.regexp
        && stackItem.regexp.toString() !== EXPRESS_ROOT_PATH_REGEXP_VALUE
      ) {
        const regExpPath = ` RegExp(${stackItem.regexp}) `;

        newBasePath += `/${regExpPath}`;
      }

      endpoints = parseEndpoints(stackItem.handle, newBasePath, endpoints);
    }
  });
  return endpoints;
};

/**
 * Returns an array  all the detected endpoints
 * @param {Object} app the express/route instance to get the endpoints from
 * @returns {Object[]}
 */
const getEndpoints = (app) => {
  const endpoints = parseEndpoints(app);

  return endpoints;
};

exports.getEndpoints = getEndpoints;
exports.defaults = { getEndpoints };
