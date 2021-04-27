import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

export default function ProfileCard({
  heading,
  placeholder,
  setUserData,
  userData,
  toggle,
  unit,
  bmiStatus,
  bmi,
  btnStatus,
  incDecVal,
  indicatorMinValue,
  indicatorMaxValue,
}) {
  const [text, setText] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");

  useEffect(() => {
    if (bmi > 0 && bmi < 18.5) {
      setBmiCategory("Under");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setBmiCategory("Normal");
    } else if (bmi >= 24.9 && bmi < 29.9) {
      setBmiCategory("Over");
    } else if (bmi >= 29.9 && bmi < 100) {
      setBmiCategory("Obese");
    } else {
      setBmiCategory("NA");
    }
  }, [bmi]);

  return (
    <View style={styles.card}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{heading}</Text>

        {indicatorMinValue ? (
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  userData < indicatorMinValue || userData > indicatorMaxValue
                    ? "#e91e63"
                    : "#39FF14",
              },
            ]}
          ></View>
        ) : null}
      </View>

      {toggle ? (
        <View style={styles.details}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={(text) => setText(text)}
          />
          <TouchableOpacity
            onPress={() => {
              text >= 0
                ? setUserData(text, !toggle)
                : setUserData(userData, !toggle);
              setText(0);
            }}
          >
            <Text
              style={[
                styles.button,
                { color: text < 0 ? "#e91e63" : "#39FF14" },
              ]}
            >
              {text < 0 ? "Cancel" : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.details}>
          <Text style={styles.data}>
            {userData} <Text style={styles.unit}>{unit}</Text>
          </Text>
          {!btnStatus ? (
            !bmiStatus ? (
              <TouchableOpacity onPress={() => setUserData(userData, !toggle)}>
                <Text style={[styles.button, { color: "#39FF14" }]}>
                  Change
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.data}>{bmiCategory}</Text>
            )
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() =>
                  userData > 0 ? setUserData(userData - incDecVal) : null
                }
                style={styles.incDecButton}
              >
                <Text style={{ color: "#777", fontSize: 25 }}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUserData(userData + incDecVal)}
                style={styles.incDecButton}
              >
                <Text style={{ color: "#777", fontSize: 25 }}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
    backgroundColor: "rgba(101, 101, 101, 0.2)",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  indicator: { height: 10, width: 10, borderRadius: 50 },
  heading: {
    color: "#777",
    fontSize: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 40,
    width: 100,
    paddingHorizontal: 10,
  },
  details: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  data: {
    color: "#777",
    fontSize: 30,
  },
  unit: {
    fontSize: 20,
  },
  button: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  incDecButton: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
