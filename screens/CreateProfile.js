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
import geoFetch from "../utils/server";

const CreateProfile = () => {
  const { user, setUser, profile, setProfile } = useContext(
    AuthenticatedUserContext
  );
  const [isOwner, setIsOwner] = useState(true);
  const toggleSwitch = () => setIsOwner((previousState) => !previousState);
  const [firstName, onChangeFirstName] = useState();
  const [lastName, onChangeLastName] = useState();
  const [postcode, onChangePostcode] = useState();
  const [error, setError] = useState();
  const [image, setImage] = useState(null);
  const [bio, onChangeBio] = useState("");
  const [geoData, setGeoData] = useState({});

  let userType;

  console.log(geoData);

  async function handleButton() {
    await geoFetch()
      .then((res) => {
        console.log(res, "<<<< create profile");
        setGeoData(res);
      })
      .catch((e) => {
        console.log(e);
      });

    if (isOwner) {
      userType = "owners";
    } else {
      userType = "walkers";
    }

    async function uploadImage(image) {
      const storage = getStorage();
      const response = await fetch(image);
      const blob = await response.blob();
      var ref = pickref(storage, `users/${user.uid}/avatar`);
      uploadBytes(ref, blob).catch((e) => {
        throw e;
      });
    }

    uploadImage(image);

    set(ref(db, `users/${userType}/` + user.uid), {
      firstname: firstName,
      lastname: lastName,
      userType,
      postcode,
      bio,
      avatar: `users/${user.uid}/avatar`,
    })
      .then(() => {
        setProfile({
          firstname: firstName,
          lastname: lastName,
          userType,
          postcode,
          bio,
          avatar: `users/${user.uid}/avatar`,
        });
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>User Input</Text>

        <View>
          <Text>Walker</Text>
          <Switch value={isOwner} onValueChange={toggleSwitch}></Switch>
          <Text>Owner</Text>
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
        {!isOwner ? (
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
          style={styles.imagePicker}
        />

        <Pressable
          style={styles.imagePicker}
          onPress={handleButton}
          disabled={!postcode || !lastName || !firstName || !image}
        >
          <Text>Test</Text>
        </Pressable>
        {error ? <Text>Something went wrong...</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "red",
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
  imagePicker: {
    width: 200,
    margin: 10,
    backgroundColor: "purple",
    textAlign: "center",
  },
});

export default CreateProfile;
