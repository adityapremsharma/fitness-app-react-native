import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export default function IconCard({ name, icon, page }) {
  return (
    <View style={styles.card}>
      <AntDesign name={icon} size={20} color="white" />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: 75,
    borderRadius: 15,
    backgroundColor: "rgba(101, 101, 101, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    margin: 25,
  },
  text: {
    color: "#fff",
    marginTop: 5,
  },
});
