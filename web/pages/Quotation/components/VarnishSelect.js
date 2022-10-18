import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Switch from '../../../components/Switch';
import { useController } from 'react-hook-form';


function VarnishSelect({ control, label }) {
  const [checked, setChecked] = useState(false);
  const {
    field,
  } = useController({
    name: 'gliddingType',
    control,
  });
  const handleChange = (event, c) => {
    setChecked(c ?? event.target.checked);
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

VarnishSelect.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
};

export default VarnishSelect;
