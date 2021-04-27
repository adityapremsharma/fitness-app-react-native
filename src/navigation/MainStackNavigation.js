import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigation from "./BottomTabNavigation";
import { Text, View } from "react-native";
import Capture from "../components/feed/Capture";
import Save from "../components/feed/Save";
import TrackUser from "../components/profile/TrackUser";
import UserProfile from "../components/profile/UserProfile";
import Search from "../components/feed/Search";
import BlogView from "../components/blog/BlogView";
import VideoView from "../components/blog/VideoView";

const Stack = createStackNavigator();

const MainStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigation">
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Capture"
          component={Capture}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Save"
          component={Save}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrackUser"
          component={TrackUser}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlogView"
          component={BlogView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoView"
          component={VideoView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigation;
