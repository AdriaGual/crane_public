import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Pressable,
  useColorModeValue,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { MainBlack, MainWhite, SecondaryGray } from "../constants/Styles";
import { BrandMainColor, LightGray } from "./../constants/Styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { locationAdded } from "../redux/user/LocationSlice";
import { fetchPlans } from "../routes/TomTomAPI";
import { classificationFromFilter } from "../constants/PlanOptions";
import { useNavigation } from "@react-navigation/native";

function MapScreen() {
  const dispatch = useDispatch();
  const toast = useToast();
  const toastId = "id-toast";
  const location = useSelector((state) => state.location);
  const likedPlans = useSelector((state) => state.likedPlans);
  const dislikedPlans = useSelector((state) => state.dislikedPlans);
  const navigation = useNavigation();
  const swipedPlans = [...likedPlans, ...dislikedPlans];

  const [mapRegion, setmapRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });

  return (
    <Box bg={useColorModeValue(MainWhite, "coolGray.800")} flex={1}>
      <MapView
        style={styles.container}
        region={mapRegion}
        onPress={(e) => {
          setMarker(e.nativeEvent.coordinate);
          setmapRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
        showsMyLocationButton={true}
      >
        {marker && <MapView.Marker coordinate={marker} />}
        {marker && (
          <MapView.Circle
            center={marker}
            radius={1000}
            strokeWidth={2}
            strokeColor={BrandMainColor}
            fillColor="rgba(246, 96, 97, 0.2)"
          ></MapView.Circle>
        )}
      </MapView>
      <Pressable
        mx={6}
        accessibilityLabel="More options menu"
        onPress={() => navigation.navigate("Main", { screen: "Inicio" })}
        style={{
          position: "absolute",
          top: "8%",
          alignSelf: "flex-start",
        }}
      >
        <Ionicons name="chevron-back" size={32} color={MainBlack} />
      </Pressable>
      <Button
        variant="ghost"
        bg={MainWhite}
        borderRadius="lg"
        px={6}
        py={4}
        shadow={5}
        borderWidth={0}
        borderColor={SecondaryGray}
        _text={{
          fontWeight: "700",
          color: MainBlack,
        }}
        _pressed={{
          bg: LightGray,
          borderColor: BrandMainColor,
        }}
        style={{
          position: "absolute",
          top: "90%",
          alignSelf: "center",
        }}
        onPress={() => {
          if (mapRegion.latitude != location.latitude) {
            dispatch(
              locationAdded({
                latitude: mapRegion.latitude,
                longitude: mapRegion.longitude,
              })
            );
            fetchPlans(
              0,
              dispatch,
              classificationFromFilter("Todo"),
              1,
              swipedPlans,
              mapRegion.longitude,
              mapRegion.latitude,
              1000
            );

            if (!toast.isActive(toastId)) {
              toast.show({
                id: toastId,
                description: "Ubicación cambiada",
                placement: "top",
              });
            }
          }
        }}
      >
        Cambiar localización
      </Button>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MapScreen;
