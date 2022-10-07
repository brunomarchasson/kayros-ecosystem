import React, { useEffect, useState } from 'react';

import { useApi } from '../../hooks/api';
import SelectInput from './SelectInput';

function ChuckInput({ ...props }) {
  const [options, setOptions] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    api
      .get('article', { searchParams: { type: 'MAN' } })
      .json()
      .then((r) => {
        console.log('r', r);
        setOptions(
          r.map(({ id: value, DIAMETRE: label }) => ({ value, label })),
        );
      });
  }, []);

  return (
    <SelectInput { ...props } options={ options } />
  );
}

ChuckInput.propTypes = {};

export default ChuckInput;
