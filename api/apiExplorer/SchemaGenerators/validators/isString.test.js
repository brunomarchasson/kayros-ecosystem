import validators from '.';

describe('isString', () => {
  it('should accept null', () => {
    expect(validators.isString(null)).toEqual(null);
  });
  it('should accept string', () => {
    expect(validators.isString('toto')).toEqual(null);
  });
  it('should reject object', () => {
    expect(validators.isString({})).toMatchObject({
      error: 'must be a string',
    });
  });
  it('should reject number', () => {
    expect(validators.isString(123)).toMatchObject({
      error: 'must be a string',
    });
  });
});
