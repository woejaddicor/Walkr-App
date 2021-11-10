import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const stripeHTML = require("../stripe/index.html");

export default function BookingScreen() {
  return <WebView source={{ uri: "https://stripespike.firebaseapp.com/" }} />;
}
