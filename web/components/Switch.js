import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiSwitch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormControlLabel from '@mui/material/FormControlLabel';

function Switch({ label, value, onChange }) {
  return (
    <FormControlLabel
      // value=""
      sx={{
        flex: 1,
        marginLeft: 0,
        '& .MuiFormControlLabel-label': {
          flex: 1
        }
      }}
      control={
        <MuiSwitch
          checked={value}
          onChange={onChange}
        />}
      label={label}
      labelPlacement="start"
    />
  )
}

Switch.propTypes = {}

export default Switch
