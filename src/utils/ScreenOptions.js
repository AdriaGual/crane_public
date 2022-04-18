import { Ionicons } from "@expo/vector-icons";
import { useColorModeValue } from "native-base";
import React from "react";
import { BrandMainColor, MainGray, MainWhite } from "../constants/Styles";
import { SecondaryGray } from "./../constants/Styles";

export function screenOptions(route) {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Inicio") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Compartir") {
        iconName = focused ? "share-social" : "share-social-outline";
      } else if (route.name === "Perfil") {
        iconName = focused ? "person" : "person-outline";
      }

      return <Ionicons name={iconName} size={20} color={color} />;
    },
    tabBarActiveTintColor: BrandMainColor,
    tabBarInactiveTintColor: useColorModeValue(MainGray, MainWhite),
    tabBarActiveBackgroundColor: useColorModeValue(MainWhite, SecondaryGray),
    tabBarInactiveBackgroundColor: useColorModeValue(MainWhite, SecondaryGray),
    headerShown: false,
    tabBarStyle: {
      paddingTop: 10,
      paddingBottom: 4,
      backgroundColor: useColorModeValue(MainWhite, SecondaryGray),
    },
  };
}
