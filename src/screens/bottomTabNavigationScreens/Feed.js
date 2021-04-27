import React, { useEffect, useContext } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Context as UserContext } from "../../context/UserContext";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

export default function Feed({ navigation }) {
  const {
    state: { currentUser, userFollowing, usersData, usersPosts, usersLoaded },
    state,
    fetchCurrentUser,
    fetchUserPosts,
    fetchUserFollowing,
    fetchUsersData,
    fetchUsersFollowingPosts,
  } = useContext(UserContext);

  useEffect(() => {
    fetchCurrentUser();
    fetchUserPosts();
    fetchUserFollowing();
  }, []);

  console.log(JSON.stringify(usersPosts, null, 4), "\n\n\n\n\n\n");

  if (currentUser === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TouchableOpacity
        style={styles.camera}
        onPress={() => navigation.navigate("Capture")}
      >
        <Entypo name="camera" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.search}
        onPress={() => navigation.navigate("Search")}
      >
        <AntDesign name="search1" size={24} color="black" />
      </TouchableOpacity>

      {/* <Search navigation={navigation} /> */}
      <Text>{currentUser.name} is logged in!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29252b",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  search: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});
