import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import LabelImage from './LabelImage';
import NumberInput from '../../components/FormInput/NumberInput';
import TextInput from '../../components/FormInput/TextInput';
import SelectInput from '../../components/FormInput/SelectInput';
import OutputDirection from '../../components/FormInput/OutDirection/OutputDirection';

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
      gap={ 1 }
      sx={ {
        '& >*': { flex: 1 },
      } }
      { ...p }
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
  const onSubmit = (data) => console.log(data);
  const watchShape = watch('shape');
  const watchWidth = watch('width');
  const watchHeight = watch('height');

  renderCount++;

  console.log('renderCount', renderCount, errors);
  return (
    <Box
      sx={ {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& h2, h3 ': {
          scrollMarginTop: '16px',
        },
      } }
    >
      <Paper
        component="form"
        autoComplete="off"
        onSubmit={ handleSubmit(onSubmit) }
        sx={ {
          padding: '1rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          width: 600,
        } }
      >
        <h2 id="start">Start</h2>
        <Row>
          <TextInput
            control={ control }
            name="label"
            label="label"
            rules={ {
              required: true,
            } }
          />
        </Row>
        <Row>
          <TextInput control={ control } name="reference" label="reference" />
        </Row>
        <Row>
          <NumberInput
            rules={ {
              required: true,
            } }
            control={ control }
            name="quantyty1"
            label="quantyty1"
          />
          <NumberInput control={ control } name="quantyty2" label="quantyty2" />
          <NumberInput control={ control } name="quantyty2" label="quantyty3" />
        </Row>
        <Row>
          <TextInput
            control={ control }
            name="references"
            label="references"
            rules={ {
              required: true,
            } }
          />
        </Row>
        <h2 id="definition">Label definition</h2>
        <Stack direction="row">
          <Stack direction="column" gap={ 1 }>
            <Row>
              <SelectInput
                control={ control }
                name="shape"
                label="shape"
                rules={ {
                  required: true,
                } }
                options={ [
                  { value: 0, label: 'Ronde' },
                  { value: 1, label: 'Ovale' },
                  { value: 2, label: 'Rectangle' },
                  { value: 3, label: 'Spécial' },
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
                label={ watchShape?.value === 0 ? 'diameter' : 'width' }

              />
              { watchShape?.value !== 0 && (
                <NumberInput
                  control={ control }
                  rules={ {
                    required: true,
                  } }
                  name="height"
                  label="height"


                />
              ) }
            </Row>
          </Stack>
          <Box>
            <LabelImage
              style={ { maxWidth: 200, maxHeight: 200 } }
              shape={ watchShape }
              width={ watchWidth }
              height={ watchHeight }
            />
          </Box>
        </Stack>
        <h2 id="printing">printing</h2>
        <SelectInput
          control={ control }
          name="printProcess"
          label="printProcess"
          options={ [
            { value: 103, label: 'numérique ' },
            { value: 106, label: 'Flexo UV' },
          ] }
        />
        <SelectInput
          control={ control }
          name="print"
          label="print"
          options={ [
            { value: 0, label: '4 couleurs Quadri' },
            { value: 1, label: '1 couleur Pantone' },
            { value: 2, label: '2 couleur Pantone' },
            { value: 3, label: '3 couleur Pantone' },
            { value: 4, label: '4 couleur Pantone' },
          ] }
        />
        <SelectInput
          control={ control }
          name="gilding"
          label="gilding"
          options={ [
            { value: 801, label: 'Dorure à froid' },
            { value: 802, label: 'Dorure à chaud' },
          ] }
        />
        <h2 id="backing">backing</h2>
        <SelectInput
          control={ control }
          name="backing"
          label="backing"
          options={ objOptions }
        />
        <h2 id="finish">finish</h2>
        <Row>
          <OutputDirection
            control={ control }
            name="out"
            rules={ {
              required: true,
            } }
          />
        </Row>
        <h2 id="packaging">packaging</h2>

        <Button type="submit">Submit</Button>
      </Paper>
      { /* </form> */ }
    </Box>
  );
}

QuotationForm.propTypes = {};

export default QuotationForm;
