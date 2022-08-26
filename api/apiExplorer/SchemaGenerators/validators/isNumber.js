module.exports =  function isNumber(value) {
  if (value == null) return null;
  const formated = parseFloat(value, 10);
  if (Number.isNaN(formated)) return { error: 'invalid number' };
  return {
    formated,
  };
}
