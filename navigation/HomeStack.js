import React from "react";
import { View, Text, SafeAreaView, StyleSheet, IconButton } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/Profile";
import ListWalkersScreen from "../screens/ListWalkers";
import MapViewScreen from "../screens/MapViewScreen";
import BookingScreen from "../screens/BookingScreen";
import ChatScreen from "../screens/ChatScreen";
import SupportScreen from "../screens/SupportScreen";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { getAuth } from "@firebase/auth";
import LandingPage from "../screens/LandingPage";
import Header from "../screens/Header";
import CreateProfile from "../screens/CreateProfile";
import individualProfile from "../screens/IndividualProfile";

const Drawer = createDrawerNavigator();

const auth = getAuth();

const handleSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => <Text style={{ color: "white" }}>Log Out</Text>}
        style={{ backgroundColor: "gray" }}
        onPress={() => handleSignOut()}
      />
    </DrawerContentScrollView>
  );
}

export default function HomeStack({ navigation }) {
  return (
    <>
      <Header />
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={CreateProfile} />
        <Drawer.Screen name="Walkers" component={ListWalkersScreen} />
        <Drawer.Screen name="Map View" component={MapViewScreen} />
        <Drawer.Screen name="Bookings" component={BookingScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="Individual Profile" component={individualProfile}/>
      </Drawer.Navigator>
    </>
  );
}
