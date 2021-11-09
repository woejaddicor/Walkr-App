import React from "react";
import db from "../config/Database";
import { set, ref } from "firebase/database";
import { useContext, useState } from "react";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  Switch,
  SafeAreaView,
} from "react-native";
import ImagePickerUtil from "../utils/ImagePicker";
import { getStorage, uploadBytes, ref as pickref } from "@firebase/storage";
import SelectDropdown from "react-native-select-dropdown";

import geoFetch from "../utils/server";

const CreateProfile = () => {
  const { user, setUser, profile, setProfile } = useContext(
    AuthenticatedUserContext
  );
  const [isOwner, setIsOwner] = useState(null);
  const [firstName, onChangeFirstName] = useState();
  const [lastName, onChangeLastName] = useState();
  const [postcode, onChangePostcode] = useState();
  const [error, setError] = useState();
  const [image, setImage] = useState(null);
  const [bio, onChangeBio] = useState("");
  const [success, setSuccess] = useState(false);

  let userType;

  const storage = getStorage();

  const handleButton = () => {
    setSuccess(false);
    if (isOwner === "Owner") {
      userType = "owners";
    } else {
      userType = "walkers";
    }

    geoFetch(postcode)
      .then((res) => {
        return res;
      })
      .then((res) => {
        set(ref(db, `users/${userType}/` + user.uid), {
          firstname: firstName,
          lastname: lastName,
          userType,
          postcode,
          bio,
          avatar: `users/${user.uid}/avatar`,
          longitude: res.longitude,
          latitude: res.latitude,
        });
        return res;
      })
      .then((res) => {
        setProfile({
          firstname: firstName,
          lastname: lastName,
          userType,
          postcode,
          bio,
          avatar: `users/${user.uid}/avatar`,
          longitude: res.longitude,
          latitude: res.latitude,
        });
      })
      .then(() => {
        const response = fetch(image);
        return response;
      })
      .then((response) => {
        const blob = response.blob();
        return blob;
      })
      .then((blob) => {
        const ref = pickref(storage, `users/${user.uid}/avatar`);
        uploadBytes(ref, blob);
      })
      .then(() => {
        onChangeFirstName("");
        onChangeLastName("");
        onChangePostcode("");
        setImage(null);
        onChangeBio("");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const userSelect = ["Walker", "Owner"];

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>User Input</Text>

        <View style={styles.switch}>
          <SelectDropdown
            data={userSelect}
            onSelect={(selectedItem, index) => {
              setIsOwner(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />

          {/* <Text>Walker</Text> */}
          {/* <Switch value={isOwner} onValueChange={toggleSwitch}></Switch> */}
          {/* <Text>Owner</Text> */}
        </View>
        <TextInput
          title="firstname"
          style={styles.input}
          onChangeText={onChangeFirstName}
          value={firstName}
          placeholder="First name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeLastName}
          value={lastName}
          placeholder="Last name"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePostcode}
          value={postcode}
          placeholder="Postcode"
        />
        {isOwner === "Walker" ? (
          <TextInput
            style={styles.input}
            onChangeText={onChangeBio}
            value={bio}
            placeholder="Bio"
            numberOfLines={5}
            multiline={true}
          />
        ) : null}
        <ImagePickerUtil
          setImage={setImage}
          image={image}
          style={styles.submitButton}
        />

        <Pressable
          style={
            !postcode || !lastName || !firstName || !image || !isOwner
              ? styles.disabledButton
              : styles.submitButton
          }
          onPress={handleButton}
          disabled={!postcode || !lastName || !firstName || !image || !isOwner}
        >
          <Text style={styles.submitButtonText}>Submit Profile</Text>
        </Pressable>
        {error ? <Text>Something went wrong...</Text> : null}
        {success && <Text>Profile successfully updated!</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D1C6AD",
    flexWrap: "wrap",
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 25,
    width: "80%",
  },
  submitButton: {
    width: "80%",
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#D1C6AD",
    textAlign: "center",
    padding: 10,
  },
  submitButtonText: {
    fontSize: 20,
  },
  disabledButton: {
    width: "80%",
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#1C7C54",
    textAlign: "center",
    padding: 10,
  },
  switch: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    marginBottom: 40,
  },
});

export default CreateProfile;
