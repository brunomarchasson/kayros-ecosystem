module.exports =  function isOneOf(list) {
  return function isOneOfList(value) {
    if (value == null) return null;

    if (!list.includes(value)) {
      return { error: `must be one of [${list.join(', ')}]` };
    }
    return null;
  };
}
