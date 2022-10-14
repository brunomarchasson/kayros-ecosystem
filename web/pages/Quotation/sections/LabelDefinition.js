import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import NumberInput from '../../../components/FormInput/NumberInput';
import { Row } from '../components/Row';
import LabelImage from '../components/LabelImage';
import SelectInput from '../../../components/FormInput/SelectInput';


function LabelDefinitionSection({ form }) {
  const {
    control,
    watch,
  } = form;
  const { t } = useTranslation();
  const watchShape = watch('shape');

  return (
    <>
      <h2 id="definition">{ t('quotation.titles.labelDefinition') }</h2>
      <Stack direction="row">
        <Stack direction="column" gap={ 1 } flex={ 1 }>
          <Row>
            <SelectInput
              control={ control }
              name="shape"
              label={ t('quotation.shape') }
              rules={ {
                required: true,
              } }
              options={ [
                { value: 0, label: t('shape.round') },
                { value: 1, label: t('shape.oval') },
                { value: 2, label: t('shape.rectangle') },
                { value: 3, label: t('shape.special') },
              ] }
            />
          </Row>
          <Row>
            <NumberInput
              control={ control }
              rules={ {
                required: true,
              } }
              name="width"
              label={ watchShape === 0 ? t('quotation.diameter') : t('quotation.width') }
            />
            { watchShape !== 0 && (
              <NumberInput
                control={ control }
                rules={ {
                  required: true,
                } }
                name="height"
                label={ t('quotation.height') }
              />
            ) }
          </Row>
        </Stack>
        <Box sx={ { width: 180 } }>
          <LabelImage
            style={ { maxWidth: 200, maxHeight: 200 } }
            shape={ watchShape }
          />
        </Box>
      </Stack>
    </>
  );
}

LabelDefinitionSection.propTypes = {
  form: PropTypes.object,
};

export default LabelDefinitionSection;
