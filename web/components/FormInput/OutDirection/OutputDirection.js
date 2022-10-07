import { Box, FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  BobExtFootIcon, BobExtHeadIcon, BobExtIcon, BobExtLeftIcon, BobExtRightIcon, BobIntFootIcon, BobIntHeadIcon, BobIntIcon, BobIntLeftIcon, BobIntRightIcon, PaFootIcon, PaHeadIcon, PaIcon, PaLeftIcon, PaRightIcon,
} from './OutputIcon';


const iconStyle = {
  height: 300,
  width: 300,
};


function OutputDirection({
  type, isBblank, control,
}) {
  const [winding, setWiding] = useState('0');

  const {
    field: windingField,
  } = useController({
    name: 'winding',
    control,
  });
  const {
    field: outputField,
  } = useController({
    name: 'output',
    control,
  });

  const handleChange = (e, v) => {
    onChange(v);
  };

  const getButtons = () => {
    if (type === 'Pa') {
      if (isBblank) {
        return [
          { value: '', icon: PaIcon },
        ];
      }
      return [
        { value: '00', icon: PaRightIcon },
        { value: '01', icon: PaLeftIcon },
        { value: '02', icon: PaFootIcon },
        { value: '03', icon: PaHeadIcon },
      ];
    }

    if (isBblank) {
      return [
        { value: '00', icon: BobIntIcon },
        { value: '10', icon: BobExtIcon },
      ];
    }
    return [
      { value: '00', icon: BobIntRightIcon },
      { value: '01', icon: BobIntLeftIcon },
      { value: '02', icon: BobIntFootIcon },
      { value: '03', icon: BobIntHeadIcon },
      { value: '10', icon: BobExtRightIcon },
      { value: '11', icon: BobExtLeftIcon },
      { value: '12', icon: BobExtFootIcon },
      { value: '13', icon: BobExtHeadIcon },
    ];
  };
  const choices = getButtons();
  return (
    <FormControl>
      <ToggleButtonGroup
        value={ winding }
        size="large"
        exclusive
        onChange={ handleChange }
        sx={ {
          flexWrap: 'wrap',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.12)',
        } }
      >
        <ToggleButton value="0" sx={ { padding: 1 } }>
          <BobIntFootIcon sx={ { width: 100, height: 100 } } />
        </ToggleButton>
        <ToggleButton value="1" sx={ { padding: 1 } }>
          <BobExtIcon sx={ { width: 100, height: 100 } } />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={ value }
        size="large"
        exclusive
        onChange={ handleChange }
        sx={ {
          flexWrap: 'wrap',
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.12)',
        } }
      >
        { choices.map((C) => (
          <ToggleButton value={ C.value } sx={ { padding: 1 } }>
            <C.icon sx={ { width: 100, height: 100 } } />
          </ToggleButton>
        )) }

      </ToggleButtonGroup>
      <FormHelperText errpr={ error }>
        { helperText }
      </FormHelperText>
    </FormControl>
  );
}
OutputDirection.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
};

export default OutputDirection;
