const ValidationError = require( './ValidationError');
const validators = require( './validators');

class SchemaClass {
  constructor() {
    this.result = {};
    this.validators = [];
  }

  toJSON() {
    return this.result;
  }

  combine(otherschema) {
    if (this.result.type === 'object' && otherschema.result.type === 'object') {
      this.result.properties = {
        ...this.result.properties,
        ...otherschema.result.properties,
      };
      this.validators = [...this.validators, ...otherschema.validators];
    } else {
      console.error('SchemaGenerator: can only combine objects');
    }
    return this;
  }

  validate(data, path) {
    let formated = data;
    const errors = this.validators
      .map((validator) => {
        try {
          const res = validator(data);
          if (res?.formated != null) {
            // ?.hasAttribute?.("formated")) {
            formated = res.formated;
            data = formated;
            return res.error;
          }
          return res?.error;
        } catch (e) {
          if (e instanceof ValidationError) {
            return { key: e.path, errors: e.errors };
          }
          throw e; // let others bubble up
        }
      })
      .filter((e) => e);
    if (errors.length) throw new ValidationError(errors, data, path);
    return formated;
  }

  object(o) {
    this.result = {
      ...this.result,
      type: 'object',
      properties: o,
    };
    this.validators.push(validators.isObject);
    this.validators.push(validators.validateObjectProperties(o));
    return this;
  }

  blob(fileName) {
    this.result = { ...this.result, type: 'blob', fileName };
    return this;
  }

  string() {
    this.result = { ...this.result, type: 'string' };
    this.validators.push(validators.isString);
    return this;
  }

  number() {
    this.result = { ...this.result, type: 'number' };
    this.validators.push(validators.isNumber);
    return this;
  }

  file() {
    this.result = { ...this.result, type: 'file' };
    this.validators.push(validators.isFile);
    return this;
  }

  file64() {
    this.result = { ...this.result, type: 'file64' };
    this.validators.push(validators.isFile64);
    return this;
  }

  boolean() {
    this.result = { ...this.result, type: 'boolean' };
    this.validators.push(validators.isBoolean);
    return this;
  }

  date() {
    this.result = { ...this.result, type: 'date' };
    this.validators.push(validators.isDate);
    return this;
  }

  JSON(o) {
    this.result = {
      ...this.result,
      type: 'json',
    };
    this.validators.push(validators.isJSON);
    this.validators.push(validators.isObject);
    this.validators.push(validators.validateObjectProperties(o));

    // this.result = { ...this.result, type: 'JSON' };
    return this;
  }

  array(itemSchema) {
    this.result = {
      ...this.result,
      type: 'array',
      item: itemSchema,
    };
    this.validators.push(validators.isArray);
    this.validators.push(validators.validateArrayItems(itemSchema));

    return this;
  }

  required() {
    this.result = { ...this.result, required: true };
    this.validators.push(validators.isRequired);
    return this;
  }

  oneOf(list) {
    this.result = { ...this.result, type: 'oneof', oneOf: list };
    this.validators.push(validators.isOneOf(list));
    return this;
  }

  description(d) {
    this.result = { ...this.result, description: d };
    return this;
  }
}

const schema = () => new SchemaClass();

exports.default = SchemaClass;
exports.schema = schema

// module.exports ={
//   default: SchemaClass,
//   schema,
// }
