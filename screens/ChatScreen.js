import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import createChatRoom from "../utils/createChatRoom";
import ChatRoom from "./ChatRoom";

export default function ChatScreen() {
  const [chats, setChats] = useState();
  const { profile, user } = useContext(AuthenticatedUserContext);
  console.log(chats);

  useEffect(() => {
    const chatRef = ref(db, `chat/${user.uid}/`);
    onValue(chatRef, (snapshot) => {
      if (snapshot.val()) {
        const data = Object.entries(snapshot.val());
        setChats(data);
      }
    });
  }, []);

  return (
    <>
      {chats &&
        chats.map((chat) => {
          return (
            <Pressable
              key={chat[0]}
              onPress={() => {
                return <ChatRoom />;
              }}
            >
              {chat[0]}
            </Pressable>
          );
        })}
      <Button
        onPress={() => {
          createChatRoom(user.uid, "Rick");
        }}
      >
        Create Chat
      </Button>
      <Text>Chat</Text>
    </>
  );
}

const styles = StyleSheet.create({});
