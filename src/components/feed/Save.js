import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from "react-native";
import firebase from "firebase";

require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props) {
  const [caption, setCaption] = useState("");
  const [transferred, setTransferred] = useState(true);

  const uploadImage = async () => {
    Keyboard.dismiss();
    setTransferred(false);
    const uri = props.route.params.image;
    const path = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(path).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(`transferred ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
        console.log(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTransferred(true);
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {!transferred ? (
        <View style={styles.uploading}>
          <ActivityIndicator size="large" color="#e91e63" />
          <Text style={{ color: "white" }}>Uploading Image...</Text>
        </View>
      ) : null}
      <Image source={{ uri: props.route.params.image }} style={{ flex: 1 }} />
      <View style={styles.input}>
        <TextInput
          style={styles.caption}
          placeholder="Caption..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={(caption) => setCaption(caption)}
        />
        <TouchableOpacity onPress={uploadImage} style={styles.send}>
          <Ionicons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: 120,
    bottom: 0,
    position: "absolute",
  },
  caption: {
    position: "absolute",
    bottom: 40,
    left: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#39FF14",
    color: "white",
    borderRadius: 5,
    height: 40,
    width: "75%",
    paddingHorizontal: 10,
  },

  send: {
    backgroundColor: "#39FF14",
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 40,
    right: 10,
  },
  uploading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
