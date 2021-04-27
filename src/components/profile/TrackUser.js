import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import ProfileCard from "./ProfileCard";

import { Context as UserInputContext } from "../../context/UserInputContext";

export default function TrackUser() {
  const {
    state: { height, weight, calories, water, bmi },
    setHeight,
    setWeight,
    setCalories,
    setWater,
    setBmi,
  } = useContext(UserInputContext);

  useEffect(() => {
    const calculateBmi =
      Number(weight.data) / ((Number(height.data) + Number(height.data)) / 100);
    const roundedBmi =
      calculateBmi > 0 ? Math.round(calculateBmi * 100) / 100 : 0;

    setBmi(roundedBmi);
  }, [height, weight]);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo-black.png")}
        />
        <ProfileCard
          placeholder="Calories"
          userData={calories}
          setUserData={setCalories}
          heading="Calories"
          incDecVal={100}
          unit="kcal"
          btnStatus={true}
          indicatorMinValue={2000}
          indicatorMaxValue={3000}
        />
        <ProfileCard
          placeholder="In Liters"
          userData={water}
          setUserData={setWater}
          heading="Water"
          incDecVal={1}
          unit="L"
          btnStatus={true}
          indicatorMinValue={2.5}
          indicatorMaxValue={6}
        />
        <ProfileCard
          placeholder="In cm"
          userData={height.data}
          setUserData={setHeight}
          heading="Height"
          toggle={height.toggle}
          unit="cm"
        />
        <ProfileCard
          placeholder="In kg"
          userData={weight.data}
          setUserData={setWeight}
          heading="Weight"
          toggle={weight.toggle}
          unit="kg"
        />
        <ProfileCard
          placeholder="BMI"
          userData={bmi}
          setUserData={setBmi}
          bmi={bmi}
          heading="BMI"
          toggle={false}
          bmiStatus={true}
          indicatorMinValue={18}
          indicatorMaxValue={32}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "10%",
    paddingTop: 100,
    paddingBottom: 20,
    backgroundColor: "black",
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 50,
  },
});
