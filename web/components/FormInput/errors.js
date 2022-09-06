import i18n from '../../i18n';

export const formatErrorMessage = (label, field, { error }) => {
  if (!error) return '';
  if (error.message) return error.message;

  if (error.type === 'required') return i18n.t('form-error-required', { fieldName: label });
  return 'error';
};
