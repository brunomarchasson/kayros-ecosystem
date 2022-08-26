import validators from '.';
import ValidationError from '../ValidationError';

describe('validateArrayItems', () => {
  it('should accept null', () => {
    expect(validators.validateArrayItems({})(null)).toEqual(null);
  });
  it('should validate all items', () => {
    const objSchema = {
      validate: jest.fn((e) => e),
    };
    const res = validators.validateArrayItems(objSchema)([1, 2, 3]);
    expect(objSchema.validate).toHaveBeenCalledWith(1);
    expect(objSchema.validate).toHaveBeenCalledWith(2);
    expect(objSchema.validate).toHaveBeenCalledWith(3);
    expect(res).toEqual({ formated: [1, 2, 3] });
  });
  it('should propagate errors', () => {
    const objSchema = {
      validate: jest.fn((e) => {
        if (e < 3) {
          throw new ValidationError(['error'], e, '');
        }
        return e;
      }),
    };
    const res = validators.validateArrayItems(objSchema)([1, 2, 3, 4]);
    expect(objSchema.validate).toHaveBeenCalledWith(1);
    expect(objSchema.validate).toHaveBeenCalledWith(2);
    expect(objSchema.validate).toHaveBeenCalledWith(3);
    expect(objSchema.validate).toHaveBeenCalledWith(4);
    expect(res).toMatchObject({
      error: {
        items: {
          0: ['error'],
          1: ['error'],
        },
      },
    });
  });
});
