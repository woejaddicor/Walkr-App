import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import db from "../config/Database";
import { ref, set, get, serverTimestamp, push } from "firebase/database";

const ChatRoom = () => {
  const [messageHistory, setMessageHistory] = useState();
  const [newMessage, setNewMessage] = useState();
  const { profile, chatRoom, setChatListView } = useContext(
    AuthenticatedUserContext
  );
  const scrollViewRef = useRef();

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
    <ScrollView
      style={styles.chatroom}
      ref={scrollViewRef}
      onContentSizeChange={() =>
        scrollViewRef.current.scrollToEnd({ animated: true })
      }
    >
      {chatRoom ? <Text>Chatting with {chatRoom[0]}</Text> : null}
      <Text>Message History</Text>

      <View style={styles.chatcontainer}>
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
                <View key={mess[3]}>
                  <View
                    style={
                      mess[2] === profile.firstname
                        ? styles.viewusertrue
                        : styles.viewuserfalse
                    }
                  >
                    <Text
                      style={
                        mess[2] === profile.firstname
                          ? styles.usertrue
                          : styles.userfalse
                      }
                    >
                      {mess[0]}{" "}
                    </Text>
                  </View>

                  <Text
                    style={
                      mess[2] === profile.firstname
                        ? styles.infousertrue
                        : styles.infouserfalse
                    }
                  >
                    {mess[1]} by {mess[2]}
                  </Text>
                </View>
              );
            })
          : null}
      </View>

      <TextInput
        placeholder="Enter message"
        multiline={true}
        numberOfLines={4}
        onChangeText={setNewMessage}
        value={newMessage}
        style={styles.textinput}
      />
      <Button
        title="Send"
        onPress={handleSubmit}
        disabled={!newMessage || newMessage === ""}
        style={
          !newMessage || newMessage === ""
            ? styles.sendbuttondisable
            : styles.sendbutton
        }
      />
      <Button
        title="Go Back"
        onPress={() => {
          setChatListView(true);
        }}
      ></Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatroom: {
    backgroundColor: "#d1c6ad",
  },
  usertrue: {
    color: "black",
    textAlign: "left",
    fontSize: 15,
  },
  userfalse: {
    color: "black",
    textAlign: "right",
    fontSize: 15,
  },
  viewusertrue: {
    backgroundColor: "white",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    width: "60%",
    borderWidth: 0,
    borderColor: "black",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  viewuserfalse: {
    backgroundColor: "#2C97F3",
    marginRight: 5,
    marginLeft: "auto",
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    width: "60%",
    borderWidth: 0,
    borderColor: "black",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 0,
  },
  infousertrue: {
    marginLeft: 10,
    width: "70%",
    fontSize: 10,
  },
  infouserfalse: {
    textAlign: "right",
    marginRight: 10,
    marginLeft: "auto",
    width: "50%",
    fontSize: 10,
  },
  textinput: {
    borderWidth: 0,
    borderColor: "black",
    backgroundColor: "#f0ede5",
    borderRadius: 5,
    height: 50,
    width: "97%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
  },
  sendbuttondisable: {
    backgroundColor: "black",
  },
  sendbutton: {
    backgroundColor: "red",
  },
});

export default ChatRoom;
