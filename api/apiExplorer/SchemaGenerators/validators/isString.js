module.exports = function isString(value) {
  if (value == null) return null;

  if (typeof value !== 'string') return { error: 'must be a string' };
  return null;
}
