import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SelectInput from './FormInput/SelectInput'
import { useController, useForm } from "react-hook-form";

const PROCESS_OPTIONS = {
  103:[
    { value: '4Q', label: '4 couleurs Quadri' },
    { value: '1P', label: '1 couleur Pantone' },
    { value: '2P', label: '2 couleur Pantone' },
    { value: '3P', label: '3 couleur Pantone' },
    { value: '4P', label: '4 couleur Pantone' },
  ],
  106:[
    { value: '4Q', label: '4 couleurs Quadri' },
    { value: '6H', label: '6 couleurs Hexa' },
    { value: '4Q+B', label: '4 couleurs Quadri + un blanc couvrant' },
    { value: '6H+B', label: '6 couleurs Hexa" + un blanc couvrant' },
  ],
}
function SelectColor({process, ...rest}) {
  console.log(rest)
  console.log(PROCESS_OPTIONS[process])
  console.log(rest.control)
  console.log(rest.control.getFieldState(rest.name))

  const {
    field,
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }
  } = useController({
    name: rest.name,
    control: rest.control,
    // rules: { required: true },
    // defaultValue: "",
  });

  // const [value, setValue] = useState(field.value);

  // console.log('rrr', rest)
  useEffect(() => {
     if(!(PROCESS_OPTIONS[process?.value] ?? []).find(o => o.value ===field?.value?.value))
     {
      console.log('NOT FOUND')
      // form.setValue(rest.name, '')
      // field.value = null;
       field.onChange(null)
      //  setValue(null)
     }
  }, [process])
  return (
    <SelectInput
          options={PROCESS_OPTIONS[process?.value] || []}
          {...rest}
        />
  )
}

SelectColor.propTypes = {}

export default SelectColor
