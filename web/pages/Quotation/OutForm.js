import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useController } from 'react-hook-form';
import ChuckInput from '../../components/FormInput/MandrelSelect';
import NumberInput from '../../components/FormInput/NumberInput';
import { OUTPUT_ICONS } from '../../components/FormInput/OutDirection/OutputIcon';
import Radios from '../../components/Radios';
import { Row } from './QuotationForm';


function OutForm({ control }) {
  const [packagingType, setPackagingType] = useState('Bo');
  const [winding, setWinding] = useState(0);
  const [direction, setDirection] = useState(0);

  const {
    field: windingField,
  } = useController({
    name: 'winding',
    control,
  });

  const {
    field: directionField,
  } = useController({
    name: 'output',
    control,
  });

  const {
    field: packagingTypeField,
  } = useController({
    name: 'packagingType',
    control,
  });

  const handleChangePackagingType = (event, newValue) => {
    setPackagingType(newValue);
    packagingTypeField.onChange(newValue);
  };
  const handleChangeWinding = (event, newValue) => {
    const v = parseInt(newValue, 10);
    setWinding(v);
    windingField.onChange(v);
  };
  const handleChangeDirection = (event, newValue) => {
    const v = parseInt(newValue, 10);

    setDirection(v);
    directionField.onChange(v);
  };

  return (
    <>
      <Radios
        label="condType"
        value={ packagingType }
        onChange={ handleChangePackagingType }
        options={ [
          { value: 'Bo', label: 'rouleaux' },
          { value: 'Pa', label: 'paravents' },
        ] }
      />
      { /* <Collapse
        in={ packagingType === 'Bo' }
        sx={ {
          '& .MuiCollapse-wrapperInner': {
            display: 'flex',
            flexDirection: 'column',
          },
        } }
      >
        <Radios
          label="winding"
          value={ winding }
          onChange={ handleChangeWinding }
          options={ [
            { value: 0, label: 'inner' },
            { value: 1, label: 'external' },
          ] }
        />
      </Collapse> */ }
      { /* <ToggleButtonGroup
        value={ direction }
        size="large"
        exclusive
        sx={ { alignSelf: 'center' } }
        onChange={ handleChangeDirection }
      >
        { OUTPUT_ICONS.filter((i) => i.type === packagingType && (packagingType == 'Pa' || i.winding === winding) && i.direction != null).map((B) => (
          <ToggleButton value={ B.direction } sx={ { padding: 1 } }>
            <B.icon sx={ { width: 100, height: 100 } } />
          </ToggleButton>
        )) }
      </ToggleButtonGroup> */ }
      <Collapse
        sx={ {
          // gap:1,
          // display: 'flex',
          // flexDirection: 'column',
          '& .MuiCollapse-wrapperInner': {
            display: 'flex',
            flexDirection: 'column',
            gap: 1,

          },
        } }
        in={ packagingType === 'Bo' }
      >

        <Radios
          label="winding"
          value={ winding }
          onChange={ handleChangeWinding }
          options={ [
            { value: 0, label: 'inner' },
            { value: 1, label: 'external' },
          ] }
        />
        <ToggleButtonGroup
          value={ direction }
          size="large"
          exclusive
          sx={ { alignSelf: 'center' } }
          onChange={ handleChangeDirection }
        >
          { OUTPUT_ICONS.filter((i) => i.type === 'Bo' && i.winding === winding && i.direction != null).map((B) => (
            <ToggleButton value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: 100, height: 100 } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
        <NumberInput control={ control } name="numberAbreast" label="number abreast" />
        <Row>
          <NumberInput control={ control } name="quantityPerSpool" label="quantity per spool" />
          <NumberInput control={ control } name="maxDiameter" label="max diameter" />
        </Row>
        <ChuckInput control={ control } name="chuckDiameter" label="chuck diameter" />
      </Collapse>

      <Collapse in={ packagingType === 'Pa' }>
        <ToggleButtonGroup
          value={ direction }
          size="large"
          exclusive
          sx={ { alignSelf: 'center' } }
          onChange={ handleChangeDirection }
        >
          { OUTPUT_ICONS.filter((i) => i.type === 'Pa' && i.direction != null).map((B) => (
            <ToggleButton value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: 100, height: 100 } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
      </Collapse>

    </>
  );
}

OutForm.propTypes = {};

export default OutForm;
