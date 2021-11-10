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
  Image,
} from "react-native";
import ImagePickerUtil from "../utils/ImagePicker";
import { getStorage, uploadBytes, ref as pickref } from "@firebase/storage";
import SelectDropdown from "react-native-select-dropdown";
import { ScrollView } from "react-native-gesture-handler";

import geoFetch from "../utils/server";

const CreateProfile = () => {
  const { user, setProfile } = useContext(AuthenticatedUserContext);
  const [isOwner, setIsOwner] = useState(null);
  const [firstName, onChangeFirstName] = useState();
  const [lastName, onChangeLastName] = useState();
  const [postcode, onChangePostcode] = useState();
  const [error, setError] = useState();
  const [image, setImage] = useState(null);
  const [bio, onChangeBio] = useState("");
  const [success, setSuccess] = useState(false);
  const [hourlyRate, setHourlyRate] = useState();

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
          userid: user.uid,
          hourlyRate,
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
          hourlyRate,
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
        setHourlyRate("");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const userSelect = ["Walker", "Owner"];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../Images/walkr.png")} />
        <Text style={styles.title}>Create your profile!</Text>

        <View style={styles.switch}>
          <SelectDropdown
            data={userSelect}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
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
          <>
            <TextInput
              style={styles.bioInput}
              onChangeText={onChangeBio}
              value={bio}
              placeholder="Bio"
              numberOfLines={10}
              multiline={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={setHourlyRate}
              value={hourlyRate}
              placeholder="Hourly rate"
            />
          </>
        ) : null}
        <ImagePickerUtil setImage={setImage} image={image} />

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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#D1C6AD",
    width: "100%",
    paddingBottom: 200,
  },
  inputTop: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 0,
    margin: 10,
    borderRadius: 10,
    borderColor: "#b2d2b6",
    borderWidth: 2,
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginTop: 0,
    borderColor: "#b2d2b6",
    borderWidth: 2,
    width: "80%",
  },
  bioInput: {
    minHeight: 150,
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    borderColor: "#b2d2b6",
    borderWidth: 2,
    width: "80%",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "400",
    fontSize: 20,
  },
  disabledButton: {
    width: 150,
    margin: 10,
    borderRadius: 10,
    borderColor: "#b2d2b6",
    borderWidth: 3,
    backgroundColor: "#1c7c54",
    textAlign: "center",
    padding: 10,
    marginTop: 5
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
    marginRight: 'auto',
    marginLeft: 'auto',
    alignItems: "center",
    marginTop: -10,
    marginBottom: -20,
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
    backgroundColor: "#b2d2b6",
    height: 40,
    width: 200,
    borderColor: "#1C7C54",
    borderWidth: 2,
  },
  dropdownText: {
    color: "#1C7C54",
    fontWeight: "700",
  },
  imageSelectButton: {
    backgroundColor: "red",
  },
});

export default CreateProfile;
