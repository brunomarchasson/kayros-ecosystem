import validators from '.';

describe('isDate', () => {
  const d = new Date();
  it('should accept null', () => {
    expect(validators.isDate(null)).toEqual(null);
  });
  it('should accept date', () => {
    expect(validators.isDate(d)).toMatchObject({ formated: d });
  });
  it('should accept valid string', () => {
    expect(validators.isDate('01/01/2020')).toMatchObject({
      formated: '01/01/2020',
    });
  });
  it('should reject invalid string', () => {
    expect(validators.isDate('toto')).toMatchObject({ error: 'must be a date' });
  });
});
