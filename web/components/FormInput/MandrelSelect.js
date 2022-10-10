import React, { useEffect, useState } from 'react';

import { useApi } from '../../hooks/api';
import SelectInput from './SelectInput';

function MandrelInput({ ...props }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useApi();

  useEffect(() => {
    setLoading(true);
    api
      .get('article', { searchParams: { type: 'MAN' } })
      .json()
      .then((r) => {
        console.log('r', r);
        setOptions(
          r.map(({ id: value, SousFamille: label }) => ({ value, label })),
        );
      }).then(() => setLoading(false));
  }, []);

  return (
    <SelectInput { ...props } loading={ loading } options={ options } />
  );
}

MandrelInput.propTypes = {};

export default MandrelInput;
