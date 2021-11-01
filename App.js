import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Header";
import Login from "./Login";
import Nav from "./Nav";
import SignUp from "./components/SignUp";
import MapSearch from "./components/MapSearch";
import Home from "./components/Home";

import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <>
      <Header />
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="home">
          <Drawer.Screen name="home" component={Home} />
          <Drawer.Screen name="login" component={Login} />
          <Drawer.Screen name="sign up" component={SignUp} />
          <Drawer.Screen name="nearby walkers " component={MapSearch} />

          {/* <Drawer.Screen name="login" component={Login} /> */}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
