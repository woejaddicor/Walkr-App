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
          style={{ width: 200, height: 200, alignContent: "center" }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  imagePicker: {
    width: "80%",
    fontSize: 25,
    margin: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: "gray",
    textAlign: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  imageButtonText: {
    fontSize: 20,
  },
});
