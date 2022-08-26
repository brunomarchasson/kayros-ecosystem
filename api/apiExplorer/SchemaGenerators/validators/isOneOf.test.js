import validators from '.';

describe('isOneOf', () => {
  it('should accept null', () => {
    expect(validators.isOneOf([1, 2, 3])(null)).toEqual(null);
  });
  it('should accept value of list', () => {
    expect(validators.isOneOf([1, 2, 3])(2)).toEqual(null);
  });
  it('should reject value of list', () => {
    expect(validators.isOneOf([1, 2, 3])(4)).toMatchObject({
      error: 'must be one of [1, 2, 3]',
    });
  });
});
