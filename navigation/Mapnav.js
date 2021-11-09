import React, { useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import MapViewScreen from "../screens/MapViewScreen";
import ChatRoom from "../screens/ChatRoom";

const MapNav = () => {
  const { chatListView } = useContext(AuthenticatedUserContext);
  return (
    <NavigationContainer independent={true}>
      {!chatListView ? <ChatRoom /> : <MapViewScreen />}
    </NavigationContainer>
  );
};

export default MapNav;