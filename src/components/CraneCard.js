import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  Center,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  ZStack,
} from "native-base";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { iconFromClassification } from "../constants/PlanOptions";
import { BrandMainColor, MainBlack, MainWhite } from "../constants/Styles";
import CardModal from "./CardModal";

function CraneCard(props) {
  const [showModal, setShowModal] = useState(false);
  const plans = useSelector((state) => state.plans);

  return (
    <>
      <Pressable
        style={styles.cardImg}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <ZStack style={styles.cardImg}>
          <HStack>
            <Spacer></Spacer>
            <Center
              bg={BrandMainColor}
              h={10}
              w={10}
              borderRadius="full"
              borderWidth={2}
              shadow={2}
              borderColor={MainWhite}
              m={4}
              blurRadius={90}
            >
              <VStack>
                <Spacer></Spacer>
                <Ionicons
                  name={iconFromClassification(props.plan.classification)}
                  size={16}
                  color={MainWhite}
                />
                <Spacer></Spacer>
              </VStack>
            </Center>
          </HStack>
          <Box
            bg="rgba(255,255,255,0.75)"
            h={24}
            w="full"
            borderBottomRadius={13}
            shadow={1}
            px={4}
            py={2}
            style={{
              position: "absolute",
              bottom: 0,
            }}
          >
            <Text fontWeight="bold" color={MainBlack} fontSize="xl" isTruncated>
              {props.plan.name}
            </Text>
            <HStack>
              <Text color={MainBlack}>
                {props.plan.city} {"· "}
                {props.plan.distance < 1000
                  ? Math.round(props.plan.distance, 0) + " m"
                  : Math.round(props.plan.distance / 1000, 0) + " km"}
              </Text>
              <Ionicons name="location" size={20} color={BrandMainColor} />
            </HStack>

            <Text color={MainBlack}>{props.plan.categories}</Text>
          </Box>
          <View style={styles.card}>
            {props.plan.photos != undefined ? (
              <Image
                style={styles.cardImg}
                source={{ uri: props.plan.photos[0] }}
              />
            ) : (
              <></>
            )}
          </View>
        </ZStack>
      </Pressable>
      <CardModal
        showModal={showModal}
        setShowModal={setShowModal}
        plan={props.plan}
      ></CardModal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
    backgroundColor: "grey",
    borderRadius: 13,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },
});

export default CraneCard;
