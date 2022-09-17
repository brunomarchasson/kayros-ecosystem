import {DateTime} from 'luxon';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card} from 'react-native-paper';
import {useTranslation} from '../hooks/Translation';
import {useApi} from '../hooks/useApi';
import {useSnack} from '../hooks/useSnack';
import ButtomWithHotKey from './ButtomWithHotKey';
import InputPopup from './InputPopup';

const Roll = ({roll, onDismiss}) => {
  const {translate} = useTranslation();
  const [currentRoll, setCurrentRoll] = useState(roll);
  const [newLength, setNewLength] = useState();
  // useHotKeys({131: () => console.log('GOT IT')});

  useEffect(() => setCurrentRoll(roll), [roll]);

  const {post} = useApi();
  const {addSnack} = useSnack();
  const editLocation = async val => {
    post(`roll/${roll.rollId}/location/${val}`)
      .then(newRoll => {
        addSnack({
          severity: 'success',
          message: translate('roll.updateLocationSuccess'),
        });
        setCurrentRoll(newRoll);
      })
      .catch(e => {
        addSnack({
          severity: 'error',
          message: translate('roll.updateLocationError'),
        });
      });
  };

  const editLength = async val => {
    setNewLength(val);
  };

  const sendToJail = async val => {
    post(`roll/${roll.rollId}/status/Z`)
      .then(newRoll => {
        addSnack({
          severity: 'success',
          message: translate('roll.sendToJailSuccess'),
        });
        onDismiss();
      })
      .catch(e => {
        addSnack({
          severity: 'error',
          message: translate('roll.sendToJailError'),
        });
      });
  };

  const handleCancel = () => {
    onDismiss();
  };

  const handleValidate = () => {
    post(`roll/${roll.rollId}/length/${newLength ?? roll.length}`)
      .then(newRoll => {
        addSnack({
          severity: 'success',
          message: translate('roll.updateSuccess'),
        });
        setCurrentRoll(newRoll);
        onDismiss();
      })
      .catch(e => {
        addSnack({
          severity: 'error',
          message: translate('roll.updateError'),
        });
      });
  };
  const earlyCheck =
    DateTime.now()
      .diff(DateTime.fromMillis(currentRoll.lastCheckTs), 'hour')
      .toObject().hours < 1;
  return (
    <Card style={styles.container}>
      <Card.Title titleStyle={styles.title} title={roll.rollId} />
      <Card.Content>
        <View style={styles.row}>
          <Text
            style={{
              textAlign: 'center',
              color: earlyCheck ? 'red' : 'inherited',
            }}>
            {`${translate('roll.lastCheck')} ${DateTime.fromMillis(
              currentRoll.lastCheckTs,
            ).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}`}
          </Text>
        </View>
        <Text>{currentRoll.label}</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text>{translate('roll.width')}</Text>
            <Text>{currentRoll.width + ' mm'}</Text>
          </View>
          <View style={styles.col}>
            <Text>{translate('roll.length')}</Text>
            <InputPopup
              value={newLength ?? currentRoll.length}
              icon="pencil"
              onChange={editLength}
              hotKey={'F1'}
            />
          </View>
          <View style={styles.col}>
            <Text>{translate('roll.location')}</Text>
            {/* <Text>{roll.location}</Text> */}
            <InputPopup
              value={currentRoll.location}
              icon="pencil"
              onChange={editLocation}
              keyboardType="default"
              hotKey={'F2'}
            />
            {/* <Text style={styles.hotkeys}>F2</Text> */}
          </View>
          <View style={styles.col}>
            <Text>{translate('roll.status')}</Text>
            <Text>{translate('roll.statuslabels.' + currentRoll.status)}</Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <ButtomWithHotKey hotKey="F3" onPress={sendToJail}>
          {translate('roll.sendToJail')}
        </ButtomWithHotKey>
        <ButtomWithHotKey hotKey="ESC" onPress={handleCancel}>
          {translate('cancel')}
        </ButtomWithHotKey>
        <ButtomWithHotKey hotKey="ENTER" onPress={handleValidate}>
          {translate('validate')}
        </ButtomWithHotKey>
      </Card.Actions>
    </Card>
  );
};

export default Roll;

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
