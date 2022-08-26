const isArray = require('./isArray');
const isBoolean = require('./isBoolean');
const isDate = require('./isDate');
const isFile = require('./isFile');
const isFile64 = require('./isFile64');
const isJSON = require('./isJSON.js');
const isNumber = require('./isNumber');
const isObject = require('./isObject');
const isString = require('./isString');
const isOneOf = require('./isOneOf');
const isRequired = require('./isRequired');
const validateArrayItems = require('./validateArrayItems');
const validateObjectProperties = require('./validateObjectProperties');

/* Validators can return
  - null if passed
  - {formated: value} if passed and format value
  - {error: err} if a vallidation error occure
*/
module.exports = {
  isArray,
  isBoolean,
  isDate,
  isFile,
  isFile64,
  isJSON,
  isNumber,
  isObject,
  isString,
  isOneOf,
  isRequired,
  validateArrayItems,
  validateObjectProperties,
};
