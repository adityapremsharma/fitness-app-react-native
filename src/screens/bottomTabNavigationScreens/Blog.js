import React, { useState, useEffect } from "react";
import { blog, video, audio } from "../../components/blog/blogData";

import {
  View,
  TextInput,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import ListView from "../../components/blog/ListView";

export default function Blog({ navigation }) {
  const [search, setSearch] = useState("");

  return (
    <ScrollView
      style={styles.background}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={true}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
        />

        <ListView
          keyboardShouldPersistTaps="always"
          nestedScrollEnabled={true}
          search={search}
          heading="Blogs"
          data={blog}
          navigation={navigation}
        />
        <ListView
          search={search}
          heading="Videos"
          data={video}
          navigation={navigation}
        />
        <ListView
          search={search}
          heading="Audios"
          data={audio}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 25 : 25,
    // backgroundColor: "black",
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 50,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 25,
  },
  logo: {
    width: 75,
    height: 75,
    marginTop: 100,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 50,
  },
});
