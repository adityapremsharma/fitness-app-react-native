import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

import * as firebase from "firebase";
const firebaseConfig = {};

import { Provider as FitnessProvider } from "./src/context/FitnessContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as UserInputProvider } from "./src/context/UserInputContext";

import AuthenticationStackNavigation from "./src/navigation/AuthenticationStackNavigation";
import MainStackNavigation from "./src/navigation/MainStackNavigation";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  if (!loggedIn) {
    return <AuthenticationStackNavigation />;
  }

  return <MainStackNavigation />;
};

export default () => {
  return (
    <FitnessProvider>
      <UserProvider>
        <UserInputProvider>
          <App />
        </UserInputProvider>
      </UserProvider>
    </FitnessProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#29252b",
    alignItems: "center",
    justifyContent: "center",
  },
});
