import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LanguageSelector from './LanguageSelector';
import ApiFinder from './ApiFinder';
import CheckConnection from './CheckConnection';

const Divider = () => <View style={{height: 10}} />;
const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <LanguageSelector />
      <Divider />
      <ApiFinder />
      <Divider />

      <CheckConnection />
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  language: {
    paddingTop: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
