/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {LOG} from '../../log';

export default function Logs() {
  const [logs, setLogs] = useState('');
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    if (visible) {
      refresh();
    }
  }, [visible]);

  const refresh = () => {
    var path = RNFS.DocumentDirectoryPath + '/log';
    return RNFS.readFile(path, 'utf8').then(setLogs).catch(LOG.error);
  };
  return (
    <>
      <Button icon="file-document-outline" onPress={showDialog}>Afficher les logs</Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{maxHeight: '90%'}}>
          <Dialog.Title>Logs</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
              <Text>{logs}</Text>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={refresh}>refresh</Button>
            <Button onPress={hideDialog}>fermer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({});
