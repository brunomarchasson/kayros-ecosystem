const required = (value, ruleOptions, input, localize) => {
  const ErrorMessage = ruleOptions.message ?? typeof ruleOptions === 'string'
    ? ruleOptions
    : localize('form-validation-is-required', input.label);

  if (value == null) return ErrorMessage;
  if (value === undefined) return ErrorMessage;
  if (value === '') return ErrorMessage;
  return null;
};

const patern = (value, ruleOptions, input) => {
  const ErrorMessage = ruleOptions.message ?? `${input.label} don't match patern`;
  if (!(ruleOptions.value ?? ruleOptions).test(value)) return ErrorMessage;
  return null;
};

const email = (value, ruleOptions, input, localize) => {
  // eslint-disable-next-line max-len
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return patern(
    value,
    {
      value: regex,
      message: ruleOptions.message ?? localize('form-validation-bad-email'),
    },
    input,
    localize,
  );
};
const validateFct = (value, ruleOptions, input) => ruleOptions(value, input);
export const rules = {
  required,
  email,
  patern,
  validate: validateFct,
};

const validateRule = (rule, ruleOptions, input, value, localize) => rules[rule](value, ruleOptions, input, localize);

export const validate = (input, value, localize) => {
  const errors = Object.entries(input.validate || {})
    .map(([rule, ruleOptions]) => validateRule(rule, ruleOptions, input, value, localize))
    .filter((e) => e);
  errors.items = value?.map && value.map((v) => Object.entries(input.validateItems)
    .map(([rule, ruleOptions]) => validateRule(rule, ruleOptions, input, v, localize))
    .filter((e) => e));
  return errors;
};
