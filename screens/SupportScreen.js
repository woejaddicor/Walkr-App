import React from "react";
import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
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
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../Images/walkr.png")} />
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
      style={styles.submitButton}
      title={"Submit"}
      onPress={() => {
        setTextInput('Your response has been sent!')
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D1C6AD",
  },
  dropdown: {
    borderRadius: 5,
    backgroundColor: "#b2d2b6",
    height: 40,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    borderColor: "#1C7C54",
    borderWidth: 2,
  },
  dropdownText: {
    color: "#1C7C54",
    fontWeight: "700",
  },
  input: {
    borderWidth: 0,
    borderColor: "black",
    backgroundColor: "#f0ede5",
    borderColor: "#b2d2b6",
    borderWidth: 2,
    borderRadius: 5,
    minHeight: 100,
    fontWeight: "600",
    color: "#1C7C54",
    width: "90%",
    marginLeft: "auto",
    marginTop: 10,
    marginRight: "auto",
    marginBottom: 10,
  },
  submitButton: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    borderColor: "#b2d2b6",
    borderWidth: 3,
    backgroundColor: "#1c7c54",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
  },
  logo: {
    height: 200,
    width: 360,
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: "center",
    marginTop: -10,
    marginBottom: -20,
  },
});
