import React from "react";
import {Text, StyleSheet} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
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

import WalkersNav from "./WalkersNav";
import MapNav from "./Mapnav";

import ListWalkers from "../screens/ListWalkers";
import MapViewScreen from "../screens/MapViewScreen";


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
      {/* <Header /> */}
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
          drawerIcon: ({focused, size}) => (
             <Ionicons
                name="person-outline"
                size={size}
                color={'#1C7C54'}
             />
          ),
        }}/>
        <Drawer.Screen name="Walkers" component={ListWalkers} 
        options={{
          title: 'Walkers',
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
          headerStyle: {
            backgroundColor: "#B2D2B6"
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily: 'Arial'
          },
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
