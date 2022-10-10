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
  // const [currentOption, setCurrentOption] = useState(null);
  // console.log(name, currentOption);
  // const {
  //   field,
  //   fieldState,
  // } = useController({
  //   name,
  //   control,
  //   rules,
  //   defaultValue,
  // });

  // if (name === 'shape') console.log(field.value, currentOption);
  // const handleChange = (_, o) => {
  //   setCurrentOption(o);
  // };

  // useEffect(() => {
  //   field.onChange(currentOption?.value);
  // }, [currentOption]);

  // useEffect(() => {
  //   setCurrentOption(options.find((o) => o.value === field.value) ?? null);
  // }, [field.value]);


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
