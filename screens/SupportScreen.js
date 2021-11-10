import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react/cjs/react.development";

export default function SupportScreen() {
  const [problem, setProblem] = useState();
  const [textInput, setTextInput] = useState();
  const issueSelect = [
    "Account problems",
    "Payment issues",
    "Report a user",
    "Join us",
  ];

  return (
    <View>
      <Text>Support</Text>

      <View style={styles.switch}>
        <SelectDropdown
          defaultButtonText={"Select issue"}
          data={issueSelect}
          buttonStyle={styles.dropdown}
          buttonTextStyle={styles.dropdownText}
          onSelect={(selectedItem, index) => {
            setProblem(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>

      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={setTextInput}
        placeholder="Tell us about your problem"
        keyboardType="text"
      />
      <Button 
      title={"Submit"}
      onPress={() => {
        setTextInput('Your response has been sent!')
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
