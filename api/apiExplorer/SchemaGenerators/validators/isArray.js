module.exports = function isArray(value) {
  if (value == null) return null;

  if (typeof value === 'string') {
    try {
      return { formated: JSON.parse(value) };
    } catch {
      // continue regardless of error
    }
  }
  if (!Array.isArray(value)) return { error: 'must be an array' };
  return { formated: value };
}
