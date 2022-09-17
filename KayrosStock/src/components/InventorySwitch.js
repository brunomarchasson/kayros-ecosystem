import {StyleSheet, View} from 'react-native';
import {DateTime} from 'luxon';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {useData} from '../hooks/data/provider';
import {useTranslation} from '../hooks/Translation';
import {useSnack} from '../hooks/useSnack';

const InventorySwitch = () => {
  const {params, setInventoryClosed, inventoryClosed} = useData();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {translate} = useTranslation();
  const {snack} = useSnack();

  if (!params) {
    return <ActivityIndicator />;
  }

  const onToggleSwitch = v => {
    setInputValue('');
    if (!v) {
      setInventoryClosed(true);
      return;
    }
    setDialogVisible(true);
  };

  const hideDialog = () => setDialogVisible(false);

  const validate = () => {
    if (inputValue === params.inventoryPassword) {
      setInventoryClosed(false);
    } else {
      snack.error(translate('bad-password'));
    }

    setDialogVisible(false);
  };

  return (
    <View>
      <View style={styles.row}>
        <Text>
          {translate(inventoryClosed ? 'inventory-close' : 'inventory-open', {
            date: DateTime.fromMillis(params.inventoryDate || 0).toLocaleString(
              DateTime.DATE_FULL,
            ),
          })}
        </Text>
        <Switch value={!inventoryClosed} onValueChange={onToggleSwitch} />
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>{translate('open-inventory-password')}</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label={translate('password')}
              value={inputValue}
              onChangeText={setInputValue}
              secureTextEntry={true}
              autoFocus
              autoCorrect={false}
              onSubmitEditing={validate}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={validate}>{translate('ok')}</Button>
            <Button onPress={hideDialog}>{translate('cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default InventorySwitch;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
