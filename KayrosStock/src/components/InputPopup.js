import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Dialog,
  FAB,
  IconButton,
  Portal,
  TextInput,
} from 'react-native-paper';
import {useHotKeys} from '../hooks/HotKeys';
import {useTranslation} from '../hooks/Translation';

const InputPopup = ({
  icon,
  title,
  value,
  onChange,
  hotKey,
  readOnly,
  keyboardType = 'number-pad',
}) => {
  const [visible, setVisible] = useState(false);
  const [curValue, setCurValue] = useState(value);
  const {translate} = useTranslation();

  const hideDialog = () => setVisible(false);
  const showDialog = () => setVisible(true);

  useHotKeys({[hotKey]: showDialog});

  const handleValide = () => {
    hideDialog();
    onChange(curValue);
  };
  return (
    <>
      <Text>{value}</Text>
      {readOnly ? null : (
        <>
          <IconButton icon={icon} onPress={showDialog} />
          {hotKey && <Text>{'(' + hotKey + ')'}</Text>}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  value={curValue}
                  autoFocus
                  onChangeText={setCurValue}
                  autoComplete="off"
                  keyboardType={keyboardType}
                  onSubmitEditing={handleValide}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleValide}>{translate('ok')}</Button>
                <Button onPress={hideDialog}>{translate('cancel')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </>
      )}
    </>
  );
};

export default InputPopup;

const styles = StyleSheet.create({});
