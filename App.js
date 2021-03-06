
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './navigation';
import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <>
    <Routes />
    </>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
