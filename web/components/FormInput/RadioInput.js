import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { formatErrorMessage } from './errors';
import Switch from '../Switch';
import Radios from '../Radios';

function RadioInput({
  control, name, label, defaultValue, ...rest
}) {
  return (
    <Controller
      control={ control }
      name={ name }
      defaultValue={ defaultValue }
      render={ ({ field, fieldState, formState }) => (
        <Radios
          { ...field }
          { ...rest }
          label={ label }
        />
      ) }
    />
  );
}

RadioInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
};

export default RadioInput;
