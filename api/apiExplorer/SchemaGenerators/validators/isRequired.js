module.exports =  function isRequired(value) {
  if (value == null) return { error: 'is required' };
  return null;
}
