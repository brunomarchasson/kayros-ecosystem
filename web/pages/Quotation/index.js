import React from 'react'
import PropTypes from 'prop-types'
import QuotationPlan from './QuotationPlan'
import Box from '@mui/material/Box';
import { QuotationProvider } from './context';


function Quotation(props) {
  return (
<QuotationProvider>
    <Box sx={{display: 'flex', flexDirecion: 'row'}}>
    <QuotationPlan />
    <QuotationForm />
    <div>Quotation</div>
    </Box>
</QuotationProvider>
  )
}

Quotation.propTypes = {}

export default Quotation
