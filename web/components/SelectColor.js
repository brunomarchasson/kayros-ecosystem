import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useController, useForm } from 'react-hook-form';
import SelectInput from './FormInput/SelectInput';

const PROCESS_OPTIONS = {
  103: [
    { value: '4Q', label: '4 couleurs Quadri' },
    { value: '1P', label: '1 couleur Pantone' },
    { value: '2P', label: '2 couleur Pantone' },
    { value: '3P', label: '3 couleur Pantone' },
    { value: '4P', label: '4 couleur Pantone' },
  ],
  106: [
    { value: '4Q', label: '4 couleurs Quadri' },
    { value: '6H', label: '6 couleurs Hexa' },
    { value: '4Q+B', label: '4 couleurs Quadri + un blanc couvrant' },
    { value: '6H+B', label: '6 couleurs Hexa" + un blanc couvrant' },
  ],
};
function SelectColor({ process, ...rest }) {
  const {
    field,
  } = useController({
    name: rest.name,
    control: rest.control,
  });

  console.log('process', process, PROCESS_OPTIONS[process])
  useEffect(() => {
    if (!(PROCESS_OPTIONS[process] ?? []).find((o) => o.value === field?.value)) {
      field.onChange(null);
    }
  }, [process]);
  return (
    <SelectInput
      options={ PROCESS_OPTIONS[process] || [] }
      value = {field.value}
      { ...rest }
    />
  );
}

SelectColor.propTypes = {};

export default SelectColor;
