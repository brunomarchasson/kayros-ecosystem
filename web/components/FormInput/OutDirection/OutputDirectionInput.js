import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import OutputDirection from './OutputDirection';

function OutDirectionInput({
  control,
  name,
  rules,
  defaultValue,
}) {
  return (
    <Controller
      control={ control }
      name={ name }
      defaultValue={ defaultValue }
      rules={ rules }
      render={ ({ field, r }) => <OutputDirection { ...field } { ...r } /> }
    />
  );
}

OutDirectionInput.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.object,
  defaultValue: PropTypes.number,
  inputProps: PropTypes.object,
};

export default OutDirectionInput;
