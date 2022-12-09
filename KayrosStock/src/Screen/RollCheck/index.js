import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Roll from '../../components/Roll';
import ScanerManager from '../../components/ScanerManager';
import {useTranslation} from '../../hooks/Translation';
import {useSnack} from '../../hooks/useSnack';
import {useApi} from '../../hooks/useApi';
import { LOG } from '../../log';

const RollCheckScreen = () => {
  const {get} = useApi();
  const [roll, setRolll] = useState();
  const [loading, setLoading] = useState(false);
  const {translate} = useTranslation();
  const {snack} = useSnack();

  const handleScan = useCallback(
    txt => {
      setLoading(true);
      setRolll(null);
      get('roll/' + txt.substring(0, 19))
        .then(r => setRolll(r))
        .catch(e => {
          LOG.error(e);
          snack.error(translate('error'));
        })
        .finally(() => setLoading(false));
    },
    [get, snack, translate],
  );

  const reset = () => {
    setRolll(null);
  };
  // useEffect(() => handleScan('0038712739984314058'), [handleScan]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {roll && <Roll roll={roll} onDismiss={reset} />}
      <ScanerManager disabled={!!roll} onScan={handleScan} />
    </View>
  );
};

export default RollCheckScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
