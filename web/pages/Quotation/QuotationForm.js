import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import { QuotationContext } from './context';

const Step = ({step}) => {
  const {stepsRef} = useContext(QuotationContext)
  const currentRef =stepsRef[stepId]
  return (<div ref={el => inputRef.current[x] = el} ></div>)
}

function QuotationForm({steps}) {
  const {stepsRef} = useContext(QuotationContext)
  return (
    <Box >
<Step step = {steps[0]}></Step>
<Box sx={{height:' 12rem'}}/>
<Step step = {steps[1]}></Step>
<Box sx={{height: '12rem'}}/>
<Step step = {steps[2]}></Step>
<Box sx={{height: '12rem'}}/>
<Step step =  {steps[3]}></Step>
<Box sx={{height: '12rem'}}/>
<Step step = {steps[4]}></Step>

    </Box>
  )
}

QuotationForm.propTypes = {}

export default QuotationForm
