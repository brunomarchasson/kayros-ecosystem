import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { childrenProps } from '../proptypes';
import { useApi } from './api';

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState(null);
  const [user, setUser] = useState({});
  const { api, setJWT } = useApi();
  const { i18n } = useTranslation();
  React.useEffect(() => {
    const existingToken = localStorage.getItem('token');
    if (existingToken) {
      // setJWT(existingToken)
      api
        .get('login', {
          headers: {
            'x-access-token': existingToken,
          },
        })
        .json()
        .then((res) => {
          setJWT(res.token);
          setUser(res.user);
          setAuthed(true);
          i18n.changeLanguage(res?.user?.language);
          localStorage.setItem('token', res.token);
        })
        .catch(() => {
          setAuthed(false);
        });
    } else {
      setAuthed(false);
    }
  }, [api]);

  const login = (email, password) => api
    .post('login', { json: { email, password } })
    .json()
    .then((res) => {
      localStorage.setItem('token', res.token);
      setJWT(res.token);
      setUser(res.user);
      i18n.changeLanguage(res?.user?.language);
      setAuthed(true);
    })
    .catch(() => {
      setAuthed(false);
    });

  const logout = () => new Promise((res) => {
    localStorage.removeItem('token');
    setUser(null);
    setJWT(null);
    setAuthed(false);
    res();
  });

  const auth = useMemo(
    () => ({
      authed,
      login,
      logout,
      user,
    }),
    [authed, login, logout, user],
  );

  return <authContext.Provider value={ auth }>{ children }</authContext.Provider>;
}
AuthProvider.propTypes = {
  children: childrenProps,
};

export default function useAuth() {
  return React.useContext(authContext);
}
