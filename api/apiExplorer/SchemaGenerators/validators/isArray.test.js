import validators from '.';

describe('isArray', () => {
  it('should accept null', () => {
    expect(validators.isArray(null)).toEqual(null);
  });
  it('should accept empty array', () => {
    expect(validators.isArray([])).toMatchObject({ formated: [] });
  });
  it('should accept array', () => {
    expect(validators.isArray([1, 2, 3])).toMatchObject({
      formated: [1, 2, 3],
    });
  });
  it('should reject string', () => {
    expect(validators.isArray('toto')).toMatchObject({
      error: 'must be an array',
    });
  });
  it('should reject int', () => {
    expect(validators.isArray(5)).toMatchObject({ error: 'must be an array' });
  });
});
