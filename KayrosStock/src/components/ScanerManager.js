import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Dialog,
  FAB,
  IconButton,
  Menu,
  Portal,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScan} from '../hooks/DatalogicManager';
import {useTranslation} from '../hooks/Translation';

const quickScan = [
  '00387127399843140585',
  '00387127399843140595',
  '8712739472105',
  '8001033002000076005',
  '152202035',
];

export const detectCodeType = code => {
  if (/^8001\d{14,15}$/gm.test(code)) {
    return 'rollDetail';
  }
  if (/^00\d{17,18}$/gm.test(code)) {
    return 'rollId';
  }
  if (/^15\d{6,7}$/gm.test(code)) {
    return 'bestBefore';
  }
  if (/^(?!00)[0-9]{2}\d{10,11}$/gm.test(code)) {
    return 'productCode';
  }
  return null;
};

const QuickScan = ({onSelect}) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleClick = code => {
    onSelect(code);
    closeMenu();
  };
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          style={{top: 0, right: 0, marginRight: -20}}
          icon="dots-vertical-circle-outline"
          onPress={openMenu}
        />
      }>
      {quickScan.map(code => (
        <Menu.Item key={code} onPress={() => handleClick(code)} title={code} />
      ))}
    </Menu>
  );
};
const ScanerManager = ({onScan, disabled}) => {
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('');
  const {translate} = useTranslation();

  const handleScan = useCallback(
    scanEvent => {
      onScan(scanEvent.barcodeData.trim());
    },
    [onScan],
  );

  useScan(handleScan);

  const hideDialog = () => setVisible(false);
  const showDialog = () => {
    setVisible(true);
    onScan('');
    setCode(null);
  };
  const handleCode = () => {
    hideDialog();
    onScan(code);
    setCode(null);
  };
  return (
    <View style={{alignItems: 'center'}}>
      <Portal>
        {!visible && !disabled && (
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              opacity: 0.2,
              zIndex: 9,
              alignItems: 'center',
              justifyContent: 'center',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}>
            <Icon name="barcode-scan" size={100} />
          </View>
        )}
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{position: 'relative'}}>
          <Dialog.Title style={{display: 'flex', flexDirection: 'row'}}>
            {translate('scan.title')}
          </Dialog.Title>
          <Dialog.Content style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={code}
              style={{flex: 1}}
              autoFocus
              onChangeText={setCode}
              autoComplete="off"
              keyboardType="number-pad"
            />
            <QuickScan onSelect={setCode} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCode}>{translate('ok')}</Button>
            <Button onPress={hideDialog}>{translate('cancel')}</Button>
          </Dialog.Actions>
        </Dialog>
        <FAB
          visible={!visible && !disabled}
          style={styles.fab}
          icon="keyboard"
          onPress={showDialog}
        />
      </Portal>
    </View>
  );
};

export default ScanerManager;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
