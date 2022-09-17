import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {NativeEventEmitter} from 'react-native';

import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';

// import {BarcodeManager, LedManager} from '../components/datalogic';
import {
  BarcodeManager,
  LedManager,
} from '@brunom/react-native-datalogic-module';

const DatalogicSDKContext = React.createContext();
const {Provider} = DatalogicSDKContext;

export const DatalogicSDKProvider = ({children}) => {
  const scanHandler = useRef();

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(BarcodeManager);
    eventEmitter.addListener('successCallback', onScan);
    BarcodeManager.addReadListener();
  }, [onScan]);

  const onScan = useCallback(scanEvent => {
    if (scanHandler.current) {
      scanHandler.current(scanEvent);
    }
  }, []);

  return <Provider value={{scanHandler}}>{children}</Provider>;
};
DatalogicSDKProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useScan = handler => {
  const ctx = useContext(DatalogicSDKContext);
  if (!ctx) {
    throw Error(
      'The `useScan` hook must be called from a descendent of the `DatalogicSDKProvider`.',
    );
  }

  useEffect(() => {
    ctx.scanHandler.current = handler;
  }, [ctx, handler]);

  return {ctx};
};

export const useLed = () => {
  const GoodLed = async enable => {
    var ledMap = {led: 'LED_GOOD_READ', enable};
    await LedManager.setLed(ledMap);
  };
  const GreenLed = async enable => {
    var ledMap = {led: 'LED_GREEN_SPOT', enable};
    await LedManager.setLed(ledMap);
  };
  const NotifLed = async enable => {
    var ledMap = {led: 'LED_NOTIFICATION', enable};
    await LedManager.setLed(ledMap);
  };

  return {GoodLed, GreenLed, NotifLed};
};
