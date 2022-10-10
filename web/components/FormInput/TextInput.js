import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { formatErrorMessage } from './errors';

function TextInput({
  control, name, label, rules, defaultValue,...rest
}) {
  return (
    <Controller
      control={ control }
      name={ name }
      defaultValue={ defaultValue }
      rules={ rules }
      render={ ({ field, fieldState, formState }) => (
        <TextField
          { ...field }
          {...rest}
          error={ fieldState.error }
          helperText={ formatErrorMessage(label, field, fieldState) }
          label={ label }
          required={ rules?.required }
          inputProps={ { required: false,
          maxLength:rules?.maxLength} }
        />
      ) }
    />
  );
}

TextInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
};

export default TextInput;
