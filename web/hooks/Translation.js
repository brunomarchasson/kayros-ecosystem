import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";



export const TranslationContext = React.createContext();
const { Provider } = TranslationContext;

export const TranslationProvider = ({ children }) => {
  // State hook
  const [translations, setTranslations] = useState({
    close: "fermer",
    "network-error": "erreur réseau",
  });
  const [locale, setLocale] = useState("fr");
  const [localeLoaded, setLocaleLoaded] = useState("fr");

  return (
    // Provide the message
    <Provider value={{ setLocale, locale, localeLoaded }}>
      {/* <LocalizationProvider messages={translations}> */}
        {children}
      {/* </LocalizationProvider> */}
    </Provider>
  );
};

TranslationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useTranslation = () => {
  const ctx = useContext(TranslationContext);

  if (!ctx) {
    throw Error(
      "The `useTranslation` hook must be called from a descendent of the `TranslationProvider`."
    );
  }

  return {
    setLocale: ctx.setLocale,
    locale: ctx.locale,
    localeLoaded: ctx.localeLoaded,
  };
};
