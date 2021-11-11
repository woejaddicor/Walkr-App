import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import db from "../config/Database";
import { ref, onValue, orderByChild, query, orderBy } from "firebase/database";
import { getStorage, getDownloadURL, ref as storeRef } from "firebase/storage";
import { useState, useEffect } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import createChatRoom from "../utils/createChatRoom";
import SelectDropdown from "react-native-select-dropdown";



const ListWalkers = ({ navigation }) => {
  const [walkers, setWalkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile, setChatRoom, setChatListView } = useContext(
    AuthenticatedUserContext
  );
  const [sortBy, setSortBy] = useState();

  const sortSelect = ["Hourly Rate", "User Rating"];

  useEffect(() => {
    const users = ref(db, "users/walkers/");
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      const result = Object.entries(data);

      const storage = getStorage();

      const getImages = result.map((user) => {
        const pathReference = storeRef(storage, `users/${user[0]}/avatar`);
        return getDownloadURL(storeRef(storage, pathReference)).then((url) => {
          user[1].httpUrl = url;
        });
      });

      return Promise.all(getImages).then(() => {
        setIsLoading(false);
        if (sortBy) {
          const sortedResult = result.sort((walkerA, walkerB) => {
            const nameA = walkerA[1][sortBy];
            const nameB = walkerB[1][sortBy];
            let comparison = 0;
            if (nameA > nameB) {
              comparison = 1;
            } else if (nameA < nameB) {
              comparison = -1;
            }
            return comparison;
          });
          setWalkers(sortedResult);
        } else {
          setWalkers(result);
        }
      });
    });
  }, [sortBy]);

  const handleChatButton = (walkername, walkerid) => {
    const res = createChatRoom(
      user.uid,
      walkerid,
      profile.firstname,
      walkername
    );
    setChatRoom([walkername, res]);
    setChatListView(false);
  };

  if (isLoading)
    return (
      <View>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../Images/walkr.png")} />
        <View style={styles.switch}>
          <SelectDropdown
            defaultButtonText={"Sort by"}
            data={sortSelect}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
            onSelect={(selectedItem, index) => {
              let firebaseitem = null;
              // console.log(selectedItem);
              if (selectedItem === "Hourly Rate") {
                firebaseitem = "hourlyRate";
              } else {
                firebaseitem = "bones";
              }
              // console.log(firebaseitem);
              setSortBy(firebaseitem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
        <Text style={styles.title}>All Walkers in your area</Text>
        <View>
          {walkers.map((walker) => {
            return (
              <Collapse style={styles.card}>
                <CollapseHeader>
                  <Image
                    style={{
                      marginRight: 'auto',
                      marginLeft: 'auto',
                      width: 155,
                      height: 155,
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                    source={{
                      uri: walker[1].httpUrl,
                    }}
                  />
                  <Text style={styles.name}>
                    {walker[1].firstname} {walker[1].lastname}
                  </Text>
                  <Text style={styles.postcode}>
                    {"🐾 ".repeat(walker[1].bones)}
                  </Text>
                  <Text style={styles.postcode}>
                    {" "}
                    £{walker[1].hourlyRate} / hour
                  </Text>
                  <Text style={styles.postcode}>
                    Post Code: {walker[1].postcode.toUpperCase()}
                  </Text>
                  <Button
                    accessibilityLabel="Show more"
                    mode="contained"
                    style={styles.moreButton}
                  >
                    Show More
                  </Button>
                </CollapseHeader>
                <CollapseBody>
                  <Text style={styles.postcode}>{walker[1].userType}</Text>
                  <Text style={styles.bio}>{walker[1].bio}</Text>
                  <Button
                    onPress={() => {
                      handleChatButton(walker[1].firstname, walker[1].userid);
                    }}
                    accessibilityLabel="Chat with this walker"
                    mode="contained"
                    icon="message"
                    color="#D1C6AD"
                    style={styles.button}
                  >
                    Chat now!
                  </Button>
                </CollapseBody>
              </Collapse>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ListWalkers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D1C6AD",
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 30,
    color: "#1C7C54",
    fontWeight: "500",
    textAlign: "center",
  },
  card: {
    borderColor: "#DAE7DD",
    borderStyle: "solid",
    alignItems: "center",
    backgroundColor: "#B2D2B6",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
    fontWeight: "bold",
    color: "#1C7C54",
  },
  postcode: {
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    color: "#1C7C54",
    fontWeight: "600",
    fontSize: 15,
  },
  bio: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 20,
    padding: 6,
    marginBottom: 8,
    width: 300,
    marginLeft: 19,
    borderColor: "#562526",
    borderWidth: 3,
    shadowOffset: {
      width: -3,
      height: 2,
    },
    backgroundColor: "#D49B9C",
  },
  moreButton: {
    borderColor: "#562526",
    borderWidth: 3,
    shadowOffset: {
      width: -3,
      height: 2,
    },
    backgroundColor: "#D49B9C",
  },
  logo: {
    height: 100,
    width: 250,
    alignItems: "center",
    marginLeft: "auto",
    marginTop: -20,
    marginRight: "auto",
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
  switch: {
    flex: 1,
    flexDirection: "row",
    height: 30,
    marginBottom: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
