import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import * as firebase from "firebase";

export default function SignUp({ navigation }) {
  const [inputUserData, setInputUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUp = () => {
    Keyboard.dismiss();
    const { name, email, password } = inputUserData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View
        style={{
          flex: 1,
          paddingVertical: "40%",
          paddingHorizontal: "20%",
          backgroundColor: "black",
        }}
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo-black.png")}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your Name"
          onChangeText={(name) =>
            setInputUserData({ ...inputUserData, name: name.trim() })
          }
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="E-mail"
          onChangeText={(email) =>
            setInputUserData({ ...inputUserData, email: email.trim() })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) =>
            setInputUserData({ ...inputUserData, password: password.trim() })
          }
        />
        <TouchableOpacity style={styles.button} onPress={() => onSignUp()}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => null}><Text>{!signUp ? "Don't have an account? Create Here" : "Go back to Log In page"}</Text></TouchableOpacity> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginVertical: 20,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    borderColor: "white",
    borderWidth: 1.5,
    marginVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 40,
    marginHorizontal: "30%",
    borderRadius: 50,
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
