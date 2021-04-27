import React, { useContext } from "react";
import firebase from "firebase";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import IconCard from "../../components/profile/IconCard";

export default function Profile({ navigation }) {
  const icon = [
    {
      name: "Track",
      icon: "forward",
      page: "TrackUser",
      data: "",
    },
    {
      name: "Profile",
      icon: "profile",
      page: "UserProfile",
      data: firebase.auth().currentUser.uid,
    },
    {
      name: "Track",
      icon: "",
      page: "",
      data: "",
    },
    {
      name: "Track",
      icon: "",
      page: "",
      data: "",
    },
  ];
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo-black.png")}
      />
      <View style={styles.iconContainer}>
        <FlatList
          data={icon}
          renderItem={({ item }) => {
            return (
              <View key={item.name}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(item.page, { uid: item.data })
                  }
                >
                  <IconCard name={item.name} icon={item.icon} />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingHorizontal: "10%",
    paddingTop: 100,
    backgroundColor: "black",
    paddingBottom: 20,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 50,
  },
  iconContainer: {
    padding: 20,
  },
});
