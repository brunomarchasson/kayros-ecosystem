import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Radios from '../../../components/Radios';


function GlidingSelect({ control, label }) {
  const [value, setValue] = useState(0);
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

  const handleChange = (event, r) => {
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
            { value: 'DORC', label: t('quotation.gliddings.cold') },
            { value: 'DORF', label: t('quotation.gliddings.hot') },
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

GlidingSelect.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
};

export default GlidingSelect;
