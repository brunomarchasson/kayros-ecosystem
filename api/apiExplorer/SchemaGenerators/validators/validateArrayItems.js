const ValidationError =require('../ValidationError');

module.exports = function validateArrayItems(itemSchema) {
  return function validateArrayItem(items) {
    if (!items) return null;
    const formated = [];
    const result = items.map((item, i) => {
      try {
        const r = itemSchema.validate(item);
        formated.push(r);
      } catch (e) {
        if (e instanceof ValidationError) {
          return { key: i, errors: e.errors };
        }
        throw e;
      }
      return null;
    });
    const errors = result.filter((e) => e?.errors);

    if (errors.length) {
      return {
        error: {
          items: errors.reduce(
            (acc, cur) => ({ ...acc, [cur.key]: cur.errors }),
            {},
          ),
        },
      };
    }
    return { formated };
  };
}
