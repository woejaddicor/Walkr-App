import { getAuth } from "@firebase/auth";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Button, RNButton, Image } from "react-native";

import { IconButton } from "../components";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
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
          <Image style={styles.logo} source={require('../Images/walkr.png')}/>
          <StatusBar style="dark-content" />
          <View style={styles.row}>
            <Text style={styles.title}>Welcome {user.email}!</Text>
          </View>
          <Text style={styles.aboutWalkr}>Walkr was created to unite dog lovers with those who's canine pals are in need of some daily love. By using this app you can find the perfect human companion for your dog.</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1C6AD",
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
    textAlign: "center",
    marginLeft: 35,
    color: "#1C7C54",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginRight: 8,
    color: "#1C7C54",
  },
  logo: {
    height: 200,
    width: 360,
    alignItems: "center",
    marginBottom: -20,
    marginTop: -50
  },
  aboutWalkr: {
    color:"#1C7C54",
    fontSize: 16,
    fontWeight: '400',
    textAlign: "center",
    marginRight: 20,
    marginTop: 100,
    fontStyle: "italic"
  }
});
