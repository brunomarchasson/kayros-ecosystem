// const strReg = /\$\{\s*(\w+)\s*\}/g;

const toArray = (value) => (value == null ? [] : [].concat(value));

 class ValidationError extends Error {
  // static isError(err) {
  //   return err && err.name === 'ValidationError';
  // }

  constructor(errorOrErrors, value, field) {
    super();
    this.name = 'ValidationError';
    this.value = value;
    this.path = field;

    this.errors = [];
    toArray(errorOrErrors).forEach((err) => {
     
      this.errors.push(err);
    });
    this.message = this.errors.length > 1
      ? `${this.errors.length} errors occurred`
      : 'an error occurred';

    if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
  }
}
module.exports = ValidationError