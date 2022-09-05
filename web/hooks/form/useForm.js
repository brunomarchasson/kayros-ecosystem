import { useEffect, useState } from 'react';

export const useForm = () => {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]);

  const [data, setData] = useState({});
  const [valid, setValid] = useState(true);

  const registerField = (field) => setFields((cur) => [...cur, field]);

  const setFieldError = (field, error) => setErrors((cur) => ({ ...cur, [field]: error }));

  const setFieldValue = (field, value) => setData((cur) => ({ ...cur, [field]: value }));

  const reset = () => {
    fields.forEach((f) => f.reset());
  };

  useEffect(() => {
    setValid(Object.values(errors).filter((e) => e?.length + e?.items?.filter(i => i.length)?.length).length === 0);
  }, [errors]);

  return {
    setFieldError,
    setFieldValue,
    registerField,
    reset,
    valid,
    data,
  };
};
