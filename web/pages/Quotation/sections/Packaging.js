import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import {
  ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme,
} from '@mui/material';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MandrelInput from '../../../components/FormInput/MandrelSelect';
import NumberInput from '../../../components/FormInput/NumberInput';
import { OUTPUT_ICONS } from '../../../components/FormInput/OutDirection/OutputIcon';
import Radios from '../../../components/Radios';
import { Row } from '../components/Row';


function PackagingSection({ form }) {
  const {
    control,
  } = form;
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const iconSize = mobile ? '3rem' : '5rem';
  console.log(mobile)
  const [packagingType, setPackagingType] = useState('Bo');
  const [winding, setWinding] = useState(0);
  const [direction, setDirection] = useState(0);
  const { t } = useTranslation();

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
      <h2 id="packaging">{ t('quotation.titles.packaging') }</h2>
      <Radios
        label={ t('quotation.packagingType') }
        value={ packagingType }
        onChange={ handleChangePackagingType }
        options={ [
          { value: 'Bo', label: t('quotation.packagingTypes.bo') },
          { value: 'Pa', label: t('quotation.packagingTypes.pa') },
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
          label={ t('quotation.packaging.winding') }
          value={ winding }
          onChange={ handleChangeWinding }
          options={ [
            { value: 0, label: t('quotation.packaging.windings.inner') },
            { value: 1, label: t('quotation.packaging.windings.external') },
          ] }
        />
        <ToggleButtonGroup
          value={ direction }
          size={ mobile ? 'small' : 'large' }
          exclusive
          sx={ { alignSelf: 'center' } }
          onChange={ handleChangeDirection }
        >
          { OUTPUT_ICONS.filter((i) => i.type === 'Bo' && i.winding === winding && i.direction != null).map((B) => (
            <ToggleButton key={ B.direction } value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: iconSize, height: iconSize } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
        <NumberInput control={ control } name="numberAbreast" label={ t('quotation.packaging.abreast') } />
        <Row>
          <NumberInput control={ control } name="quantityPerSpool" label={ t('quotation.packaging.qtyPerSpool') } />
          <NumberInput control={ control } name="maxDiameter" label={ t('quotation.packaging.maxDiameter') } />
        </Row>
        <MandrelInput control={ control } name="mandrel" label={ t('quotation.packaging.mandrelDiameter') } />
      </Collapse>

      <Collapse
        sx={ {
          '& .MuiCollapse-wrapperInner': {
            display: 'flex',
            flexDirection: 'column',
            gap: 1,

          },
        } }
        in={ packagingType === 'Pa' }
      >
        <ToggleButtonGroup
          value={ direction }
          size="large"
          exclusive
          sx={ { alignSelf: 'center' } }
          onChange={ handleChangeDirection }
        >
          { OUTPUT_ICONS.filter((i) => i.type === 'Pa' && i.direction != null).map((B) => (
            <ToggleButton key={ B.direction } value={ B.direction } sx={ { padding: 1 } }>
              <B.icon sx={ { width: iconSize, height: iconSize } } />
            </ToggleButton>
          )) }
        </ToggleButtonGroup>
        <NumberInput control={ control } name="numberAbreast" label={ t('quotation.packaging.abreast') } />

        <NumberInput control={ control } name="labelPerfanfold" label={ t('quotation.packaging.labelsPerFanFold') } />

        <NumberInput control={ control } name="fanfoldPerPack" label={ t('quotation.packaging.fanFoldsPerPack') } />

      </Collapse>

    </>
  );
}

PackagingSection.propTypes = {
  form: PropTypes.object,
};

export default PackagingSection;
