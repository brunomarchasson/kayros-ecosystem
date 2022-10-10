import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useController } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Select = React.forwardRef(({
  multiple,
  options,
  value,
  onChange,
  label,
  helperText,
  loading,
  defaultValue = null,
  inputProps,
  ...rest
}, ref) => {
  const [currentOption, setCurrentOption] = useState(null);
  const { t } = useTranslation();

  const handleChange = (_, o) => {
    setCurrentOption(o);
  };

  useEffect(() => {
    onChange(currentOption?.value);
  }, [currentOption]);

  useEffect(() => {
    if (!loading) {
      setCurrentOption(options.find((o) => o.value === value) ?? null);
    }
  }, [value, loading]);

  return (
    <Autocomplete
      // ref={ ref }
      multiple={ multiple }
      loading={ loading }
      options={ options }
      defaultValue={ defaultValue ?? null }
      getOptionLabel={ (option) => option?.label ?? '' }
      isOptionEqualToValue={ (o, v) => o.value === v.value }
      onChange={ handleChange }
      value={ currentOption }
      autoSelect
      renderOption={ (props, option) => (
        <li { ...props } key={ option.value }>
          { option?.label }
        </li>
      ) }
      renderInput={ (params) => (
        <TextField
          { ...params }
          inputRef={ ref }
          label={ label }
          helperText={ helperText }
          InputProps={ {
            required: false,
            ...params.InputProps,
          } }
        />
      ) }
      { ...rest }
    />
  );
});

Select.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
  multiple: PropTypes.bool,
  options: PropTypes.array,
};

export default Select;
