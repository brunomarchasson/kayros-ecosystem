import { schema } from '.';
import ValidationError from './ValidationError';
import validators from './validators';

describe('SchemaGeneration', () => {
  it('should create a string schema', () => {
    const s = schema().string();
    expect(s.result).toMatchObject({
      type: 'string',
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(expect.arrayContaining([validators.isString]));
  });

  it('should create a number schema', () => {
    const s = schema().number();
    expect(s.result).toMatchObject({
      type: 'number',
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(expect.arrayContaining([validators.isNumber]));
  });

  it('should create a boolean schema', () => {
    const s = schema().boolean();
    expect(s.result).toMatchObject({
      type: 'boolean',
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(
      expect.arrayContaining([validators.isBoolean]),
    );
  });

  it('should create a date schema', () => {
    const s = schema().date();
    expect(s.result).toMatchObject({
      type: 'date',
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(expect.arrayContaining([validators.isDate]));
  });

  it('should create a file schema', () => {
    const s = schema().file();
    expect(s.result).toMatchObject({
      type: 'file',
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(expect.arrayContaining([validators.isFile]));
  });

  it('should create a json schema', () => {
    const s = schema().JSON();
    expect(s.result).toMatchObject({
      type: 'json',
    });

    expect(s.validators.length).toBe(3);

    expect(s.validators).toEqual(expect.arrayContaining([validators.isJSON]));
  });

  it('should create an object schema', () => {
    const obj = {};
    const s = schema().object(obj);
    expect(s.result).toMatchObject({
      type: 'object',
    });

    expect(s.validators.length).toBe(2);

    expect(s.validators.map((v) => `${v}`)).toEqual(
      expect.arrayContaining([
        `${validators.isObject}`,
        `${validators.validateObjectProperties(obj)}`,
      ]),
    );
  });

  it('should create a array schema', () => {
    const itemSchema = schema().string();
    const s = schema().array(itemSchema);
    expect(s.result).toMatchObject({
      type: 'array',
    });

    expect(s.validators.length).toBe(2);

    expect(s.validators.map((v) => `${v}`)).toEqual(
      expect.arrayContaining([
        `${validators.isArray}`,
        `${validators.validateArrayItems(itemSchema)}`,
      ]),
    );
  });

  it('should add required to Schema', () => {
    const s = schema().required();
    expect(s.result).toMatchObject({
      required: true,
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators).toEqual(
      expect.arrayContaining([validators.isRequired]),
    );
  });

  it('should add oneOf to Schema', () => {
    const s = schema().oneOf([1, 2, 3]);
    expect(s.result).toMatchObject({
      oneOf: [1, 2, 3],
    });

    expect(s.validators.length).toBe(1);

    expect(s.validators.map((v) => `${v}`)).toEqual(
      expect.arrayContaining([`${validators.isOneOf([1, 2, 3])}`]),
    );
  });

  it('should add descriptions to Schema', () => {
    const s = schema().description('this is a description');
    expect(s.result).toMatchObject({
      description: 'this is a description',
    });

    expect(s.validators.length).toBe(0);
  });

  it('should combine object schemas descriptions to Schema', () => {
    const strSchema = schema().string();
    const numSchema = schema().string();
    const s1 = schema().object({
      key1: strSchema,
      key2: strSchema,
      key3: strSchema,
    });
    const s = schema()
      .object({
        key4: numSchema,
        key5: numSchema,
        key3: numSchema,
      })
      .combine(s1);

    expect(s.result).toMatchObject({
      properties: {
        key4: numSchema,
        key5: numSchema,
        key1: strSchema,
        key2: strSchema,
        key3: strSchema,
      },
    });
  });
  it('should call alll validators on validate', () => {
    const s = schema().string().required();
    s.validators = [
      jest.fn(() => 'error returned'),
      jest.fn(() => null),
      jest.fn(() => ({ error: 'this is an error' })),
      jest.fn(() => ({ formated: 'vormatedValue' })),
    ];
    const f = () => s.validate('toto');
    expect(f).toThrowError(ValidationError);
    expect(s.validators[0]).toBeCalled();
    expect(s.validators[1]).toBeCalled();
    expect(s.validators[2]).toBeCalled();
    expect(s.validators[3]).toBeCalled();
  });
});
