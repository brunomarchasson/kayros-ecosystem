import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Button, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';


function QuotationResult({ result, onClose }) {
  console.log(result);
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>
        { t('quotation.result.title') }
      </DialogTitle>
      <DialogContent>
        { t('quotation.result.title') }
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose }>t('quotation.result.quit')</Button>
        <Button onClick={ onClose } autoFocus>
          t('quotation.result.validate')
        </Button>
      </DialogActions>
    </>

  );
}

QuotationResult.propTypes = {};

export default QuotationResult;

