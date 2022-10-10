import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ArticleSelect from '../../../components/FormInput/ArticleSelect';


function BackingSection({ form }) {
  const {
    control,
  } = form;
  const { t } = useTranslation();

  return (
    <>
      <h2 id="backing">{ t('quotation.titles.backing') }</h2>
      <ArticleSelect
        type="SUP"
        control={ control }
        rules={ {
          required: true,
        } }
        name="backing"
        label={ t('quotation.backing') }
      />
    </>
  );
}

BackingSection.propTypes = {
  form: PropTypes.object,
};

export default BackingSection;
