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
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const result = Object.entries(data);
      
      const storage = getStorage();
        
        const getImages = result.map((user) => {
          const pathReference = storeRef(storage, `users/${user[0]}/avatar`)
          return getDownloadURL(storeRef(storage, pathReference))
          .then((url) => {
            user[1].httpUrl = url;
          }) 
        })

        return Promise.all(getImages).then(() => {
          setIsLoading(false)
          setWalkers(result)
        })
    });
  }, []);

  
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
        {walkers.map((walker) => {
          console.log(walker);
          
          return (
            <Collapse style={styles.card}>
              <CollapseHeader>
              <Image
                style={{ width: 100, height: 70 }}
                source={{
                  uri: walker[1].httpUrl,
                }}
              />
                <Text>{walker[1].firstname} {walker[1].lastname}</Text>
                <Text>Post Code: {walker[1].postcode}</Text>
              </CollapseHeader>
              <CollapseBody>
                <Text>{walker[1].bio}</Text>
                <Text>{walker[1].userType}</Text>
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
