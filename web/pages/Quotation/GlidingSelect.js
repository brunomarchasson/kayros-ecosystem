import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
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
import ArticleSelect from '../../components/FormInput/ArticleSelect';
import { useController, useForm } from "react-hook-form";
import { Accordion, AccordionDetails, AccordionSummary } from './Accordion';
import Radios from '../../components/Radios';


function GlidingSelect({ control }) {
  const [value, setValue] = useState('');

  const {
    field,
  } = useController({
    name: 'gliddingType',
    control: control,
  });
  const {
    field: gliddingField,
  } = useController({
    name: 'glidding',
    control: control,
  });

  console.log('filed', field)
  console.log('value', value, value === '')
  const handleChange = (event) => {
    setValue(event.target.value);
    field.onChange(event.target.value)
    gliddingField.onChange(null)
  };

  return (
    <Accordion expanded={!!value}
    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
      <Radios
      label = 'glidding'
      onChange = {handleChange}
      value={value}
      options = {[
        {value: '', label: 'Aucune '},
        {value: 801, label: 'à froid '},
        {value: 802, label: 'à chaud '},
      ]}

      ></Radios>
        {/* <FormControlLabel
          value="varnish"
          sx={{
            flex: 1,
            marginLeft: 0,
            '& .MuiFormControlLabel-label': {
              flex: 1
            }
          }}
          control={
            <RadioGroup
              row
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value={''} control={<Radio />} label="Aucune" />
              <FormControlLabel value={801} control={<Radio />} label="à froid" />
              <FormControlLabel value={802} control={<Radio />} label="à chaud" />

            </RadioGroup>}
          label="glidding"
          labelPlacement="start"
        /> */}
      </AccordionSummary>
      <AccordionDetails>
        <ArticleSelect
          type={value == 801 ? "DORF" : "DORC"}
          control={control}
          name="glidding"
          label="glidding"
        />
      </AccordionDetails>
    </Accordion>
  )
}

GlidingSelect.propTypes = {}

export default GlidingSelect
