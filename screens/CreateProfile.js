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
  SafeAreaView
} from "react-native";
import ImagePickerUtil from "../utils/ImagePicker";
import {
  getStorage,
  uploadBytes,
  ref as pickref,
  getDownloadURL,
  put,
  uploadBytesResumable,
} from "@firebase/storage";
// import Firebase from "../config/Firebase";

// import storage from "@react-native-firebase/storage";

function writeUserData(userId, name, email, imageUrl) {
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

const CreateProfile = () => {
  const { user, setUser, profile, setProfile } = useContext(
    AuthenticatedUserContext
  );
  const [isOwner, setIsOwner] = useState(true);
  const toggleSwitch = () => setIsOwner((previousState) => !previousState);
  const [firstName, onChangeFirstName] = useState();
  const [lastName, onChangeLastName] = useState();
  const [postcode, onChangePostcode] = useState();
  const [avatar, onChangeAvatar] = useState();
  const [error, setError] = useState();
  const [image, setImage] = useState(null);
  const [bio, onChangeBio] = useState()

  let userType;

  function handleButton() {
    console.log(image);
    if (isOwner) {
      userType = "owners";
    } else {
      userType = "walkers";
    }

    async function uploadImage(image) {
      const storage = getStorage();
      const response = await fetch(image);
      const blob = await response.blob();
      console.log(blob, "<<<< Blob");
      var ref = pickref(storage, "upload");
      uploadBytes(ref, blob)
        .then(() => {
          console.log("Successful upload");
        })
        .catch((e) => {
          console.log(e);
        });
    }

    uploadImage(image);

    set(ref(db, `users/${userType}/` + user.uid), {
      firstname: firstName,
      lastname: lastName,
      userType,
      postcode,
      avatar: image,
    })
      .then(() => {
        setProfile({
          firstname: firstName,
          lastname: lastName,
          userType,
          postcode,
          avatar: image,
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
        {!isOwner ?
        <TextInput
        style={styles.input}
          onChangeText={onChangeBio}
          value={bio}
          placeholder="Bio"
          numberOfLines={5}
          multiline={true}
          /> : null
        }
        <ImagePickerUtil
          setImage={setImage}
          image={image}
          style={styles.imagePicker}
        />

        <Pressable
          style={styles.imagePicker}
          onPress={handleButton}
          disabled={!postcode || !lastName || !firstName || !image}
        ></Pressable>
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
    width: "100%"
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 25,
    width: "80%"
  },
  imagePicker: {
    width: 200,
    margin: 10,
    backgroundColor: 'purple',
    textAlign: "center"
  },
});

export default CreateProfile;
