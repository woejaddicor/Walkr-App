import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ChatRoom from "../screens/ChatRoom";
import ChatScreen from "../screens/ChatScreen";

const ChatNav = () => {
  const [chatListView, setChatListView] = useState(true);
  const [chatRoom, setChatRoom] = useState(null);
  return (
    <NavigationContainer independent={true}>
      {chatListView ? (
        <ChatScreen
          chatListView={chatListView}
          setChatListView={setChatListView}
          chatRoom={chatRoom}
          setChatRoom={setChatRoom}
        />
      ) : (
        <ChatRoom
          chatListView={chatListView}
          setChatListView={setChatListView}
          chatRoom={chatRoom}
          setChatRoom={setChatRoom}
        />
      )}
    </NavigationContainer>
  );
};

export default ChatNav;
