import React from "react";
import { View, Text, SafeAreaView, StyleSheet, IconButton } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
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
import Header from "../screens/Header";
import CreateProfile from "../screens/CreateProfile";
import ChatNav from "./ChatNav";
import Ionicons from 'react-native-vector-icons/Ionicons'

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
      <DrawerItemList style={{color: 'black'}} {...props} />
      <DrawerItem
        label={() => <Text style={{ color: "white" }}>Log Out</Text>}
        style={styles.drawList}
        onPress={() => handleSignOut()}
      />
    </DrawerContentScrollView>
  );
}

export default function HomeStack({ navigation }) {
  return (
    <>
      {/* <Header style={styles.header}/> */}
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#B2D2B6',
            width: 240,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} 
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="md-home"
                size={size}
                color={'#1C7C54'}
             />
          ),
       }}/>
        <Drawer.Screen name="Profile" component={CreateProfile}
        options={{
          title: 'Profile',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="person-outline"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Walkers" component={ListWalkersScreen} 
        options={{
          title: 'Walkers',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="walk"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Map View" component={MapViewScreen} 
        options={{
          title: 'Map View',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="map"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Bookings" component={BookingScreen} 
        options={{
          title: 'Bookings',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="card"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Chat" component={ChatNav} 
        options={{
          title: 'Chat',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="chatbox-ellipses-outline"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Support" component={SupportScreen} 
        options={{
          title: 'Support',
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="settings-outline"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
      </Drawer.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  drawList: {
    backgroundColor: "#1C7C54"
  },
})
