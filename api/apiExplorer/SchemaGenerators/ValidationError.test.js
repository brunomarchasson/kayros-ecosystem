import ValidationError from './ValidationError';

describe('ValidationError', () => {
  it('should handle single error', () => {
    const err = new ValidationError('err', 13, 'rr');
    expect(err.errors).toEqual(['err']);
    expect(err.path).toEqual('rr');
    expect(err.value).toEqual(13);
    expect(err.message).toEqual('an error occurred');
  });
  it('should handle single error', () => {
    const err = new ValidationError(['err1', 'err2'], 13, 'rr');
    expect(err.errors).toEqual(['err1', 'err2']);
    expect(err.path).toEqual('rr');
    expect(err.value).toEqual(13);
    expect(err.message).toEqual('2 errors occurred');
  });
});
