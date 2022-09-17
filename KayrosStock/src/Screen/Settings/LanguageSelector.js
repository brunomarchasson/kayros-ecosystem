import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {LocalizationContext, useTranslation} from '../../hooks/Translation';
import {RadioButton, Text} from 'react-native-paper';

const LanguageSelector = () => {
  const {translate, translations, appLanguage, setAppLanguage} =
    useTranslation();

  return (
    <View style={[styles.container]}>
      <Text>{translate('settings.language')}</Text>
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
    </View>
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({});
