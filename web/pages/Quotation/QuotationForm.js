import {
  Backdrop, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ActionFeedback from '../../components/ActionFeedback';
import Loader from '../../components/Loader';
import { useApi } from '../../hooks/api';
import QuotationResult from './QuotationResult';
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
  shape: 2,
  width: '100',
  backing: 114,
  printProcess: 103,
  print: '3P',
  mandrel: 11649,
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
  // const [promise, setPromise] = useState();
  const [result, setResult] = useState();
  const [computing, setComputing] = useState(false);
  const [computeError, setComputeError] = useState();
  const form = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
  } = form;
  const { api } = useApi();

  const { t } = useTranslation();

  const onSubmit = async (data) => {
    try {
      const formatedData = data;
      // const promise = api.post('quotation', { json: formatedData, timeout: false }).json()
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('rr-');
          resolve({
            id: '123 / 0',
            prices: [{
              quantity: 12000,
              pricePerThousand: 12.2,
            },
            ],
            additionalCosts: [
              { label: 'aaa', quantity: 1, unitPrice: 24.8 },
              { label: 'bbb', quantity: 2, unitPrice: 30 },
            ],
          });
        }, 3000);
      });
      setComputeError(null);
      setResult(null);
      setComputing(true);
      console.log(promise);
      promise.then(setResult).catch(setComputeError).finally(() => setComputing(false));
      // setPromise(() => () => api.post('quotation', { json: formatedData, timeout: false }).json());
    } catch (e) {
      console.error(e);
    }
  };

  renderCount++;
  console.log(renderCount);

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
          padding: {xs: '1rem', sm: '1rem 3rem'},
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          maxWidth: 600,
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
      <Backdrop
        sx={ { color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
        open={ computing }
      >
        <Loader />
      </Backdrop>
      <Dialog
        maxWidth="lg"
        open={ !!(result && !computing) }
      >
        <QuotationResult result={ result } onClose={ () => setResult(null) } />

      </Dialog>
    </Box>
  );
}

QuotationForm.propTypes = {};

export default QuotationForm;
