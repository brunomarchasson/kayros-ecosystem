import validators from '.';

describe('isJSON', () => {
  const d = new Date();
  it('should accept null', () => {
    expect(validators.isJSON(null)).toEqual(null);
  });
  it('should accept JSON', () => {
    expect(validators.isJSON('{"toto": "tata"}')).toMatchObject({
      formated: { toto: 'tata' },
    });
  });
  it('should reject invalid string', () => {
    expect(validators.isJSON('toto')).toMatchObject({error: 'must be a valid JSON'});
  });
});