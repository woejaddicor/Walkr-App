import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { getStorage, getDownloadURL, ref as storeRef } from "firebase/storage";
import { useState, useEffect } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { Button } from "../components";

const ListWalkers = ({ navigation }) => {
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const result = Object.values(data);

      setWalkers(result);
      setIsLoading(false);
    });
  }, []);

  const storage = getStorage();
  const pathReference = storeRef(storage, "users/8Uyll1qbJceuX8FBPKMNU5DOdOC2/avatar");

  getDownloadURL(storeRef(storage, pathReference)).then((url) => {
    setImageURL(url);
  });

  if (isLoading)
    return (
      <View>
        <Text>Is loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Walkers in your area</Text>
      <View>
        <Image
          style={{ width: "100%", height: "50%" }}
          source={{
            uri: `${imageURL}`,
          }}
        />
        {walkers.map((walker) => {
          return (
            <Collapse style={styles.card}>
              <CollapseHeader>
                <Text>
                  Full Name: {walker.firstname} {walker.lastname}
                </Text>
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
