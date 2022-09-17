import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {NativeEventEmitter} from 'react-native';

import PropTypes from 'prop-types';
import KeyEvent from 'react-native-keyevent';

const HotKeysContext = React.createContext();
const {Provider} = HotKeysContext;

const keyMap = {
  F1: 131,
  F2: 132,
  F3: 133,
  F4: 134,
  F5: 135,
  ENTER: 66,
  ESC: 111,
};

const getKeyValue = key => keyMap[key] || key;

export const HotKeysProvider = ({children}) => {
  const HotKeys = useRef({});

  const addListener = map => {
    Object.entries(map).forEach(([key, cb]) => {
      HotKeys.current[getKeyValue(key)] = [...(HotKeys.current[key] || []), cb];
    });
  };
  const removeListener = map => {
    Object.entries(map).forEach(([key, cb]) => {
      HotKeys.current[getKeyValue(key)] = [
        ...(HotKeys.current[key] || []).filter(c => c !== cb),
      ];
    });
  };

  useEffect(() => {
    KeyEvent.onKeyDownListener(keyEvent => {
      (HotKeys.current[keyEvent.keyCode] || []).forEach(cb => cb());
    });
    return () => {
      KeyEvent.removeKeyDownListener();
    };
  }, []);
  return <Provider value={{addListener, removeListener}}>{children}</Provider>;
};
HotKeysProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useHotKeys = mapping => {
  const ctx = useContext(HotKeysContext);
  if (!ctx) {
    throw Error(
      'The `useHotKeys` hook must be called from a descendent of the `HotKeysProvider`.',
    );
  }
  useEffect(() => {
    const p = mapping;
    ctx.addListener(p);
    return () => ctx.removeListener(p);
  }, [ctx, mapping]);

  return {};
};
