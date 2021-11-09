import React, { useState, createContext } from "react";

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [chatListView, setChatListView] = useState(true);
  const [chatRoom, setChatRoom] = useState(null);

  return (
    <AuthenticatedUserContext.Provider
      value={{
        user,
        setUser,
        profile,
        setProfile,
        chatRoom,
        setChatRoom,
        chatListView,
        setChatListView,
      }}
    >
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
