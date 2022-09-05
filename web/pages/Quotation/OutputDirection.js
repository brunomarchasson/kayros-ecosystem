import React from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Stack, } from '@mui/material';
import { FormHelperText } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {InRightIcon,
  InLeftIcon,
  InFootIcon,
  InHeadIcon,
  OutRightIcon,
  OutLeftIcon,
  OutFootIcon,
  OutHeadIcon,
} from './OutputIcon';

const iconStyle = {
  height: 75,
  width: 75,
}
const Row = (p) => (
  <Stack
    direction="row"

    {...p}
  />
);
function OutputDirection({value, onChange, error, helperText,...r}) {
console.log('dd', value, r)
  console.log(error, helperText)
  const handleChange = (e,v) => {
   console.log(v, e)
    onChange(v)
  }
  return (
    <FormControl >
    <ToggleButtonGroup
      value={value}
      size="large"
      exclusive
      onChange={handleChange}
      sx={{
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& .MuiToggleButton-root': {
          borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          '&:first-of-type': {
            borderTopLeftRadius: 4,
          },
          '&:nth-of-type(4)': {
            borderTopRightRadius: 4,
          },
          '&:nth-of-type(5)': {
            borderBottomLeftRadius: 4,
          },
          '&:last-of-type': {
            borderBottomRightRadius: 4,
          },
          '&:not(:last-of-type)': {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
          }
        }
      }}
    >
    {/* <Row> */}
      <ToggleButton value="00" aria-label="list">
        <InRightIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="01" aria-label="list">
        <InLeftIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="02" aria-label="list">
        <InFootIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="03" aria-label="list">
        <InHeadIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
    {/* </Row> */}
    {/* <Row> */}
      <ToggleButton value="10" aria-label="list">
        <OutRightIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="11" aria-label="list">
        <OutLeftIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="12" aria-label="list">
        <OutFootIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
      <ToggleButton value="13" aria-label="list">
        <OutHeadIcon fontSize="large" sx = {iconStyle}/>
      </ToggleButton>
    {/* </Row> */}
      </ToggleButtonGroup>
      <FormHelperText errpr={error}>
        {helperText}
      </FormHelperText>
</FormControl>
  )
}
OutputDirection.propTypes = {}

export function OutupuDirectionInput({ control, name, label, rules, defaultValue, inputProps }) {
console.log(control)
  return (
  <Controller
  control={control}
  name={name}
  defaultValue={defaultValue}
  rules={rules}
  render={({ field, r }) => (
    <OutputDirection
    {...field}
    {...r}
      // label={label}
      // InputProps={{
      //   inputComponent: OutputDirection,
      // }}
      // {...inputProps}
    />
  )}
/>)
}

export default OutputDirection
