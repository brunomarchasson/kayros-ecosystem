import validators from '.';

describe('isObject', () => {
  it('should accept null', () => {
    expect(validators.isObject(null)).toEqual(null);
  });
  it('should accept empty object', () => {
    expect(validators.isObject({})).toEqual(null);
  });
  it('should reject array', () => {
    expect(validators.isObject([])).toMatchObject({
      error: 'must be an object',
    });
  });
  it('should reject string', () => {
    expect(validators.isObject('toto')).toMatchObject({
      error: 'must be an object',
    });
  });
});
