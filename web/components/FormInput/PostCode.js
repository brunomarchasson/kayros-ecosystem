import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';
import ky from 'ky';
import { useTranslation } from 'react-i18next';
import useDebounceEffect from '../../hooks/useDebounceEffect';
import Select from '../Select';

export const PostCode = React.forwardRef(({
  value,
  onChange,
}, ref) => {
  const [postcode, setPostcode] = useState(value ?? '');
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useDebounceEffect(() => {
    setLoading(true);
    setCity({});
    // eslint-disable-next-line max-len
    ky.get(`https://geo.api.gouv.fr/communes?codePostal=${postcode}&fields=code,nom&format=json&geometry=centre`).json().then((r) => {
      setCities(r.map((c) => ({ value: c.code, label: c.nom })));
      setLoading(false);
    });
  }, 300, [postcode]);

  useEffect(() => {
    setCity(cities[0]?.value);
  }, [cities]);
  return (
    <Box>

      <TextField
        onChange={ (event) => {
          setPostcode(event.target.value);
          onChange(event);
        } }
        value={ postcode }
        label={ t('postcode') }
        ref={ ref }
      />
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
    </Box>
  );
});

PostCode.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default PostCode;
