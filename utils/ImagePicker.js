import React, { useState, useEffect } from "react";
import { Pressable, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from 'expo-permissions';

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

    console.log(result, "<<< Result");

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Pressable style={styles.imagePicker} title="Pick an image" onPress={pickImage}></Pressable>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
const styles=StyleSheet.create ({
  imagePicker: {
    width: 300,
    margin: 10,
    backgroundColor: 'purple'
  }
})
