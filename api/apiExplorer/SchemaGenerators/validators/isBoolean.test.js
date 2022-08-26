import validators from '.';

describe('isBoolean', () => {
  it('should accept null', () => {
    expect(validators.isBoolean(null)).toEqual(null);
  });
  it('should accept 1', () => {
    expect(validators.isBoolean(1)).toMatchObject({ formated: true });
  });
  it('should accept 0', () => {
    expect(validators.isBoolean(0)).toMatchObject({ formated: false });
  });
  it('should accept "1"', () => {
    expect(validators.isBoolean('1')).toMatchObject({ formated: true });
  });
  it('should accept "0"', () => {
    expect(validators.isBoolean('0')).toMatchObject({ formated: false });
  });
  it('should accept true', () => {
    expect(validators.isBoolean(true)).toMatchObject({ formated: true });
  });
  it('should accept false', () => {
    expect(validators.isBoolean(false)).toMatchObject({ formated: false });
  });
  it('should accept "true"', () => {
    expect(validators.isBoolean('true')).toMatchObject({ formated: true });
  });
  it('should accept "false"', () => {
    expect(validators.isBoolean('false')).toMatchObject({ formated: false });
  });
  it('should reject object', () => {
    expect(validators.isBoolean({})).toMatchObject({
      error: 'must be a boolean',
    });
  });
  it('should reject invalid string', () => {
    expect(validators.isBoolean('toto')).toMatchObject({
      error: 'must be a boolean',
    });
  });
});
