import React, {useState, useContext, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import Snack from '../components/Snack';

const SnackContext = React.createContext();
const {Provider} = SnackContext;

export const SnackProvider = ({children}) => {
  const [snackList, setSnackList] = useState([]);
  const add = useCallback(
    snack => setSnackList(cur => [...cur, {...snack, id: uuidv4()}]),
    [],
  );

  const remove = snack => {
    setSnackList(cur => [...cur.filter(s => s.id !== snack.id)]);
  };

  return (
    <Provider value={{add}}>
      {children}
      {snackList.map((snack, index) => (
        <Snack
          key={snack.id}
          sx={{bottom: 48 + 58 * index}}
          snack={snack}
          onClose={() => remove(snack)}
          duration={snack.duration}
        />
      ))}
    </Provider>
  );
};
SnackProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export const useSnack = () => {
  const ctx = useContext(SnackContext);
  const snack = useMemo(
    () => ({
      error: mesdsage =>
        ctx.add({
          severity: 'error',
          message: mesdsage,
        }),
      success: mesdsage =>
        ctx.add({
          severity: 'success',
          message: mesdsage,
        }),
      warning: mesdsage =>
        ctx.add({
          severity: 'warning',
          message: mesdsage,
        }),
      info: mesdsage =>
        ctx.add({
          severity: 'info',
          message: mesdsage,
        }),
    }),
    [ctx.add],
  );
  if (!ctx) {
    throw Error(
      'The `useSnack` hook must be called from a descendent of the `SnackProvider`.',
    );
  }

  return {
    addSnack: ctx.add,
    snack,
  };
};
