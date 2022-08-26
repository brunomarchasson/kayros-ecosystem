module.exports = function isBoolean(value) {
  if (value == null) return null;
  if (![1, 0, true, false, '1', '0', 'true', 'false'].includes(value)) {
    return { error: 'must be a boolean' };
  }
  const formated = ['0', 'false'].includes(value) ? false : !!value;
  return {
    formated,
  };
}
