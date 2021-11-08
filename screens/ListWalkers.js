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
import { ScrollView } from "react-native-gesture-handler";
import { Button } from 'react-native-paper';


const ListWalkers = ({ navigation }) => {
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <ScrollView>
      <View style={styles.container}>
      <Text style={styles.title}>All Walkers in your area</Text>
      <View>
        {walkers.map((walker) => {
          console.log(walker);
          
          return (
            <Collapse style={styles.card}>
              <CollapseHeader>
              <Image
                style={{ width: 155, height: 155, borderRadius: 10, marginTop: 10}}
                source={{
                  uri: walker[1].httpUrl,
                }}
              />
                <Text style={styles.name}>{walker[1].firstname} {walker[1].lastname}</Text>
              <Text style={styles.postcode}>{walker[1].hourlyRate}</Text>
                <Text style={styles.postcode}>Post Code: {walker[1].postcode}</Text>
                <Button accessibilityLabel="Show more" mode="contained" style={styles.moreButton}>Show More</Button>
              </CollapseHeader>
              <CollapseBody>
                <Text style={styles.postcode}>{walker[1].userType}</Text>
                <Text style={styles.bio}>{walker[1].bio}</Text>
                <Button
                  accessibilityLabel="Chat with this walker"
                  mode="contained" icon="message" color="#D1C6AD" style={styles.button}>Chat now!</Button>
              </CollapseBody>
            </Collapse>
          );
        })}
      </View>
    </View>
  </ScrollView>
  );
};

export default ListWalkers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D1C6AD",
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 30,
  },
  card: {
    borderColor: "#241909",
    borderStyle: "solid",
    alignItems: "center",
    backgroundColor: "#C16E70",
    borderWidth: 4,
    borderRadius: 10,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
    fontWeight: "bold"
  },
  postcode: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 15,
  },
  bio: {
    marginHorizontal: 20
  },
  button: {
    marginTop: 20,
    padding: 6,
    marginBottom: 8,
    width: 300,
    marginLeft: 19,
    borderColor: '#562526',
    borderWidth: 3,
    shadowOffset: {
      width: -3,
	    height: 2,
    },
    backgroundColor: '#D49B9C',
  },
  moreButton: {
    borderColor: '#562526',
    borderWidth: 3,
    shadowOffset: {
      width: -3,
	    height: 2,
    },
    backgroundColor: '#D49B9C',
  }
});
