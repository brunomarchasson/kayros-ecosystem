import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';
import {useHotKeys} from '../hooks/HotKeys';

export function ButtomWithHotKey({hotKey, children, ...props}) {
  useHotKeys({[hotKey]: props.onPress});
  return (
    <Button {...props}>
      {children}
      {'(' + hotKey + ')'}
    </Button>
  );
}

ButtomWithHotKey.propTypes = {};

export default ButtomWithHotKey;
