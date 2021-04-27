import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";

require("firebase/firestore");

export default function Search(props) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            id,
            ...data,
          };
        });
        setUsers(users);
      });
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Find user..."
        onChangeText={(search) => fetchUsers(search)}
      />

      <FlatList
        // style={users.length ? styles.listContainer : null}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.list}
            onPress={() =>
              props.navigation.navigate("UserProfile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 50,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  list: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
