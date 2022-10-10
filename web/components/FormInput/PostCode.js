import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, Box, TextField } from '@mui/material';
import ky from 'ky';
import { useTranslation } from 'react-i18next';
import useDebounceEffect from '../../hooks/useDebounceEffect';
import Select from '../Select';

function PostCode(props) {
  const [postcode, setPostcode] = useState('');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useDebounceEffect(() => {
    setLoading(true);
    setCity({});
    ky.get(`https://geo.api.gouv.fr/communes?codePostal=${postcode}&fields=code,nom&format=json&geometry=centre`).json().then((r) => {
      setCities(r.map((c) => ({ value: c.code, label: c.nom })));
      setLoading(false);
    });
  }, 300, [postcode]);

  useEffect(() => {
    console.log(cities);
    setCity(cities[0]?.value);
  }, [cities]);
  return (
    <Box>

      <TextField onChange={ (event) => setPostcode(event.target.value) } value={ postcode } label={ t('postcode') } />
      <Select
        options={ cities }
        onChange={ (data) => {
          setCity(data);
        } }
        value={ city }
        loading={ loading }
        disableClearable
        label={ t('city') }
      />
      { /* <Autocomplete
        getOptionLabel={ (option) => option?.label ?? '' }
        isOptionEqualToValue={ (o, v) => o.value === v.value }
        // autoSelect
        // autoHighlight
        renderInput={ (params) => (
          <TextField
            { ...params }
            InputProps={ {
              required: false,
              ...params.InputProps,
            } }
          />
        ) }
      /> */ }
    </Box>
  );
}

PostCode.propTypes = {};

export default PostCode;
