import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/api';
import SelectInput from './SelectInput';

function ArticleSelect({ type, ...props }) {
  const [options, setOptions] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    api
      .get('article', { searchParams: { type } })
      .json()
      .then((r) => {
        setOptions(
          r.map(({ id: value, Designation: label }) => ({ value, label })),
        );
      });
  }, []);

  return <SelectInput { ...props } options={ options } />;
}

ArticleSelect.propTypes = {};

export default ArticleSelect;
