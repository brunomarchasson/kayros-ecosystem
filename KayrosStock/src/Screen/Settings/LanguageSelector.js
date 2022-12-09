import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {LocalizationContext, useTranslation} from '../../hooks/Translation';
import {List, RadioButton, Text} from 'react-native-paper';

const LanguageSelector = () => {
  const {translate, translations, appLanguage, setAppLanguage} =
    useTranslation();

  return (
    <List.Section
      title={translate('settings.language')}
      style={[styles.container]}>
      <RadioButton.Group
        onValueChange={newValue => setAppLanguage(newValue)}
        value={appLanguage}>
        {Object.keys(translations).map(currentLang => (
          <RadioButton.Item
            key={currentLang}
            label={translate('settings.languages.' + currentLang)}
            value={currentLang}
          />
        ))}
      </RadioButton.Group>
    </List.Section>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({});
