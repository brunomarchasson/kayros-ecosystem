import validators from '.';
import ValidationError from '../ValidationError';

describe('validateObjectProperties', () => {
  it('should accept null', () => {
    expect(validators.validateObjectProperties({})(null)).toEqual(null);
  });
  it('should validate all properties', () => {
    const objSchema = {
      p1: {
        validate: jest.fn((e) => null),
      },
      p2: {
        validate: jest.fn((e) => ({ formated: 'formatedValue' })),
      },
    };
    const res = validators.validateObjectProperties(objSchema)({
      p1: 'toto',
      p2: 'tata',
    });
    expect(objSchema.p1.validate).toHaveBeenCalledWith('toto', 'p1');
    expect(objSchema.p2.validate).toHaveBeenCalledWith('tata', 'p2');
  });
  it('should propagate errors', () => {
    const objSchema = {
      p1: {
        validate: jest.fn((e) => {
          throw new ValidationError(['error 1'], e, 'p1');
        }),
      },
      p2: {
        validate: jest.fn((e) => {
          throw new ValidationError(['error 2'], e, 'p2');
        }),
      },
    };
    const res = validators.validateObjectProperties(objSchema)({
      p1: 'toto',
      p2: 'tata',
    });
    expect(objSchema.p1.validate).toHaveBeenCalledWith('toto', 'p1');
    expect(objSchema.p2.validate).toHaveBeenCalledWith('tata', 'p2');

    expect(res).toEqual({
      error: {
        p1: ['error 1'],
        p2: ['error 2'],
      },
    });
  });
});
