import React, { } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


function Radios({
  label, options, value, onChange,
}) {
  return (

    <FormControlLabel
      value={ value }
      sx={ {
        flex: 1,
        marginLeft: 0,
        '& .MuiFormControlLabel-label': {
          flex: 1,
        },
      } }
      control={ (
        <RadioGroup
          row
          value={ value }
          onChange={ onChange }
        >
          { options.map((o) => (
            <FormControlLabel key={ o.value } value={ o.value } control={ <Radio /> } label={ o.label } />

          )) }
        </RadioGroup>
      ) }
      label={ label }
      labelPlacement="start"
    />
  );
}

Radios.propTypes = {};

export default Radios;
