import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function SupportScreen() {
  return (
    <View>
      <Text>Support</Text>
      <TextInput
        style={styles.input}
        value={Text}
        placeholder="Tell us about your problem"
        keyboardType="text"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
