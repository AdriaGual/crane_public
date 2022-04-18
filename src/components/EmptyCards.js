import { Center, Heading, HStack, Spinner } from "native-base";
import React from "react";
import { BrandMainColor } from "./../constants/Styles";

function EmptyCards() {
  return (
    <Center flex={1}>
      <HStack space={2} justifyContent="center">
        <Spinner
          accessibilityLabel="Cargando planes 😊"
          color={BrandMainColor}
        />
        <Heading color={BrandMainColor} fontSize="md">
          Cargando planes 😊
        </Heading>
      </HStack>
    </Center>
  );
}

export default EmptyCards;
