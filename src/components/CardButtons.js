import {
  Button,
  Center,
  HStack,
  Spacer,
  Text,
  useColorModeValue,
} from "native-base";
import React from "react";
import { MainWhite, SecondaryGray } from "../constants/Styles";
import { BrandMainColor } from "./../constants/Styles";

function CardButtons(props) {
  const roundedButtonSize = 16;

  return (
    <Center mb={4}>
      <HStack pt={4} px={8}>
        <Center>
          <Button
            onPress={() => {
              if (props.swiper.current) {
                props.swiper.current.swipeLeft();
              }
              props.setRepeatedPlan(false);
            }}
            _pressed={{
              backgroundColor: BrandMainColor,
            }}
            backgroundColor={useColorModeValue(MainWhite, SecondaryGray)}
            shadow="5"
            borderRadius="full"
            size={roundedButtonSize}
            isDisabled={props.buttonsDisabled}
          >
            <Text role="img" aria-label="Expressionless Face" fontSize="xl">
              😑
            </Text>
          </Button>
          <Text fontWeight="bold" pt={2}>
            Meh...
          </Text>
        </Center>
        <Spacer></Spacer>
        <Center>
          <Button
            borderRadius="full"
            backgroundColor={useColorModeValue(MainWhite, SecondaryGray)}
            shadow="5"
            _pressed={{
              backgroundColor: BrandMainColor,
            }}
            size={roundedButtonSize}
            onPress={() => {
              if (props.swiper.current) {
                props.swiper.current.swipeRight();
              }
              props.setRepeatedPlan(false);
              props.setLikedEmoji("🥰");
            }}
            isDisabled={props.buttonsDisabled}
          >
            <Text
              role="img"
              aria-label="Smiling Face with Hearts"
              fontSize="xl"
            >
              🥰
            </Text>
          </Button>
          <Text pt={2} fontWeight="bold">
            Yay!
          </Text>
        </Center>
      </HStack>
      <HStack mt={-16}>
        <Spacer></Spacer>
        <Center>
          <Button
            borderRadius="full"
            backgroundColor={useColorModeValue(MainWhite, SecondaryGray)}
            _pressed={{
              backgroundColor: BrandMainColor,
            }}
            shadow="5"
            size={roundedButtonSize}
            onPress={() => {
              if (props.swiper.current) {
                props.swiper.current.swipeRight();
              }
              props.setRepeatedPlan(true);
              props.setLikedEmoji("👀");
            }}
            isDisabled={props.buttonsDisabled}
          >
            <Text role="img" aria-label="Eyes" fontSize="xl">
              👀
            </Text>
          </Button>
          <Text fontWeight="bold" pt={2}>
            ¿Repetimos?
          </Text>
        </Center>

        <Spacer></Spacer>
      </HStack>
    </Center>
  );
}

export default CardButtons;
