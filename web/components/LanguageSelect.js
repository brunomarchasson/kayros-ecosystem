import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from '../i18n';

function Lang() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const changeLanguage = (event) => {
    const language = event.target.value;

    switch (language) {
        case language.EN:
          setLang(language.EN);
          i18n.changeLanguage(language.EN);
          break;
        case language.FR:
        default:
          setLang(language.FR);
          i18n.changeLanguage(language.FR);
          break;
    }
  };

  return (
    <div>
      <div>
        <select value={ lang } name="language" onChange={ changeLanguage }>
          <option value={ Languages.FR }>FR</option>
          <option value={ Languages.EN }>EN</option>
        </select>
      </div>
    </div>
  );
}

export default Lang;
