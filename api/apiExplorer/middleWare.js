// import util from 'util';
const ValidationError = require('./SchemaGenerators/ValidationError');

const validateSchemaMW = (apiConfig) => async (req, res, next) => {
  const allData = {
    ...req.params,
    ...req.query,
    ...req.body,
    ...req.files,
    currentUser: req.currentUser,
  };
  try {
    // console.log(util.inspect(allData, false, null, true /* enable colors */));
    const formatedData = apiConfig.params
      ? apiConfig.params.validate(allData)
      : null;
    req.data = formatedData;
  } catch (e) {
    if (e instanceof ValidationError) {
      // console.error('bad request format', e);
      return res.status(400).json({ errors: e.errors[0] });
    }
    throw e;
  }
  return next();
};

module.exports = validateSchemaMW;
