import {
  Box,
  HStack,
  Image,
  Pressable,
  Spacer,
  Text,
  useColorModeValue,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { MainBlack, MainWhite } from "../constants/Styles";
import { SecondaryGray } from "./../constants/Styles";
import CardModal from "./CardModal";

function ListCard(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <View key={props.plan.id} mb={2} mx={1} mt={1}>
      <Pressable
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Box
          h={32}
          w="full"
          bg={useColorModeValue("#ffffff", SecondaryGray)}
          borderRadius="xl"
          shadow={2}
        >
          <HStack m={4} space={4}>
            {props.plan.photos != undefined ? (
              <Image
                h={24}
                w={24}
                source={{
                  uri: props.plan.photos[0],
                }}
                alt="cc"
                borderRadius={4}
              />
            ) : (
              <></>
            )}
            <VStack>
              <Text fontWeight="bold" isTruncated w={48}>
                {props.plan.name}
              </Text>
              <Text color={useColorModeValue(MainBlack, MainWhite)}>
                {props.plan.city} {"· "}
                {props.plan.distance < 1000
                  ? Math.round(props.plan.distance, 0) + " m"
                  : Math.round(props.plan.distance / 1000, 0) + " km"}
              </Text>
              {props.plan.phone != "undefined" ? (
                <Text color="green.600">{props.plan.phone}</Text>
              ) : (
                <></>
              )}
              {props.plan.url != "undefined" ? (
                <Text color="blue.400">{props.plan.url}</Text>
              ) : (
                <></>
              )}
            </VStack>
            <Spacer></Spacer>
          </HStack>
        </Box>
      </Pressable>
      <CardModal
        showModal={showModal}
        setShowModal={setShowModal}
        plan={props.plan}
      ></CardModal>
    </View>
  );
}

export default ListCard;
