import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useApi} from '../useApi';

const DataContext = React.createContext();
const {Provider} = DataContext;

export const DataProvider = ({children}) => {
  const [providers, setProviders] = useState([]);
  const [params, setParams] = useState({});
  const [inventoryClosed, setInventoryClosed] = useState();
  const {get, JWT} = useApi();

  useEffect(() => {
    if (JWT) {
      get('roll/provider').then(setProviders);
      get('/params').then(setParams);
    }
  }, [get, JWT]);

  useEffect(() => {
    setInventoryClosed(params.inventoryClosed);
  }, [params]);

  return (
    <Provider value={{providers, params, inventoryClosed, setInventoryClosed}}>
      {children}
    </Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw Error(
      'The `useData` hook must be called from a descendent of the `DataProvider`.',
    );
  }
  return {
    ...ctx,
  };
};
