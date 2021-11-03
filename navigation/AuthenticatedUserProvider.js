import React, { useState, createContext } from 'react';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({})

  return (

    <AuthenticatedUserContext.Provider value={{ user, setUser, profile, setProfile }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
