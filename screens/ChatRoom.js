import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import db from "../config/Database";
import { ref, set, get, serverTimestamp, push } from "firebase/database";

const ChatRoom = () => {
  const [messageHistory, setMessageHistory] = useState();
  const [newMessage, setNewMessage] = useState();
  const { user, profile, chatRoom, setChatListView } = useContext(
    AuthenticatedUserContext
  );

  useEffect(() => {
    if (chatRoom) {
      const messageRef = ref(db, `chatrooms/${chatRoom[1]}`);
      get(messageRef, chatRoom)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            set(ref(db, `chatrooms/${chatRoom[1]}`), {
              "--key": {
                user: profile.firstname,
                message: "Lets start chatting",
                timestamp: serverTimestamp(),
              },
            });
          }
        })
        .then(() => {
          get(messageRef, chatRoom).then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data) {
                const messages = Object.values(data);
                const array = messages.map((message) => {
                  return Object.entries(message);
                });
                if (array) setMessageHistory(array);
              }
            }
          });
        });
    }
  }, [chatRoom, messageHistory]);

  function writeMessage(message) {
    console.log(user, message, chatRoom[1]);
    push(ref(db, `chatrooms/${chatRoom[1]}`), {
      user: profile.firstname,
      message,
      timestamp: serverTimestamp(),
    });
  }

  const handleSubmit = () => {
    writeMessage(newMessage);
    setNewMessage("");
  };

  return (
    <View>
      {chatRoom ? <Text>Chatting with {chatRoom[0]}</Text> : null}
      <Text>Message History</Text>
      {messageHistory
        ? messageHistory.map((message) => {
            let mess = [];
            message.map((messageData) => {
              if (messageData[0] === "message") {
                mess[0] = messageData[1];
              } else if (messageData[0] === "timestamp") {
                mess[3] = messageData[1];
                const date = new Date(messageData[1]);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const hours = date.getHours();
                let minutes = date.getMinutes();
                if (minutes < 10) {
                  minutes = `0` + minutes;
                }
                mess[1] = `sent at ${hours}:${minutes}`;
              } else if (messageData[0] === "user") {
                mess[2] = messageData[1];
              }
            });
            return (
              <>
                <Text key={mess[3]}>{mess[0]} </Text>
                <Text key={mess[3] * 2}>
                  {mess[1]} by {mess[2]}
                </Text>
              </>
            );
          })
        : null}
      <TextInput onChangeText={setNewMessage} value={newMessage} />
      <Button
        title="Send"
        onPress={handleSubmit}
        disabled={!newMessage || newMessage === ""}
      />
      <Button
        title="Go Back"
        onPress={() => {
          setChatListView(true);
        }}
      ></Button>
    </View>
  );
};

export default ChatRoom;
