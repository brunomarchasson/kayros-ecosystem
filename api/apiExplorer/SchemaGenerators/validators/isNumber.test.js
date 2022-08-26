import validators from '.';

describe('isNumber', () => {
  it('should accept null', () => {
    expect(validators.isNumber(null)).toEqual(null);
  });
  it('should accept number', () => {
    expect(validators.isNumber(123)).toMatchObject({ formated: 123 });
  });
  it('should accept float', () => {
    expect(validators.isNumber(123.22)).toMatchObject({ formated: 123.22 });
  });
  it('should accept valid string', () => {
    expect(validators.isNumber('123')).toMatchObject({ formated: 123 });
  });
  it('should reject object', () => {
    expect(validators.isNumber({})).toMatchObject({ error: 'invalid number' });
  });
  it('should reject invalid string', () => {
    expect(validators.isNumber('toto')).toMatchObject({
      error: 'invalid number',
    });
  });
});
