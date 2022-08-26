import validators from '.';

describe('isRequired', () => {
  it('should reject null', () => {
    expect(validators.isRequired(null)).toMatchObject({ error: 'is required' });
  });
  it('should reject undefined', () => {
    expect(validators.isRequired(undefined)).toMatchObject({
      error: 'is required',
    });
  });
  it('should accept empty string', () => {
    expect(validators.isRequired('')).toEqual(null);
  });
  it('should accept value', () => {
    expect(validators.isRequired(1)).toEqual(null);
  });
});
