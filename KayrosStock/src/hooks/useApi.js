import React, {useState, useContext, useCallback, useEffect} from 'react';
import {NetworkInfo} from 'react-native-network-info';

import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {useSnack} from './useSnack';
import {useTranslation} from './Translation';

const NetworkContext = React.createContext();
const {Provider} = NetworkContext;
const APP_BACKEND = 'appBackend';
const PORTS = [{from: 8850, to: 8855}];

function range(min, max) {
  var len = max - min + 1;
  var arr = new Array(len);
  for (var i = 0; i < len; i++) {
    arr[i] = min + i;
  }
  return arr;
}
const getIPRange = ip => {
  const [ip1, ip2, ip3] = ip.split('.');
  return ['10.0.2.2', 'localhost', ...Array(255).keys()].map(
    i => `${ip1}.${ip2}.${ip3}.${i}`,
  );
};

const promiseAny = iterable =>
  new Promise((globalResolve, globalReject) => {
    let resolved = false;
    Promise.all(
      iterable.map(promise =>
        promise
          .then(res => {
            resolved = true;
            globalResolve(res);
          })
          .catch(error => {
            return error;
          }),
      ),
    ).then(res => {
      if (!resolved) {
        globalReject();
      }
    });
  });

const handleError = async response => {
  if (response.ok) {
    return response;
  }
  if (response.status === 404) {
    return null;
  }
  let err;
  try {
    err = await response.json();
  } catch (e) {
    err = response.statusText;
  }
  throw err;
};

export const ApiProvider = ({children, config = null}) => {
  const {translate} = useTranslation();
  const [networkError, setNetworkError] = useState(false);
  const [apiUrl, setApiUrl] = useState();
  const [JWT, setJWT] = useState();
  const [connected, setConnected] = useState(false);
  const {addSnack, snack} = useSnack();

  const setBackEnd = url => {
    AsyncStorage.setItem(APP_BACKEND, url);
    setApiUrl(url);
  };

  const findBackend = async () => {
    try {
      const myIp = await NetworkInfo.getIPAddress();
      const ipList = getIPRange(myIp);
      const portsList = PORTS.reduce(
        (acc, cur) => [...acc, ...range(cur.from, cur.to)],
        [],
      );
      const urls = ipList.reduce((acc, ip) => [
        ...acc,
        ...portsList.map(port => 'http://' + ip + ':' + port + '/api/hello'),
      ]);
      console.log(urls);
      const s = await promiseAny(
        urls.map(url => fetch(url).then(r => r.json())),
      );
      console.log(s);
      setBackEnd(s.localUrl);
      addSnack({
        severity: 'success',
        message: translate('api.backendFound'),
      });
    } catch (e) {
      addSnack({
        severity: 'error',
        message: translate('api.notFound'),
      });
    }
  };

  useEffect(() => {
    AsyncStorage.getItem(APP_BACKEND).then(setApiUrl);
  }, []);

  useEffect(() => {
    const urlencoded = new URLSearchParams();
    urlencoded.append('user', 'PDA');
    urlencoded.append(
      'password',
      '-%7B3mk%23%2CDM%23%25*wV6KvuB0%5DKK%7B%7Dmnm010r%3Dxz%24',
    );
    if (apiUrl) {
      fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'PDA',
          password: '-%7B3mk%23%2CDM%23%25*wV6KvuB0%5DKK%7B%7Dmnm010r%3Dxz%24',
        }),
      })
        .then(response => {
          setNetworkError(false);
          return handleError(response);
        })
        .then(response => response && response.json().catch(e => ({})))
        .then(res => {
          console.log('res', res);
          setConnected(true)
          setJWT(res.token);
        })
        .catch(error => {
          console.error('error', error);
          snack.error(translate('connectionError'),)
          setNetworkError(error);

          // throw error;
        });
    }
  }, [post, apiUrl, snack, translate]);

  const fetchUrl = useCallback(
    (endpoint, options) => {
      return fetch(`${apiUrl}/api/${endpoint}`, options)
        .then(response => {
          setNetworkError(false);
          setConnected(true)
          return handleError(response);
        })
        .then(response => response && response.json().catch(e => ({})))
        .catch(error => {
          console.error('error', error);
          setNetworkError(error);
          throw error;
        });
    },
    [apiUrl],
  );

  const getHeader = useCallback(
    () => ({
      'Content-Type': 'application/json',
      'x-access-token': JWT,
    }),
    [JWT],
  );

  const post = useCallback(
    (endpoint, data) =>
      fetchUrl(endpoint, {
        method: 'POST',
        headers: getHeader(),
        body: JSON.stringify(data),
      }),
    [getHeader, fetchUrl],
  );

  const put = useCallback(
    (endpoint, data) =>
      fetchUrl(endpoint, {
        method: 'PUT',
        headers: getHeader(),
        body: JSON.stringify(data),
      }),
    [getHeader, fetchUrl],
  );

  const patch = useCallback(
    (endpoint, data) =>
      fetchUrl(endpoint, {
        method: 'PATCH',
        headers: getHeader(),
        body: JSON.stringify(data),
      }),
    [getHeader, fetchUrl],
  );

  const del = useCallback(
    endpoint =>
      fetchUrl(endpoint, {
        method: 'DELETE',
        headers: getHeader(),
      }),
    [getHeader, fetchUrl],
  );

  const get = useCallback(
    (endpoint, options) =>
      fetchUrl(endpoint, {
        method: 'GET',
        headers: getHeader(),
        ...options,
      }),
    [getHeader, fetchUrl],
  );

  return (
    <Provider
      value={{
        networkError,
        setJWT,
        JWT,
        post,
        put,
        get,
        del,
        patch,
        setNetworkError,
        findBackend,
        apiUrl,
        setBackEnd,
        connected,
      }}>
      {children}
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

  return {
    networkError: ctx.networkError,
    setNetworkError: ctx.setNetworkError,
    setJWT: ctx.setJWT,
    JWT: ctx.JWT,
    post: ctx.post,
    put: ctx.put,
    patch: ctx.patch,
    get: ctx.get,
    del: ctx.del,
    findBackend: ctx.findBackend,
    apiUrl: ctx.apiUrl,
    setBackEnd: ctx.setBackEnd,
    connected: ctx.connected,
  };
};
