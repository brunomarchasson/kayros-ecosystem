import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Switch from '../../../components/Switch';


function VarnishSelect({ control, label }) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event, checked) => {
    setChecked(checked ?? event.target.checked);
  };
  return (
    <Accordion expanded={ checked }>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Switch
          value={ checked }
          label={ label }
          onChange={ handleChange }
        />
      </AccordionSummary>
      <AccordionDetails>
        <ArticleSelect
          type="VER"
          control={ control }
          name="varnish"
          label={ label }
        />
      </AccordionDetails>
    </Accordion>
  );
}

VarnishSelect.propTypes = {};

export default VarnishSelect;
