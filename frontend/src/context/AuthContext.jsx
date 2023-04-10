import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext({});

export default AuthContext;

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLocalUser = localStorage.getItem('user');

    if (getLocalUser) {
      const user = JSON.parse(getLocalUser);
      setUser(user);
      setAuthorization(user?.token);
    }
  }, []);

  const setAuthorization = (token) => {
    const t = token || localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + t;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        setAuthorization,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
