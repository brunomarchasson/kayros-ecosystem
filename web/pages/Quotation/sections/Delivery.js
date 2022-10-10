import React from 'react';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import NumberInput from '../../../components/FormInput/NumberInput';
import TextInput from '../../../components/FormInput/TextInput';
import InfoPopOver from '../../../components/InfoPopOver';
import { Row } from '../components/Row';
import LabelImage from '../components/LabelImage';
import SelectInput from '../../../components/FormInput/SelectInput';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import SelectColor from '../../../components/SelectColor';
import GlidingSelect from '../components/GlidingSelect';
import VarnishSelect from '../components/VarnishSelect';
import LaminationSelect from '../components/LaminationSelect';
import SwitchInput from '../../../components/FormInput/SwitchInput';
import CountrySelect from '../../../components/FormInput/CountrySelect';
import PostCode from '../../../components/FormInput/PostCode';

function DeliverySection({ form }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;
  const { t } = useTranslation();
  const watchPrintProcess = watch('printProcess');

  return (
    <>
      <h2 id="delivery">{ t('quotation.titles.delivery') }</h2>
      <CountrySelect label={ t('quotation.delivery.country') } />
      <PostCode />
    </>
  );
}

DeliverySection.propTypes = {};

export default DeliverySection;
