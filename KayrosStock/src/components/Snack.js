import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';

const themes = {
  error: {
    colors: {onSurface: '#dc7c7c', surface: '#292c32', accent: '#fff'},
  },
  warning: {
    colors: {onSurface: '#f1c666', surface: '#292c32', accent: '#fff'},
  },
  success: {
    colors: {onSurface: '#7fb58a', surface: '#292c32', accent: '#fff'},
  },
  info: {
    colors: {onSurface: '#66c4eb', surface: '#292c32', accent: '#fff'},
  },
};
const Snack = ({snack, onClose, duration = 2000}) => {
  return (
    <Snackbar
      visible={true}
      onDismiss={onClose}
      duration={duration}
      theme={themes[snack.severity]}
      action={
        snack.action && {
          label: snack.action.label,
          onPress: snack.action.onClick,
        }
      }>
      {snack.message}
    </Snackbar>
  );
};

export default Snack;

const styles = StyleSheet.create({});
