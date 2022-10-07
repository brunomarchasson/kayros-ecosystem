import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks/api';
import SelectInput from './SelectInput';


const FILTERS = {
  SUP: [
    { labelKey: 'articles.fam', key: 'Famille' },
    { labelKey: 'articles.sfam', key: 'SousFamille' },
  ],
};


const andFilters = (...fns) => (item) => fns.reduce((acc, cur) => acc && cur(item), item);

function ArticleSelect({ type, ...props }) {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState([]);
  const { api } = useApi();
  const { t } = useTranslation();

  const handleFilterChange = (f) => (v) => {
    setFilters((cur) => ({ ...cur, [f.key]: v?.value }));
  };

  useEffect(() => {
    const filterFunc = Object.entries(filters).filter(([_, v]) => v).map(([k, v]) => (i) => i[k] === v);
    const p = andFilters(...filterFunc);
    const filtered = articles.filter((i) => p(i));
    setOptions(filtered.map(({ id: value, Designation: label }) => ({ value, label })));
  }, [filters]);

  const renderFilters = () => (FILTERS[type] ?? []).map((f) => {
    const o = [...new Set(articles.map((item) => item[f.key]))].map((l) => ({ value: l, label: l }));
    return (
      <Autocomplete
        options={ o }
        getOptionLabel={ (option) => option?.label ?? '' }
        onChange={ (_, data) => handleFilterChange(f)(data) }
        renderInput={ (params) => (
          <TextField
            { ...params }
            label={ t(f.labelKey) }
          />
        ) }
      />
    );
  });

  useEffect(() => {
    api
      .get('article', { searchParams: { type } })
      .json()
      .then((r) => {
        console.log(r);
        setArticles(r);
        setOptions(
          r.map(({ id: value, Designation: label }) => ({ value, label })),
        );
      });
  }, [type]);

  return (
    <>
      { renderFilters() }
      <SelectInput { ...props } options={ options } />
    </>
  );
}

ArticleSelect.propTypes = {};

export default ArticleSelect;
