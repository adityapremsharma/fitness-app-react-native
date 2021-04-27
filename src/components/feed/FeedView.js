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

export default function FeedView(props) {
  const {
    state: { currentUser, userPosts, userFollowing, usersData, usersLoaded, usersPosts },
  } = useContext(UserContext);

  const [user, setUser] = useState(null);
  const [userPostsDisplay, setUserPostsDisplay] = useState([]);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    
    
  }, []);

  

  return (
    <View style={{ flex: 1 }}>
      
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
