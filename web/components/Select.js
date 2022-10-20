import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

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
  error,
  required,
  ...rest
}, ref) => {
  const [currentOption, setCurrentOption] = useState(null);

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
      error={ error }
      renderOption={ (props, option) => (
        <li { ...props } key={ option.value }>
          { option?.label }
        </li>
      ) }
      renderInput={ (params) => (
        <TextField
          { ...params }
          inputRef={ ref }
          error={ error }
          label={ label }
          helperText={ helperText }
          required={ required }
          InputProps={ {
            ...inputProps,
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
  value: PropTypes.any,
  onChange: PropTypes.func,
  helperText: PropTypes.string,
  loading: PropTypes.bool,
};

export default Select;
