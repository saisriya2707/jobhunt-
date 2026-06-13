import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const login = (jwtToken, name) => {
    localStorage.setItem('jwtToken', jwtToken);
    localStorage.setItem('userName', name);
    setToken(jwtToken);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userName');
    setToken(null);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ token, userName, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
