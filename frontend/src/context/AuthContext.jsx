import React, { useState, useEffect, createContext } from 'react';

const AuthContext = createContext({});

export default AuthContext;

export function AuthProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getLocalUser = localStorage.getItem('user');

    if (getLocalUser) {
      setUser(JSON.parse(getLocalUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
