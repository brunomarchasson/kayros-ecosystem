import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator, Button, Card} from 'react-native-paper';
import ButtomWithHotKey from '../../components/ButtomWithHotKey';
import InputPopup from '../../components/InputPopup';
import ScanerManager from '../../components/ScanerManager';
import {useTranslation} from '../../hooks/Translation';
import {useApi} from '../../hooks/useApi';
import {useSnack} from '../../hooks/useSnack';

const ItemManagmentScreen = ({inventory}) => {
  const {translate} = useTranslation();
  const [code, setCode] = useState();
  const [item, setItem] = useState();
  const [newValue, setNewValue] = useState();
  const [loading, setLoading] = useState();
  const {snack} = useSnack();
  const {get, post} = useApi();

  const handleScan = c => {
    setItem();
    if (c.endsWith('%')) {
      setCode(c.slice(0, -1));
      return;
    }
    setCode(c);
  };

  useEffect(() => {
    setItem();
    if (code) {
      setLoading(true);
      const idItem = code;
      get('roll/article/' + idItem)
        .then(a => setItem(a))
        .catch(e => snack.error(e))
        .finally(() => setLoading(false));
    }
  }, [code, get, snack]);

  console.log(item);
  const save = async () => {
    try {
      if (inventory) {
        const r = await post('roll/article/' + item?.id + '/stock/' + newValue);
        console.log(r);
      } else {
        const type = 'M-';
        const value = newValue;
        if (value <= 0) {
          snack.error(translate('itemManagment.quantityMustBeGreaterThan0'));
          return;
        }
        if (value > item?.stock?.currentStock) {
          snack.error(translate('itemManagment.quantityNotInStock'));
          return;
        }
        const r = await post('roll/article/' + item?.id + '/stock/', {type, value});
        console.log(r);
      }
      snack.success(translate('itemManagment.saveSuccess'));
      reset();
    } catch (e) {
      snack.error(translate('itemManagment.saveError'));
    }
  };
  const reset = () => {
    setCode();
    setItem();
    setNewValue();
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Card>
          {item ? (
            <>
              <Card.Title titleStyle={styles.title} title={item?.id} />
              <Card.Content>
                <Text>{item?.label}</Text>
                {item?.providers?.map?.(p => (
                  <View style={styles.row}>
                    <Text>{p.name + ' - ' + p.articleCode}</Text>
                  </View>
                ))}
                <View style={styles.row}>
                  <View style={styles.col}>
                    <Text>{translate('itemManagment.stock')}</Text>
                    <InputPopup
                      value={
                        inventory
                          ? newValue ?? item?.stock?.inventoryStock
                          : item?.stock?.currentStock
                      }
                      icon="pencil"
                      onChange={setNewValue}
                      readOnly={!inventory}
                      hotKey={'F1'}
                    />
                  </View>
                  {!inventory ? (
                    <View style={styles.col}>
                      <Text>{translate('itemManagment.delivery')}</Text>
                      <InputPopup
                        value={newValue ?? 0}
                        icon="pencil"
                        onChange={setNewValue}
                        hotKey={'F1'}
                      />
                    </View>
                  ) : null}
                </View>
              </Card.Content>
              <Card.Actions style={styles.actions}>
                <Button onPress={reset}>{translate('cancel')}</Button>
                <Button onPress={save}>{translate('ok')}</Button>
              </Card.Actions>
            </>
          ) : null}
        </Card>
      )}
      <ScanerManager onScan={handleScan} />
    </ScrollView>
  );
};

export default ItemManagmentScreen;

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: 'center',
  },
  hotkeys: {
    fontSize: 5,
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
