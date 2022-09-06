import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { formatErrorMessage } from './errors';


function SelectInput({
  control,
  name,
  multiple,
  options,
  label,
  rules,
  defaultValue = null,
  inputProps,
}) {
  return (
    <Controller
      control={ control }
      name={ name }
      rules={ rules }
      defaultValue={ defaultValue }
      render={ ({ field: { ref, onChange, ...field }, fieldState }) => (
        <Autocomplete
          multiple={ multiple }
          options={ options }
          defaultValue={ defaultValue ?? null }
          getOptionLabel={ (option) => option?.label ?? '' }
          onChange={ (_, data) => onChange(data) }
          renderInput={ (params) => (
            <TextField
              { ...field }
              { ...params }
              inputRef={ ref }
              label={ label }
              required={ rules?.required }
              error={ fieldState.error }
              helperText={ formatErrorMessage(label, field, fieldState) }
              InputProps={ {
                required: false,
                ...params.InputProps,
              } }
            />
          ) }
          { ...inputProps }
        />
      ) }
    />
  );
}

SelectInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
  multiple: PropTypes.bool,
  options: PropTypes.array,
};

export default SelectInput;
