const {registerApi} = require('./register');
const {schema} = require('./SchemaGenerators');
const apiExplorerRoutes = require('./routes');

exports.schema = schema
exports.registerApi = registerApi
exports.apiExplorerRoutes = apiExplorerRoutes
