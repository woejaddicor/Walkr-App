import { getAuth } from "@firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button, RNButton } from "react-native";

import { IconButton } from "../components";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import HomeStack from "../navigation/HomeStack";
import CreateProfile from "./CreateProfile";

const auth = getAuth();

export default function HomeScreen({ navigation }) {
  const { user, profile, setProfile } = useContext(AuthenticatedUserContext);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const demoRef = ref(db, `users/owners/${user.uid}`);
    onValue(demoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      } else {
        const demoRef = ref(db, `users/walkers/${user.uid}`);
        onValue(demoRef, (snapshot) => {
          const data = snapshot.val();
          setProfile(data);
        });
      }
    });
  }, []);

  const onPress = () => {
    navigation.navigate("HomeStack");
  };

  return (
    <>
      {!profile ? (
        <CreateProfile />
      ) : (
        <View style={styles.container}>
          <StatusBar style="dark-content" />
          <View style={styles.row}>
            <Text style={styles.title}>Welcome {user.email}!</Text>
            <IconButton
              name="logout"
              size={24}
              color="#fff"
              onPress={handleSignOut}
            />
          </View>
          <Text style={styles.text}>Your UID is: {user.uid} </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
});
