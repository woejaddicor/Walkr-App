import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateProfile from "../screens/CreateProfile";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="User" component={CreateProfile} />
      
    </Stack.Navigator>
  );
}