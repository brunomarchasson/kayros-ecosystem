import React, { useState, useContext, useCallback, useMemo } from 'react';
import {PropTypes} from 'prop-types';
import ky from 'ky';
import { useParams } from 'react-router-dom';
import config from '../config';

const NetworkContext = React.createContext();
const { Provider } = NetworkContext;

const handleError = async (response) => {
  if (response.ok) return response;
  let err;
  try {
    err = await response.json();
  } catch (e) {
    err = response.statusText;
  }
  throw err;
};

export const ApiProvider = ({ children, apiId }) => {
  const [networkError, setNetworkError] = useState(false);
  const [JWT, setJWT] = useState();
  console.log(apiId, JWT)
  const api = useMemo(() => ky.extend({
    prefixUrl: config.api.origin+'/'+apiId+'/api/',
    headers: {
      'x-access-token': JWT
    },
    hooks: {
      beforeRequest: [
        () => {
          if(!apiId) {
            console.log("no AppId")
            return new Response({}, {status: 401, statusText: 'OK'})
          }
        }
      ]
    }
    // hooks: {
    //   beforeRequest: [
    //     request => {
    //       request.headers.set('x-access-token', JWT);
    //     }
    //   ]
    // }
  }), [apiId, config.api.origin, JWT]);


  return (
    <Provider
      value={ {
        networkError,
        JWT,
        setJWT,
        api,
        setNetworkError,
      } }
    >
      { children }
    </Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useApi = () => {
  const ctx = useContext(NetworkContext);
  if (!ctx) {
    throw Error(
      'The `useNetwork` hook must be called from a descendent of the `NetworkProvider`.',
    );
  }

  return ctx;
};
