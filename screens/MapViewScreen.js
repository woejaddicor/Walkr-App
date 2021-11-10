import MapView, { Marker, Callout } from "react-native-maps";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Image,
} from "react-native";
import { ref, onValue } from "firebase/database";
import { getStorage, getDownloadURL, ref as storeRef } from "firebase/storage";

import db from "../config/Database";
import createChatRoom from "../utils/createChatRoom";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const MapViewScreen = () => {
  const [region, setRegion] = useState({
    latitude: 53.4721,
    longitude: -2.2382,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile, setChatRoom, setChatListView } = useContext(
    AuthenticatedUserContext
  );

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const userIds = Object.keys(data);
      const result = Object.entries(data);
      const storage = getStorage();

      const getImages = result.map((user) => {
        const pathReference = storeRef(storage, `users/${user[0]}/avatar`);
        return getDownloadURL(storeRef(storage, pathReference)).then((url) => {
          user[1].httpUrl = url;
        });
      });

      return Promise.all(getImages).then(() => {
        setIsLoading(false);
        setWalkers(result);
      });
    });
  }, []);

  const handleChatButton = (walkername, walkerid) => {
    const res = createChatRoom(
      user.uid,
      walkerid,
      profile.firstname,
      walkername
    );
    setChatRoom([walkername, res]);
    setChatListView(false);
  };

  const demoWalkers = [
    {
      firstname: "John",
      lastname: "Walkington",
      postcode: "M1 D0G",
      userType: "walkers",
      latitude: 53.4721,
      longitude: -2.2382,
    },
    {
      firstname: "Joe",
      lastname: "bloggs",
      postcode: "M1 D0G",
      userType: "walkers",
      latitude: 53.478602,
      longitude: -2.24028,
    },
    {
      firstname: "demo",
      lastname: "3",
      postcode: "M1 D0G",
      userType: "walkers",
      latitude: 53.456032,
      longitude: -2.014567,
    },
    {
      firstname: "demo",
      lastname: "4",
      postcode: "M1 D0G",
      userType: "walkers",
      latitude: 53.4783,
      longitude: -2.241234,
    },
    {
      firstname: "demo",
      lastname: "5",
      postcode: "M1 D0G",
      userType: "walkers",
      latitude: 53.500132,
      longitude: -2.10453,
    },
  ];

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
      {walkers.map((walker) => {
        let latitude = Number.parseFloat(walker[1].latitude);
        let longitude = Number.parseFloat(walker[1].longitude);
        return (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Callout
              style={styles.plainView}
              onPress={() => {
                handleChatButton(walker[1].firstname, walker[1].userid);
              }}
            >
              <View style={styles.container}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                  source={{
                    uri: walker[1].httpUrl,
                  }}
                />
                <Text>
                  {walker[1].firstname} {walker[1].lastname}
                </Text>
                <Text>Postcode: {walker[1].postcode}</Text>
                <Text>
                  Bio: 28 year old dog walker based in Manchester city centre
                </Text>
                <Button
                  title="Chat🐕"
                  onPress={() => {
                    console.log("Inside Pressable");
                  }}
                >
                  Chat🐕
                </Button>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1C6AD",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  plainView: {
    width: 150,
    height: 200,
  },
});
