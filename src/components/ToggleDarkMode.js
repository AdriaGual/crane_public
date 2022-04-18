import { Feather } from "@expo/vector-icons";
import { HStack, Switch, useColorMode, useColorModeValue } from "native-base";
import { default as React } from "react";
import {
  BrandMainColor,
  LightGray,
  MainBlack,
  MainWhite,
} from "../constants/Styles";

export function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center" py={2}>
      <Feather
        name="moon"
        size={24}
        color={useColorModeValue(MainBlack, MainWhite)}
      />
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        onThumbColor={useColorModeValue(BrandMainColor, MainWhite)}
        onTrackColor={useColorModeValue(LightGray, MainWhite)}
      />
      <Feather
        name="sun"
        size={24}
        color={useColorModeValue(MainBlack, MainWhite)}
      />
    </HStack>
  );
}
