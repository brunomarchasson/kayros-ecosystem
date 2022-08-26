module.exports =  function isDate(value) {
  if (value == null) return null;
  if (value instanceof Date) return { formated: value };
  const d = new Date(value);

  if (Number.isNaN(d.getTime())) return { error: 'must be a date' };
  return { formated: value };
}
