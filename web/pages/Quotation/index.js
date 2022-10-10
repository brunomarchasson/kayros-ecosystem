import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import QuotationForm from './QuotationForm';
import TableOfContents from '../../components/TableOfContents';


function Quotation(props) {
  return (
    <Box sx={ {
      p: 1, flex: 1, display: 'flex', flexDirecion: 'row', justifyContent: 'center', overflow: 'auto',
    } }
    >
      { /* <QuotationPlan /> */ }
      <TableOfContents />
      <QuotationForm />
    </Box>
  );
}

Quotation.propTypes = {};

export default Quotation;
