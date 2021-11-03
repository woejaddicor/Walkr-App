import React from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";

const ListWalkers = () => {
  return (
    <View>
      <Text style={styles.title}>All Walkers in your area</Text>
      <Text>Walker #1</Text>
      <Text>Walker #2</Text>
      <Text>Walker #3</Text>
      <Text>Walker #4</Text>
      <Text>Walker #5</Text>
    </View>
  );
};

export default ListWalkers;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
});
