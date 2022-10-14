import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import SelectInput from './FormInput/SelectInput';


function SelectColor({ process, ...rest }) {
  const { t } = useTranslation();

  const PROCESS_OPTIONS = {
    103: [
      { value: '4Q', label: t('quotation.printOptions.4Q') }, // '4 couleurs Quadri' },
      { value: '1P', label: t('quotation.printOptions.1P') }, // '1 couleur Pantone' },
      { value: '2P', label: t('quotation.printOptions.2P') }, // '2 couleur Pantone' },
      { value: '3P', label: t('quotation.printOptions.3P') }, // '3 couleur Pantone' },
      { value: '4P', label: t('quotation.printOptions.4P') }, // '4 couleur Pantone' },
    ],
    106: [
      { value: '4Q', label: t('quotation.printOptions.4Q') }, // '4 couleurs Quadri' },
      { value: '6H', label: t('quotation.printOptions.6H') }, // '6 couleurs Hexa' },
      { value: '4Q+B', label: t('quotation.printOptions.4Q+B') }, // '4 couleurs Quadri + un blanc couvrant' },
      { value: '6H+B', label: t('quotation.printOptions.6H+B') }, // '6 couleurs Hexa" + un blanc couvrant' },
    ],
  };
  const {
    field,
  } = useController({
    name: rest.name,
    control: rest.control,
  });
  useEffect(() => {
    if (!(PROCESS_OPTIONS[process] ?? []).find((o) => o.value === field?.value)) {
      field.onChange(null);
    }
  }, [process]);
  return (
    <SelectInput
      options={ PROCESS_OPTIONS[process] || [] }
      value={ field.value }
      { ...rest }
    />
  );
}

SelectColor.propTypes = {
  process: PropTypes.number,
};

export default SelectColor;
