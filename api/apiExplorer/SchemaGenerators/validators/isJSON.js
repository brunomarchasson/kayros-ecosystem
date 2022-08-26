module.exports =  function isJSON(value) {
  if (value == null) return null;
  if (typeof value === 'object') return null;
  try {
    return { formated: JSON.parse(value) };
  } catch {
    return { error: 'must be a valid JSON' };
  }
}
