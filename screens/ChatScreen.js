import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View, Image } from "react-native";
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

                navigation.navigate("ChatRoom", { screen: "ChatRoom" });
              }}
            >
              <Text style={styles.roomText}>{chat[0]} 💬</Text>
            </Pressable>
          );
        })}
        <Image style={styles.logo} source={require("../Images/walkr.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  chatcontainer: {
    backgroundColor: "#d1c6ad",
    flex: 1,
  },
  chatoption: {
    backgroundColor: "#f0ede5",
    borderColor: "#b2d2b6",
    borderWidth: 2,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    width: "95%",
    fontSize: 25,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    color: "#1C7C54",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10
  },
  roomText: {
    fontSize: 18,
    color: "#1C7C54",
    fontWeight: "500", 
  },
  logo: {
    height: 200,
    width: 360,
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: "center",
    marginTop: -10,
    marginBottom: 20,
  },
});
