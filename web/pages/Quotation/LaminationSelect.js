import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import FormControlLabel from '@mui/material/FormControlLabel';
import ArticleSelect from '../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Switch from '../../components/Switch';


function LaminationSelect({ control }) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event, checked) => {
    setChecked(checked ?? event.target.checked);
  };
  return (
    <Accordion expanded={ checked }>
      <AccordionSummary>
        <Switch
          value={ checked }
          label="lamination"
          onChange={ handleChange }
        />

      </AccordionSummary>
      <AccordionDetails>
        <ArticleSelect
          type="PEL"
          control={ control }
          name="lamination"
          label="lamination"
        />
      </AccordionDetails>
    </Accordion>
  );
}

LaminationSelect.propTypes = {};

export default LaminationSelect;
