import React, { useState, useEffect, useContext } from "react";
import { Image } from "react-native";
import {
  View,
  Text,
  Immage,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");

import { Context as UserContext } from "../../context/UserContext";

export default function UserProfile(props) {
  const {
    state: { currentUser, userPosts, userFollowing },
  } = useContext(UserContext);

  const [user, setUser] = useState(null);
  const [userPostsDisplay, setUserPostsDisplay] = useState([]);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPostsDisplay(userPosts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("Does not exist!");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {
              id,
              ...data,
            };
          });

          setUserPostsDisplay(posts);
        });
    }

    if (userFollowing.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, userFollowing]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  if (user === null) {
    return <View></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileContainer}>
        <Text style={styles.profile}>{user.name}</Text>
        <Text style={styles.profile}>{user.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          following ? (
            <TouchableOpacity
              style={[styles.button, { borderColor: "#e91e63" }]}
              onPress={() => onUnfollow()}
            >
              <Text style={{ color: "white" }}>Following</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { borderColor: "#39FF14" }]}
              onPress={() => onFollow()}
            >
              <Text style={{ color: "white" }}>Follow</Text>
            </TouchableOpacity>
          )
        ) : null}
      </View>
      <View style={styles.imgContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPostsDisplay}
          renderItem={({ item }) => (
            <View style={{ flex: 1 / 3 }}>
              <Image style={styles.img} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    color: "white",
    marginVertical: 5,
  },
  imgContainer: {
    flex: 1,
  },
  img: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  button: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 20,
  },
});
