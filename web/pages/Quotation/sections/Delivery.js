import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useController } from 'react-hook-form';
import { CountrySelect } from '../../../components/FormInput/CountrySelect';
import { PostCode } from '../../../components/FormInput/PostCode';

function DeliverySection({ form }) {
  const { control } = form;
  const { t } = useTranslation();

  const { field: postcodeField } = useController({
    name: 'postcode',
    control,
  });
  const { field: countryField } = useController({
    name: 'country',
    control,
  });

  return (
    <>
      <h2 id="delivery">{ t('quotation.titles.delivery') }</h2>
      <CountrySelect
        label={ t('quotation.delivery.country') }
        { ...countryField }
        onChange={ (_, o) => countryField.onChange(o) }
      />
      <PostCode { ...postcodeField } />
    </>
  );
}

DeliverySection.propTypes = {
  form: PropTypes.object,
};

export default DeliverySection;
