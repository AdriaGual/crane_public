import { Ionicons } from "@expo/vector-icons";
import { createURL } from "expo-linking";
import {
  Center,
  HStack,
  Pressable,
  Text,
  useClipboard,
  useColorModeValue,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LightGray, MainWhite, SecondaryGray } from "../constants/Styles";

function ShareButton() {
  const [link, setLink] = useState("");
  const toast = useToast();
  const toastId = "id-toast";
  const { value, onCopy } = useClipboard();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setLink(createURL(user.id));
  }, []);

  return (
    <Pressable
      onPress={() => {
        onCopy(link);
        if (!toast.isActive(toastId)) {
          toast.show({
            id: toastId,
            description:
              "Código amigo copiado, compártelo para ver los planes en común con tus amigos",
            placement: "top",
          });
        }
      }}
    >
      <Center
        my={4}
        h={12}
        bg={useColorModeValue("#ffffff", SecondaryGray)}
        borderWidth={2}
        borderRadius="xl"
        px={6}
        borderColor={LightGray}
      >
        <HStack>
          <Text
            fontWeight="bold"
            color={useColorModeValue(SecondaryGray, MainWhite)}
            isTruncated
          >
            {link}
          </Text>
          <Ionicons
            name="copy-outline"
            size={24}
            color={useColorModeValue(SecondaryGray, MainWhite)}
          />
        </HStack>
      </Center>
    </Pressable>
  );
}

export default ShareButton;
