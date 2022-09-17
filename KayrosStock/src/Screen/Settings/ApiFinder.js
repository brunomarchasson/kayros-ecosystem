import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, IconButton, ActivityIndicator} from 'react-native-paper';
import {NetworkInfo} from 'react-native-network-info';
import {useApi} from '../../hooks/useApi';

const ApiFinder = () => {
  // const [apiUrl, setApiUrl] = useState();
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="api"
        value={apiUrl}
        dense
        onChangeText={text => setBackEnd(text)}
      />
      {searching ? (
        <ActivityIndicator style={styles.activity} animating={true} />
      ) : (
        <IconButton loading={searching} icon="find-replace" onPress={search} />
      )}
    </View>
  );
};

export default ApiFinder;

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  input: {flex: 1},
  activity: {
    margin: 6,
    width: 36,
  },
});
