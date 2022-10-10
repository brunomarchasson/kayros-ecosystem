import Collapse from '@mui/material/Collapse';
import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useController } from 'react-hook-form';
import MandrelInput from '../../components/FormInput/MandrelSelect';
import NumberInput from '../../components/FormInput/NumberInput';
import { OUTPUT_ICONS } from '../../components/FormInput/OutDirection/OutputIcon';
import Radios from '../../components/Radios';
import { Row } from './Row';


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
      <Collapse
        sx={ {
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
            <ToggleButton key={ B.direction } value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: 100, height: 100 } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
        <NumberInput control={ control } name="numberAbreast" label="number abreast" />
        <Row>
          <NumberInput control={ control } name="quantityPerSpool" label="quantity per spool" />
          <NumberInput control={ control } name="maxDiameter" label="max diameter" />
        </Row>
        <MandrelInput control={ control } name="mandrel" label="mandrel" />
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
            <ToggleButton key={ B.direction } value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: 100, height: 100 } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
        <NumberInput control={ control } name="numberAbreast" label="number abreast" />

        <NumberInput control={ control } name="labelPerfanfold" label="number labels per fanfolf" />

        <NumberInput control={ control } name="fanfoldPerPack" label="number fanfold per pack" />

      </Collapse>

    </>
  );
}

OutForm.propTypes = {};

export default OutForm;
