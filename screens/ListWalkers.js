import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { Button } from "../components";


const ListWalkers = ({navigation}) => {
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const userIds = Object.keys(data);
      // console.log(data, "<===data");
      const result = Object.values(data);
      // console.log(result, "<==result");

      const newArr = [];
      const userArr = userIds.map((id) => {
        [id]["firstname"];
      });

      setWalkers(result);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <View>
        <Text>Is loading</Text>
      </View>
    );
  console.log(walkers[0].avatar);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Walkers in your area</Text>
      <View>
        {walkers.map((walker) => {
          return (
            <Collapse style={styles.card}>
  <CollapseHeader>  
        <Text>Full Name: {walker.firstname} {walker.lastname}</Text>
          <Text>Post Code: {walker.postcode}</Text>  
  </CollapseHeader>
    <CollapseBody>
      <Text>Magic!!</Text>
      <Text>Magic!!!</Text>
      <Text>Magic!!</Text>
      <Text>Magic!!</Text>
      <Text>Magic!!</Text>
      <Text>Magic!!</Text>
      <Button
  title={walker.firstname}
  color="#841584"
  accessibilityLabel="Chat with this walker"
/>
  </CollapseBody>
</Collapse>
          );
        })}
      </View>
    </View>
  );
};

export default ListWalkers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
  },
  card: {
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#FFA45E",
    borderWidth: 4,
    borderRadius: 6,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});
