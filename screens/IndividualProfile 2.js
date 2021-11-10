import React from "react";
import { StyleSheet, Text, View } from "react-native";
import db from "../config/Database";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";


export default function individualProfile ({route, navigation}) {
    const [individualProfile, setIndivudalProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {walker} = route.params;

    useEffect(() => {
      const user = ref(db, `users/walkers/${userId}`);
      onValue(users, (snapshot) => {
        const data = snapshot.val();
        const userIds = Object.keys(data);
        const result = Object.values(data);
  
        const newArr = [];
        const userArr = userIds.map((id) => {
          [id]["firstname"];
        });
  
        setIndividualProfile(result);
        setIsLoading(false);
      });
    }, []);

    if (isLoading)
    return (
      <View>
        <Text>Is loading</Text>
      </View>
    );
  return (
    <View>
      
    </View>
  );
}

const styles = StyleSheet.create({});
