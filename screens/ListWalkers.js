import React from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const ListWalkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const userIds = Object.keys(data);
      console.log(data, "<===data");
      const result = Object.values(data);
      console.log(result, "<==result");

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
  console.log(walkers);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Walkers in your area</Text>
      <View style={styles.card}>
        {walkers.map((walker) => {
          return (
            <View>
              <Text>First name: {walker.firstname}</Text>
              <Text>Las name: {walker.lastname}</Text>
              <Text>Post code: {walker.postcode}</Text>
            </View>
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
