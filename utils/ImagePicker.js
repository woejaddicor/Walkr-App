import React, { useState, useEffect } from "react";
import {
  Pressable,
  Image,
  View,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerUtil({ image, setImage }) {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.imagePicker}
        title="Pick an image"
        onPress={pickImage}
      >
        <Text style={styles.imageButtonText}>Choose profile picture</Text>
      </Pressable>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 175, height: 175, alignContent: "center" }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  imagePicker: {
    margin: 10,
    borderRadius: 10,
    borderColor: '#b2d2b6',
    borderWidth: 3,
    backgroundColor: "#1c7c54",
    textAlign: "center",
    padding: 10,
    marginBottom: 15
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageButtonText: {
    fontSize: 20,
    color: "white"
  },
});
