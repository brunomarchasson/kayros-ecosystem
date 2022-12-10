import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LanguageSelector from './LanguageSelector';
import ApiFinder from './ApiFinder';
import CheckConnection from './CheckConnection';
import Info from './Info';
import Logs from './Logs';
import {List} from 'react-native-paper';
import {useTranslation} from '../../hooks/Translation';

const SettingScreen = () => {
  const {translate} = useTranslation();
  return (
    <View style={styles.container}>
      <LanguageSelector />
      <ApiFinder />
      <List.Section
        title={translate('settings.infos')}
        style={styles.container}>
        <Info />
        <Logs />
      </List.Section>
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
