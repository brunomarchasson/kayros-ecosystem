import AsyncStorage from '@react-native-community/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import en from '../localization/en.json';
import fr from '../localization/fr.json';
import {Settings} from 'luxon';

const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';

const translations = {en, fr};
i18n.translations = translations;

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = language => {
    i18n.locale = language;
    Settings.defaultLocale = language;
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = useCallback(async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);

    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = Object.keys(translations);
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  }, []);

  const translate = useCallback((key, options) => {
    return i18n.t(key, options);
  }, []);

  const formatDate = useCallback((f, d) => i18n.l(f, d), []);

  useEffect(() => {
    initializeAppLanguage();
  }, [initializeAppLanguage]);
  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage, // 10
        appLanguage,
        initializeAppLanguage,
        translate,
        formatDate,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
export const useTranslation = () => {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw Error(
      'The `useTranslation` hook must be called from a descendent of the `LocalizationProvider`.',
    );
  }

  return {
    ...ctx,
  };
};
