import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Stack, MenuItem, Autocomplete } from '@mui/material';
import NumberFormat from 'react-number-format';
import LabelImage from './LabelImage';

const objOptions = [
  { value: 65, label: "A" },
  { value: 66, label: "B" },
  { value: 67, label: "C" }
];

const Row = (p) => (
  <Stack
    direction="row"
    gap={1}
    sx={{
      '& >*': { flex: 1 },
    }}
    {...p}
  />
);
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  console.log(other)
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      isNumericString
      // prefix="$"
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};


const NumberInput = ({ control, name, label, rules, defaultValue, inputProps }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field }) => (
      <TextField
      {...field}
        label={label}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        {...inputProps}
      />
    )}
  />
)

const TextInput = ({ control, name, label, rules, defaultValue, inputProps }) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        {...inputProps}
      />
    )}
  />
)

const SelectInput = ({ control, name, multiple, options, label, rules, defaultValue = null, inputProps }) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    defaultValue={defaultValue}
    render={({ field: { ref, onChange, ...field } }) => (
      <Autocomplete
        multiple={multiple}
        options={options}
        defaultValue={defaultValue ?? null}
        getOptionLabel={(option) => option?.label ?? ''}
        onChange={(_, data) => onChange(data)}
        renderInput={(params) => (
          <TextField
            {...field}
            {...params}
            inputRef={ref}
            label={label}
          />
        )}
        {...inputProps}
      />
    )}
  />
)
function QuotationForm() {
  // const {stepsRef} = useContext(QuotationContext)
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const watchFields = watch(["shape"]);
  const watchShape = watch("shape");
  const watchWidth = watch("width");
  const watchHeight = watch("height");
  console.log(watchShape)
  return (
    <Box sx={{
      flex: 1,
      '& h2, h3 ': {
        scrollMarginTop: '16px',
      }
    }}>

    <TextField
        label="react-number-format"
        // value={values.numberformat}
        // onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: 'column',
          gap: 1,
          width: 500,
        }}
      >

        {/* </Box> */}
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}

        <h2 id="start">Start</h2>
        <Row>
          <TextInput control={control} name="label" label="label" rules={{
            required: true,
          }} />
        </Row>
        <Row>
          <TextInput control={control} name="reference" label="reference" />
        </Row>
        <Row>
          <NumberInput control={control} name="quantyty1" label="quantyty1" />
          <NumberInput control={control} name="quantyty2" label="quantyty2" />
          <NumberInput control={control} name="quantyty2" label="quantyty3" />
        </Row>
        <Row>
          <TextInput control={control} name="references" label="references" inputProps={{ type: "number" }} />
        </Row>
        <h2 id="definition">Label definition</h2>
        <Stack direction="row">
          <Stack direction="column" gap={1}>
            <Row>
              <SelectInput control={control}
                name="shape"
                label="shape"
                options={[
                  { value: 0, label: "Ronde" },
                  { value: 1, label: "Ovale" },
                  { value: 2, label: "Rectangle" },
                  { value: 3, label: "Spécial" },
                ]} />

            </Row>
            <Row>
              <NumberInput control={control} name="width" label={watchShape?.value === 0 ? "diameter" : "width"} rules={{
                required: true,
              }} />
              {watchShape?.value !== 0 &&
                <NumberInput control={control} name="height" label="height"  rules={{
                  required: true,
                }} />
              }
            </Row>
          </Stack>
          <Box>
            <LabelImage style ={{maxWidth:200, maxHeight:200}} shape={watchShape} width={watchWidth} height={watchHeight}></LabelImage>
          </Box>

        </Stack>
        <h2 id="printing">printing</h2>
        <SelectInput control={control}
          name="printProcess"
          label="printProcess"
          options={[
            { value: 103, label: "numérique " },
            { value: 106, label: "Flexo UV" },
          ]} />
        <SelectInput control={control}
          name="print"
          label="print"
          options={[
            { value: 0, label: "4 couleurs Quadri" },
            { value: 1, label: "1 couleur Pantone" },
            { value: 2, label: "2 couleur Pantone" },
            { value: 3, label: "3 couleur Pantone" },
            { value: 4, label: "4 couleur Pantone" },
          ]} />
        <SelectInput control={control}
          name="gilding"
          label="gilding"
          options={[
            { value: 801, label: "Dorure à froid" },
            { value: 802, label: "Dorure à chaud" },
          ]} />
        <h2 id="backing">backing</h2>
        <SelectInput control={control}
          name="backing"
          label="backing"
          options={objOptions} />
        {/* <Controller
          control={control}
          name="backing"
          defaultValue={[objOptions[0]]}
          render={({ field: { ref, onChange, ...field } }) => (
            <Autocomplete
              // multiple
              options={objOptions}
              defaultValue={[objOptions[0]]}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...field}
                  {...params}
                  fullWidth
                  inputRef={ref}
                  label="backing"
                />
              )}
            />
          )}
        /> */}
        <h2 id="finish">finish</h2>
        <Row>
          <SelectInput control={control}
            name="outputDirection"
            label="outputDirection"
            options={[
              { value: 0, label: "In" },
              { value: 1, label: "Out" },
            ]} />

        </Row>
        <Row>
          <SelectInput control={control}
            name="unwindingDirection"
            label="unwindingDirection"
            options={[
              { value: 0, label: "Droite avant" },
              { value: 1, label: "Gauche avant" },
              { value: 2, label: "Pied avant" },
              { value: 3, label: "Tête avant" },
            ]} />

        </Row>
        <h2 id="packaging">packaging</h2>

        <Button type="submit">Submit</Button>
      </Box>
      {/* </form> */}

    </Box>
  )
}

QuotationForm.propTypes = {}

export default QuotationForm
