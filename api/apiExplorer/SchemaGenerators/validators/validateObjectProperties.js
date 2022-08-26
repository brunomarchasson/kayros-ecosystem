const ValidationError =require('../ValidationError');

module.exports =  function validateObjectProperties(objScheme) {
  return function validateObjectPropertie(data) {
    if (!data) return null;
    if (!objScheme) return null;
    const formated = { ...data };
    const result = Object.entries(objScheme).map(([key, subSchema]) => {
      try {
        const res = subSchema.validate(data[key], key);
        formated[key] = res;
        return res;
      } catch (e) {
        if (e instanceof ValidationError) {
          return { key: e.path, errors: e.errors };
        }
        throw e;
      }
    });
    const errors = result.filter((e) => e?.errors);
    if (errors.length) {
      return { error: errors.reduce((acc, cur) => ({ ...acc, [cur.key]: cur.errors }), {}) };
    }

    return { formated };
  };
}
