import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import ArticleSelect from '../../components/FormInput/ArticleSelect';
import NumberInput from '../../components/FormInput/NumberInput';
import OutputDirection from '../../components/FormInput/OutDirection/OutputDirection';
import SelectInput from '../../components/FormInput/SelectInput';
import TextInput from '../../components/FormInput/TextInput';
import InfoPopOver from '../../components/InfoPopOver';
import LabelImage from './LabelImage';
import SelectColor from '../../components/SelectColor';
import GlidingSelect from './GlidingSelect';
import VarnishSelect from './VarnishSelect';
import LaminationSelect from './LaminationSelect';
import Switch from '../../components/Switch';
import SwitchInput from '../../components/FormInput/SwitchInput';

let renderCount = 0;

const objOptions = [
  { value: 65, label: 'A' },
  { value: 66, label: 'B' },
  { value: 67, label: 'C' },
];

function Row(p) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{
        '& >*': { flex: 1 },
      }}
      {...p}
    />
  );
}
function QuotationForm() {
  // const {stepsRef} = useContext(QuotationContext)
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const onSubmit = (data) => console.log(data);
  const watchShape = watch('shape');
  const watchWidth = watch('width');
  const watchHeight = watch('height');
  const watchPrintProcess = watch('printProcess');

  renderCount++;

  console.log('renderCount', renderCount, errors);
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& h2, h3 ': {
          scrollMarginTop: '16px',
        },
      }}
    >
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          padding: '1rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 600,
        }}
      >
        <h2 id="start">Demande de devis</h2>
        <Row>
          <TextInput
            control={control}
            name="label"
            label="label"
            rules={{
              maxLength: 100,
              required: true,
            }}
          />
        </Row>
        <Row>
          <TextInput control={control} name="reference" rules={{
            maxLength: 50,
          }}

            label="reference" />
        </Row>
        <Row>
          <NumberInput
            rules={{
              required: true,
            }}
            sx={{
              maxWidth: '50%'
            }}
            // maxWidth={20}
            control={control}
            name="quantyty1"
            label={t('quotation.quantity')}
          />
          {/* <NumberInput control={control} name="quantyty2" label="quantyty2" /> */}
          {/* <NumberInput control={control} name="quantyty2" label="quantyty3" /> */}
        </Row>
        <Row>
          <TextInput
            control={control}
            name="references"
            label={t('quotation.references')}
            sx={{
              maxWidth: '50%'
            }}
            rules={{
              required: true,
            }}
          />
          <InfoPopOver text={t('quotation.help')} />
        </Row>
        <Alert severity="warning">
          {t('quotation.alert')}
        </Alert>
        <h2 id="definition">Label definition</h2>
        <Stack direction="row" >
          <Stack direction="column" gap={1} flex={1}>
            <Row>
              <SelectInput
                control={control}
                name="shape"
                label="shape"
                rules={{
                  required: true,
                }}
                options={[
                  { value: 0, label: 'Ronde' },
                  { value: 1, label: 'Ovale' },
                  { value: 2, label: 'Rectangle' },
                  { value: 3, label: 'Spécial' },
                ]}
              />
            </Row>
            <Row>
              <NumberInput
                control={control}
                rules={{
                  required: true,
                }}
                name="width"
                label={watchShape?.value === 0 ? 'diameter' : 'width'}
              />
              {watchShape?.value !== 0 && (
                <NumberInput
                  control={control}
                  rules={{
                    required: true,
                  }}
                  name="height"
                  label="height"
                />
              )}
            </Row>
          </Stack>
          <Box sx={{ width: 180 }}>
            <LabelImage
              style={{ maxWidth: 200, maxHeight: 200 }}
              shape={watchShape}
              width={watchWidth}
              height={watchHeight}
            />
          </Box>
        </Stack>
        <h2 id="backing">backing</h2>
        <ArticleSelect
          type="SUP"
          control={control}
          rules={{
            required: true,
          }}
          name="backing"
          label="backing"
        />
        <h2 id="printing">printing</h2>
        <SelectInput
          control={control}
          name="printProcess"
          label="printProcess"
          options={[
            { value: 103, label: 'Flexo UV' },
            { value: 106, label: 'numérique ' },
          ]}
        />
        <SelectColor control={control}
          name="print"
          label="print"
          process={watchPrintProcess} />

        <GlidingSelect control={control} />

        <VarnishSelect control={control} />
        <LaminationSelect control={control} />
        <SwitchInput control={control}
          name="blackSpot"
          label="blackSpot" />
        <SwitchInput control={control}
          name="perforation"
          label="perforation" />

        <h2 id="finish">finish</h2>
        
        <Row>
          <OutputDirection
            control={control}
            name="out"
            rules={{
              required: true,
            }}
          />
        </Row>
        <h2 id="packaging">packaging</h2>

        <Button type="submit">Submit</Button>
      </Paper>
      { /* </form> */}
    </Box>
  );
}

QuotationForm.propTypes = {};

export default QuotationForm;
