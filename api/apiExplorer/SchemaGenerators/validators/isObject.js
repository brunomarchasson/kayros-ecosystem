module.exports = function isObject(value) {
  const error = 'must be an object';
  if (value == null) return null;
  if (typeof value === 'string') {
    try {
      return { formated: JSON.parse(value) };
    } catch {
      // continue regardless of error
    }
  }
  if (typeof value !== 'object') return { error };
  if (Array.isArray(value)) return { error };
  return null;
}
