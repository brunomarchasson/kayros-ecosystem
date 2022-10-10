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


function BackingSection({ form }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;
  const { t } = useTranslation();

  return (
    <>
      <h2 id="backing">{ t('quotation.titles.backing') }</h2>
      <ArticleSelect
        type="SUP"
        control={ control }
        rules={ {
          required: true,
        } }
        name="backing"
        label={ t('quotation.backing') }
      />
    </>
  );
}

BackingSection.propTypes = {};

export default BackingSection;
