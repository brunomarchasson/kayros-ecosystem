import React from 'react';
import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import NumberInput from '../../../components/FormInput/NumberInput';
import TextInput from '../../../components/FormInput/TextInput';
import InfoPopOver from '../../../components/InfoPopOver';
import { Row } from '../components/Row';


function DescritionSection({ form }) {
  const {
    control,
  } = form;
  const { t } = useTranslation();

  return (
    <>
      <h2 id="start">{ t('quotation.titles.start') }</h2>
      <Row>
        <TextInput
          control={ control }
          name="label"
          label={ t('quotation.label') }
          rules={ {
            maxLength: 100,
            required: true,
          } }
        />
      </Row>
      <Row>
        <TextInput
          control={ control }
          name="reference"
          rules={ {
            maxLength: 50,
          } }
          label={ t('quotation.reference') }
        />
      </Row>
      <Row>
        <NumberInput
          rules={ {
            required: true,
          } }
          sx={ {
            maxWidth: '50%',
          } }
          // maxWidth={20}
          control={ control }
          name="quantyty1"
          label={ t('quotation.quantity') }
        />
      </Row>
      <Row>
        <TextInput
          control={ control }
          name="references"
          label={ t('quotation.references') }
          sx={ {
            maxWidth: '50%',
          } }
          rules={ {
            required: true,
          } }
        />
        <InfoPopOver text={ t('quotation.help') } />
      </Row>
      <Alert severity="warning">
        { t('quotation.alert') }
      </Alert>
    </>
  );
}

DescritionSection.propTypes = {
  form: PropTypes.object,
};

export default DescritionSection;
