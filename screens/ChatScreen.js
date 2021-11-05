import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";

export default function ChatScreen() {
  const [chats, setChats] = useState();
  const { profile, user } = useContext(AuthenticatedUserContext);
  console.log(user, profile.userType);

  useEffect(() => {
    const chatRef = ref(db, `users/${profile.userType}/${user.uid}/chatrooms`);
    onValue(chatRef, (snapshot) => {
      const data = Object.entries(snapshot.val());
      setChats(data);
    });
  }, []);

  // const demoRef = ref(db, `users/walkers/${user.uid}`);
  //       onValue(demoRef, (snapshot) => {
  //         const data = snapshot.val();
  //         setProfile(data);

  return (
    <View>
      {chats &&
        chats.map((chat) => {
          return <Pressable>{chat[0]}</Pressable>;
        })}
      <Text>Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
