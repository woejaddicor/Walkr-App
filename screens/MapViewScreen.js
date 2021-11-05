import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function MapViewScreen() {
  const [region, setRegion] = useState({
    latitude: 53.4721,
    longitude: -2.2382,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  return (
    <MapView
      // style={{ flex: 1 }}
      style={styles.map}
      // provider={PROVIDER_GOOGLE}
      mapType="hybrid"
      region={region}
      onRegionChangeComplete={(region) => setRegion(region)}
    >
      {/* <Marker coordinate={{ latitude: 53.4721, longitude: -2.2382 }} /> */}
    </MapView>
  );
}

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
});
