import React from "react";
import db from "../config/Database";
import { ref, set } from "firebase/database";
import { useContext, useState } from "react";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Switch,
} from "react-native";

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

  let userType;

  function handleButton() {
    if (isOwner) {
      userType = "owners";
    } else {
      userType = "walkers";
    }

    setProfile({
      firstname: firstName,
      lastname: lastName,
      isowner: isOwner,
      postcode,
      avatar,
    });
    set(ref(db, `users/${userType}/` + user.uid), {
      firstname: firstName,
      lastname: lastName,
      postcode,
      avatar,
    });
  }

  console.log(user.uid);

  return (
    <View>
      <Text>User Input</Text>
      <View style={styles.container}>
        <Text>Walker</Text>
        <Switch value={isOwner} onValueChange={toggleSwitch}></Switch>
        <Text>Owner</Text>
      </View>

      <TextInput
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
      <TextInput
        style={styles.input}
        onChangeText={onChangeAvatar}
        value={avatar}
        placeholder="Avatar"
      />

      <Button
        title="Press Me"
        onPress={handleButton}
        disabled={!avatar || !postcode || !lastName || !firstName}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    maxWidth: "50vw",
  },
});

export default CreateProfile;
