import React from "react";
import { View, Button, Text, Image, StyleSheet } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";

const users = ref(db, "/");

onValue(users, (snapshot) => {
  const data = snapshot.val();
});

const Profile = () => {
  return (
    <View>
      <Text>First Name: Joe</Text>
      <Text>Last Name: Bloggs</Text>
      <Image
        style={styles.profileImage}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <Text>About me.......</Text>
      <Text>Dogs......</Text>
      <Button title="Edit profile" />
    </View>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
  },
});

export default Profile;
