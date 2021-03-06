import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatRoom from "../screens/ChatRoom";
import ChatScreen from "../screens/ChatScreen";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";

const ChatNav = () => {
  const { chatListView } = useContext(AuthenticatedUserContext);
  return (
    <NavigationContainer independent={true}>
      {chatListView ? <ChatScreen /> : <ChatRoom />}
    </NavigationContainer>
  );
};

export default ChatNav;
