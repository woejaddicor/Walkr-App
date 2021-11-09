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
  Image,
} from "react-native";
import ImagePickerUtil from "../utils/ImagePicker";
import { getStorage, uploadBytes, ref as pickref } from "@firebase/storage";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView } from "react-native-gesture-handler";

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
      <ScrollView>
      <View style={styles.container}>
      <Image style={styles.logo} source={require('../Images/walkr.png')}/>
        <Text style={styles.title}>Create your profile!</Text>

        <View style={styles.switch}>
          <SelectDropdown
            data={userSelect}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
            onSelect={(selectedItem, index) => {
              setIsOwner(selectedItem)
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
          title="firstname"
          style={styles.inputTop}
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
            style={styles.bioInput}
            onChangeText={onChangeBio}
            value={bio}
            placeholder="Bio"
            numberOfLines={20}
            multiline={true}
          />
        ) : null}
        <ImagePickerUtil style={image}
          setImage={setImage}
          image={image}
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
      </ScrollView>
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
  inputTop: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 0,
    margin: 10,
    borderRadius: 5,
    borderColor: '#b2d2b6',
    borderWidth: 2,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    marginTop: 0,
    borderColor: '#b2d2b6',
    borderWidth: 2,
    width: "80%",
  },
  bioInput: {
    minHeight: 150,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    borderColor: '#b2d2b6',
    borderWidth: 2,
    width: "80%", 
  },
  submitButton: {
    width: "20%",
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
    backgroundColor: "#1c7c54",
    textAlign: "center",
    padding: 10,
  },
  switch: {
    flex: 1,
    flexDirection: "row",
    height: 30,
    marginBottom: 40,
  },
  logo: {
    height: 200,
    width: 360,
    alignItems: "center",
    marginTop: -10,
    marginBottom: -20
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C7C54",
    alignSelf: "center",
    marginTop: -15,
    paddingBottom: 20,
  },
  dropdown: {
    borderRadius: 5,
    backgroundColor: '#b2d2b6',
    height: 40,
    width: 175
  },
  dropdownText: {
    color: '#1C7C54',
  },
  image: {
    borderRadius: 5
  }
});

export default CreateProfile;
