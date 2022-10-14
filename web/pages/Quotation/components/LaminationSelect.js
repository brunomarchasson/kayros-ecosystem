import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Switch from '../../../components/Switch';


function LaminationSelect({ control, label }) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event, c) => {
    setChecked(c ?? event.target.checked);
  };
  return (
    <Accordion expanded={ checked }>
      <AccordionSummary>
        <Switch
          value={ checked }
          label={ label }
          onChange={ handleChange }
        />

      </AccordionSummary>
      <AccordionDetails>
        <ArticleSelect
          type="PEL"
          control={ control }
          name="lamination"
          label={ label }
        />
      </AccordionDetails>
    </Accordion>
  );
}

LaminationSelect.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
};

export default LaminationSelect;
