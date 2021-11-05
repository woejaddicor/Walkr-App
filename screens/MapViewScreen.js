import MapView, { Marker, Callout } from "react-native-maps";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { ref, onValue } from "firebase/database";
import db from '../config/Database'
// import { Button } from "../components";

const MapViewScreen = () => {
  const [region, setRegion] = useState({
    latitude: 53.4721,
    longitude: -2.2382,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const userIds = Object.keys(data);
      // console.log(data, "<===data");
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

  const demoWalkers = [
    {firstname: "John",
    lastname: "Walkington",
    postcode: "M1 D0G",
    userType: "walkers",
    latitude: 53.4721,
    longitude: -2.2382
  },
  {
    firstname: 'Joe',
    lastname: 'bloggs',
    postcode: 'M1 D0G',
    userType: 'walkers',
    latitude: 53.478602,
    longitude: -2.240280
  }
  ]

  if (isLoading)
    return (
      <View>
        <Text>Is loading</Text>
      </View>
    );

  return (
    <MapView
      style={{ flex: 1 }}
      style={styles.map}
      // provider={}
      mapType="hybrid"
      region={region}
      onRegionChangeComplete={(region) => setRegion(region)}
    >
      {demoWalkers.map((walker) => {
        console.log(walker);
        return (
        <Marker coordinate={{ latitude: walker.latitude ,longitude: walker.longitude }}>
         <Callout style={styles.plainView}>
              <View>
                <Text>🐶{walker.firstname} {walker.lastname}</Text>
                <Text>🐶Postcode: {walker.postcode}</Text>
                <Text>🐶Bio: 28 year old dog walker based in Manchester city centre</Text>
                <Button title="🐶Chat🐶">🐶🐶🐶🐶</Button>
              </View>
            </Callout> 
        </Marker>
        )
      })}
    </MapView>
  );
}

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  plainView: {
    width: 150,
    height: 200
  },
});
