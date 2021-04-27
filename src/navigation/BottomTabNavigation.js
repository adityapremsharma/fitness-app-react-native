import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Live from "../screens/bottomTabNavigationScreens/Live";
import Feed from "../screens/bottomTabNavigationScreens/Feed";
import Profile from "../screens/bottomTabNavigationScreens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Blog from "../screens/bottomTabNavigationScreens/Blog";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: "#e91e63",
        keyboardHidesTabBar: true,
        // style: {
        //   height: 60,
        //   backgroundColor: "#29252b",
        //   borderTopWidth: 0,
        // },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={Live}
        options={{
          tabBarLabel: "Live",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="routes" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Blog"
        component={Blog}
        // listeners={({navigation}) => ({
        //     tabPress: event => {
        //         event.preventDefault()
        //         navigation.navigate("Add")
        //     }
        // })}
        options={{
          tabBarLabel: "Blog",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Name"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
