import validators from '.';

describe('isDate', () => {
  // const d = new Date();
  it('should accept null', () => {
    expect(validators.isDate(null)).toEqual(null);
  });
});
