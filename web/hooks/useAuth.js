import * as React from "react";

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState(false);

  const login = () => {
    return new Promise((res) => {
      setAuthed(true);
      res();
    });
  }

  const logout = () => {
    return new Promise((res) => {
      setAuthed(false);
      res();
    });
  }

  const auth = {
    authed,
    login,
    logout, 
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}