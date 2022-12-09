import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  TextInput,
  IconButton,
  ActivityIndicator,
  List,
} from 'react-native-paper';
import {NetworkInfo} from 'react-native-network-info';
import {useApi} from '../../hooks/useApi';
import {useTranslation} from '../../hooks/Translation';
import CheckConnection from './CheckConnection';

const ApiFinder = () => {
  // const [apiUrl, setApiUrl] = useState();
  const {translate} = useTranslation();
  const [searching, setSearching] = useState(false);
  const {findBackend, setBackEnd, apiUrl} = useApi();
  const search = async () => {
    setSearching(true);
    try {
      await findBackend();
    } catch (e) {
    } finally {
      setSearching(false);
    }
  };
  return (
    <List.Section title={translate('settings.server')} style={styles.container}>
      <View style={styles.row}>
        {searching ? (
          <ActivityIndicator style={styles.activity} animating={true} />
        ) : (
          <IconButton loading={searching} icon="crosshairs" onPress={search} />
        )}
        <TextInput
          style={styles.input}
          mode="outlined"
          label="api"
          value={apiUrl}
          dense
          onChangeText={text => setBackEnd(text)}
        />
      <CheckConnection />
      </View>
    </List.Section>
  );
};

export default ApiFinder;

const styles = StyleSheet.create({
  container: {flexDirection: 'column'},
  row: {flexDirection: 'row', alignItems: 'center'},
  input: {flex: 1},
  activity: {
    margin: 6,
    width: 36,
  },
});
