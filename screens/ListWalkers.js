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
    <View>
      <Text style={styles.title}>All Walkers in your area</Text>
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
  );
};

export default ListWalkers;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
});
