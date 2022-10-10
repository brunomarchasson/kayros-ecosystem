import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks/api';
import SelectInput from './SelectInput';
import Select from '../Select';





const andFilters = (...fns) => (item) => fns.reduce((acc, cur) => acc && cur(item), item);

function ArticleSelect({ type, ...props }) {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { api } = useApi();
  const { t } = useTranslation();

  const FILTERS = {
    SUP: [
      { label: t('articles.fam'), key: 'Famille' },
      { label: t('articles.sfam'), key: 'SousFamille' },
    ],
  };
  const handleFilterChange = (f) => (v) => {
    setFilters((cur) => ({ ...cur, [f.key]: v }));
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
      <Select
        key={ f.key }
        options={ o }
        value={ filters[f] ?? null }
        onChange={ (data) => handleFilterChange(f)(data) }
        label={ f.label }
      />
    );
  });

  useEffect(() => {
    setLoading(true);
    api
      .get('article', { searchParams: { type } })
      .json()
      .then((r) => {
        setArticles(r);
        setOptions(
          r.map(({ id: value, Designation: label }) => ({ id: value, value, label })),
        );
      })
      .then(() => setLoading(false));
  }, [type]);

  console.log(options);
  return (
    <>
      { renderFilters() }
      <SelectInput { ...props } loading={ loading } options={ options } />
    </>
  );
}

ArticleSelect.propTypes = {};

export default ArticleSelect;
