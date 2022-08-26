module.exports = function isFile64(value) {
  if (value == null) return null;

  if (typeof value !== 'string') return {error: 'must be a base64 string'};
  return null;
}
