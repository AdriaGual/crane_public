import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Divider,
  HStack,
  Modal,
  Pressable,
  Text,
  useColorModeValue,
} from "native-base";
import { default as React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classificationFromFilter } from "../constants/PlanOptions";
import { MainBlack, MainWhite } from "../constants/Styles";
import { dislikedPlanReseted } from "../redux/plans/DislikedPlansSlice";
import { likedPlanReseted } from "../redux/plans/LikedPlansSlice";
import { planReseted } from "../redux/plans/PlansSlice";
import { fetchPlans } from "../routes/TomTomAPI";
import { ToggleDarkMode } from "./ToggleDarkMode";

export function MainOptionModal(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location);
  const likedPlans = useSelector((state) => state.likedPlans);
  const dislikedPlans = useSelector((state) => state.dislikedPlans);
  const swipedPlans = [...likedPlans, ...dislikedPlans];

  const navigation = useNavigation();

  const openModal = (placement) => {
    setOpen(true);
  };

  return (
    <>
      <Pressable
        accessibilityLabel="More options menu"
        onPress={() => openModal("top")}
      >
        <Ionicons
          name="ellipsis-horizontal"
          size={28}
          color={useColorModeValue(MainBlack, MainWhite)}
        />
      </Pressable>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <Modal.Content
          w="full"
          marginBottom={0}
          marginTop={"auto"}
          borderBottomRadius="0"
        >
          <Modal.Body>
            <Pressable
              accessibilityLabel="Cambiar localización"
              py={4}
              onPress={() => navigation.navigate("Map")}
            >
              <HStack space={4}>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={useColorModeValue(MainBlack, MainWhite)}
                />
                <Text fontWeight={"bold"}>Cambiar de localización</Text>
              </HStack>
            </Pressable>
            <Divider></Divider>
            <Pressable
              accessibilityLabel="More options menu"
              py={4}
              onPress={() => {
                dispatch(likedPlanReseted());
                dispatch(dislikedPlanReseted());
                dispatch(planReseted());
                fetchPlans(
                  0,
                  dispatch,
                  classificationFromFilter(props.status),
                  1,
                  swipedPlans,
                  location.longitude,
                  location.latitude,
                  1000
                );

                setOpen(false);
              }}
            >
              <HStack space={4}>
                <Ionicons
                  name="archive-outline"
                  size={24}
                  color={useColorModeValue(MainBlack, MainWhite)}
                />
                <Text fontWeight={"bold"}>Restablecer preferencias</Text>
              </HStack>
            </Pressable>
            <Divider></Divider>
            <ToggleDarkMode></ToggleDarkMode>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
