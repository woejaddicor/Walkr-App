import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function ChatScreen() {
  const navigation = useNavigation();
  const [chats, setChats] = useState();
  const { user } = useContext(AuthenticatedUserContext);
  const { setChatListView, chatRoom, setChatRoom } = useContext(
    AuthenticatedUserContext
  );

  useEffect(() => {
    const chatRef = ref(db, `chat/${user.uid}/mychats`);
    onValue(chatRef, (snapshot) => {
      if (snapshot.val()) {
        const data = Object.entries(snapshot.val());
        setChats(data);
      }
    });
  }, []);

  return (
    <View style={styles.chatcontainer}>
      <Text style={styles.title}>Chat Rooms</Text>
      {chats &&
        chats.map((chat) => {
          return (
            <Pressable
            style={styles.chatoption}
              key={chat[0]}
              onPress={async () => {
                await setChatListView(false);
                await setChatRoom(chat);
                console.log(chat, "<<<<");

                navigation.navigate("ChatRoom", { screen: "ChatRoom" });
              }}
            >
              <Text>{chat[0]}</Text>
            </Pressable>
          );
        })}


    </View>

  );
}

const styles = StyleSheet.create({
  chatcontainer: {
    backgroundColor: "#d1c6ad",
  },
  chatoption: {
    backgroundColor: "#f0ede5",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: "80%",
    fontSize: 25,
    borderRadius: 5
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    margin: 10
  }
});
