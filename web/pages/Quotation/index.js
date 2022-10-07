import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { QuotationProvider } from './context';
import QuotationForm from './QuotationForm';
import TableOfContents from '../../components/TableOfContents';


function Quotation(props) {
  return (
    <QuotationProvider>
      <Box sx={ {
        p: 1, flex: 1, display: 'flex', flexDirecion: 'row', justifyContent: 'center', overflow: 'auto',
      } }
      >
        { /* <QuotationPlan /> */ }
        <TableOfContents />
        <QuotationForm />
      </Box>
    </QuotationProvider>
  );
}

Quotation.propTypes = {};

export default Quotation;
