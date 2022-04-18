import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { createURL } from "expo-linking";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { Text } from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Main from "./src/components/Main";
import { BrandMainColor } from "./src/constants/Styles";
import { locationAdded } from "./src/redux/user/LocationSlice";
import { loadUserId } from "./src/utils/UserId";
import MapScreen from "./src/views/MapScreen";
import MatchesScreen from "./src/views/MatchesScreen";

const Stack = createNativeStackNavigator();
const prefix = createURL("/");

const config = {
  screens: {
    Main: "",
    Matches: ":otherUserId",
  },
};

const linking = {
  prefixes: [prefix, "crane://"],
  config,
};

function Navigation() {
  const [isChecking, setIsChecking] = useState(true);
  const dispatch = useDispatch();

  const asyncDoThings = async () => {
    loadUserId(dispatch);
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let obtainedLocation = await getCurrentPositionAsync({});
      dispatch(
        locationAdded({
          latitude: obtainedLocation.coords.latitude,
          longitude: obtainedLocation.coords.longitude,
        })
      );
    })();
  };

  if (isChecking) {
    return (
      <AppLoading
        startAsync={() => asyncDoThings()}
        onFinish={() => setIsChecking(false)}
        onError={console.warn}
      />
    );
  }
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        screenOptions={({ route }) => ({
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
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: 4,
          },
        })}
      >
        <Stack.Screen name="Main" component={Main}></Stack.Screen>
        <Stack.Screen name="Matches" component={MatchesScreen}></Stack.Screen>
        <Stack.Screen name="Map" component={MapScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
