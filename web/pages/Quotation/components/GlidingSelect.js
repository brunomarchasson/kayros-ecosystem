import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import Collapse from '@mui/material/Collapse';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Radios from '../../../components/Radios';


function GlidingSelect({ control, label }) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  const {
    field,
  } = useController({
    name: 'gliddingType',
    control,
  });
  const {
    field: gliddingField,
  } = useController({
    name: 'glidding',
    control,
  });

  const handleChange = (event) => {
    setValue(event.target.value);
    field.onChange(event.target.value);
    gliddingField.onChange(null);
  };

  return (
    <Accordion expanded={ !!value }>
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Radios
          label={ label }
          onChange={ handleChange }
          value={ value }
          options={ [
            { value: '', label: t('quotation.gliddings.none') },
            { value: 801, label: t('quotation.gliddings.cold') },
            { value: 802, label: t('quotation.gliddings.hot') },
          ] }
        />
      </AccordionSummary>
      <AccordionDetails>
        <ArticleSelect
          type={ value === 801 ? 'DORF' : 'DORC' }
          control={ control }
          name="glidding"
          label={ label }
        />
      </AccordionDetails>
    </Accordion>
  );
}

GlidingSelect.propTypes = {};

export default GlidingSelect;
