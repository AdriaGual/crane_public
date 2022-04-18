import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { screenOptions } from "../utils/ScreenOptions";
import MainScreen from "../views/MainScreen";
import ShareScreen from "../views/ShareScreen";
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator screenOptions={({ route }) => screenOptions(route)}>
      <Tab.Screen name="Inicio" component={MainScreen} />
      <Tab.Screen name="Compartir" component={ShareScreen} />
    </Tab.Navigator>
  );
}

export default Main;
