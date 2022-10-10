import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CountrySelect from '../../components/FormInput/CountrySelect';
import PostCode from '../../components/FormInput/PostCode';
import { useApi } from '../../hooks/api';
import BackingSection from './sections/Backing';
import DeliverySection from './sections/Delivery';
import DescritionSection from './sections/Description';
import LabelDefinitionSection from './sections/LabelDefinition';
import PackagingSection from './sections/Packaging';
import PrintSection from './sections/Print';

let renderCount = 0;

const defaultValues = {
  label: 'grte',
  reference: 'aa',
  quantyty1: '100000',
  references: '1',
  shape: 1,
  width: '100',
  backing: 114,
  printProcess: 103,
  print: '3P',
  varnish: 19749,
  mandrel: 11649,
  gliddingType: '801',
  blackSpot: true,
  perforation: true,
  numberAbreast: '1',
  quantityPerSpool: '100',
  maxDiameter: '100',
  height: '100',
  winding: 1,
  output: 1,
  packagingType: 'Bo',
  labelPerfanfold: '10',
  fanfoldPerPack: '10',
  lamination: 577,
};
function QuotationForm() {
  // const {stepsRef} = useContext(QuotationContext)
  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;
  const { api } = useApi();

  const { t } = useTranslation();

  const onSubmit = async (data) => {
    try {
      const formatedData = data;
      const r = await api.post('quotation', { json: formatedData }).json();
      console.log('RES', r);
    } catch (e) {
      console.error('ERR');
      console.error(e);
    }
  };


  const watchPrintProcess = watch('printProcess');

  renderCount++;

  return (
    <Box
      sx={ {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& h2, h3 ': {
          scrollMarginTop: '16px',
        },
      } }
    >
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={ handleSubmit(onSubmit) }
        sx={ {
          padding: '1rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 600,
        } }
      >
        <DescritionSection form={ form } />
        <LabelDefinitionSection form={ form } />
        <BackingSection form={ form } />
        <PrintSection form={ form } />
        <PackagingSection form={ form } />
        <DeliverySection form={ form } />


        <Button type="submit">{ t('quotation.computeButton') }</Button>
      </Paper>
      { /* </form> */ }
    </Box>
  );
}

QuotationForm.propTypes = {};

export default QuotationForm;
