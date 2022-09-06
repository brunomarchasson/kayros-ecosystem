import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import { formatErrorMessage } from './errors';

const NumberFormatCustom = React.forwardRef((
  props,
  ref,
) => {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      { ...other }
      getInputRef={ ref }
      onValueChange={ (values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      } }
      thousandSeparator=" "
      isNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function NumberInput({
  control,
  name,
  label,
  rules,
  defaultValue,
}) {
  return (
    <Controller
      control={ control }
      name={ name }
      defaultValue={ defaultValue }
      rules={ rules }
      render={ ({ field, fieldState }) => (
        <TextField
          { ...field }
          label={ label }
          InputProps={ {
            inputComponent: NumberFormatCustom,
            required: false,
          } }
          required={ rules?.required }
          error={ fieldState.error }
          helperText={ formatErrorMessage(label, field, fieldState) }

        />
      ) }
    />
  );
}

NumberInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
};

export default NumberInput;
