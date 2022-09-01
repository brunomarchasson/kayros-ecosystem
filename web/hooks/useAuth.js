import React, {useState, useEffect} from "react";
import { useApi } from "./api";
import { useTranslation } from "./Translation";

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const [authed, setAuthed] = React.useState(null);
  const [isAuthentified, setIsAuthentified] = useState(false);
  const [user, setUser] = useState({});
  const {api, setJWT} = useApi()
  const { setLocale } = useTranslation();

  React.useEffect(() => {
    const existingToken = localStorage.getItem("token");
    console.log('existing', existingToken)
    if(existingToken){
      // setJWT(existingToken)
      api.get("login", {headers: {
        'x-access-token': existingToken
      }}).json().then(res => {
        console.log('loginget', res)
        setJWT(res.token);
        setUser(res.user);
        setAuthed(true);
        setLocale(res?.user?.language);
        localStorage.setItem("token", res.token);
      })
      .catch((e) => {
        console.log('eee', e)
        setAuthed(false);
      });
    } else {
      console.log('zaeza')
      setAuthed(false);
    }
  }, [api])

  const login = (email, password) => {
    return api.post('login', {json: {email, password}}).json().then(res => {
      console.log('loged', res)
      localStorage.setItem("token", res.token);
      setJWT(res.token);
      setUser(res.user);
      setLocale(res?.user?.language);
      setAuthed(true);
    }).catch(e=> {
     console.error(e)
      setAuthed(false)
    })
    // return new Promise((res) => {
    //   setAuthed(true);
    //   res();
    // });
  }

  const logout = () => {
    return new Promise((res) => {
      console.log('logout')
      localStorage.removeItem("token");
      setUser(null);
      setJWT(null);
      setAuthed(false);
      res();
    });
  }

  const auth = {
    authed,
    login,
    logout,
    user,
  }

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function useAuth() {
  return React.useContext(authContext);
}
