import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ChatRoom from "../screens/ChatRoom";
import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import ListWalkers from "../screens/ListWalkers";

const WalkersNav = () => {
  const { chatListView } = useContext(AuthenticatedUserContext);
  return (
    <NavigationContainer independent={true}>
      {!chatListView ? <ChatRoom /> : <ListWalkers />}
    </NavigationContainer>
  );
};

export default WalkersNav;
