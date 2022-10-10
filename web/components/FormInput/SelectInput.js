import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { formatErrorMessage } from './errors';
import Select from '../Select';

function SelectInput({
  control,
  name,
  multiple,
  options,
  label,
  rules,
  defaultValue = null,
  loading,
  inputProps,
}) {

  return (

    <Controller
      control={ control }
      name={ name }
      rules={ rules }
      defaultValue={ defaultValue }
      render={ ({ field, fieldState }) => (
        <Select
          loading={loading }
          { ...field }
          error={ fieldState.error }
          helperText={ formatErrorMessage(label, field, fieldState) }
          label={ label }
          required={ rules?.required }
          multiple={ multiple }
          options={ options }
          defaultValue={ defaultValue ?? null }
          autoSelect
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
