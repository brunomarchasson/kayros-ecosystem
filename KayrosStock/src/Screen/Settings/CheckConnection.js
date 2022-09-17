import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {useTranslation} from '../../hooks/Translation';
import {useApi} from '../../hooks/useApi';

const CheckConnection = () => {
  const {get} = useApi();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const {translate} = useTranslation();
  const check = useCallback(async () => {
    setLoading(true);
    try {
      const r = await get('hello');
      setConnected(true);
    } catch (e) {
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, [get]);

  useEffect(() => {
    check();
  }, [check]);

  return (
    <Button
      onPress={check}
      loading={loading}
      style={[
        connected && styles.connected,
        !connected && styles.notConnected,
        loading && styles.loading,
      ]}>
      <Text>{translate('test')}</Text>
    </Button>
  );
};

export default CheckConnection;

const styles = StyleSheet.create({
  connected: {backgroundColor: 'green'},
  notConnected: {backgroundColor: 'red'},
  loading: {backgroundColor: 'grey'},
});
