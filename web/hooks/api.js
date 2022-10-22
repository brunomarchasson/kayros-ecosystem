import React, {
  useState, useContext, useMemo,
} from 'react';
import { PropTypes } from 'prop-types';
import ky from 'ky';
import config from '../config';

const NetworkContext = React.createContext();
const { Provider } = NetworkContext;

// const handleError = async (response) => {
//   if (response.ok) return response;
//   let err;
//   try {
//     err = await response.json();
//   } catch (e) {
//     err = response.statusText;
//   }
//   throw err;
// };

export function ApiProvider({ children, apiId }) {
  const [networkError, setNetworkError] = useState(false);
  const [JWT, setJWT] = useState();
  const api = useMemo(
    () => ky.extend({
      // prefixUrl: `${config.api.origin}/${apiId}/api/`,
      prefixUrl: `${config.api.origin}/api`, // `proxy.kayros-artware.com/api/`,
      headers: {
        'x-access-token': JWT,
      },
      hooks: {
        beforeRequest: [
          (req) =>
            // if (!apiId) {
            //   return new Response({}, { status: 401, statusText: 'OK' });
            // }
            req,
        ],
      },
    }),
    [apiId, config.api.origin, JWT],
  );

  return (
    <Provider
      value={ {
        networkError,
        JWT,
        setJWT,
        api,
        apiId,
        setNetworkError,
      } }
    >
      { children }
    </Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  apiId: PropTypes.string,
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
