import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Input,
  Modal,
  Pressable,
  Spacer,
  useColorModeValue,
  VStack,
} from "native-base";
import { default as React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LightGray, MainBlack, MainWhite } from "../constants/Styles";
import { BrandMainColor, SecondaryGray } from "./../constants/Styles";

export function OpenFriendLink(props) {
  const [open, setOpen] = useState(false);
  const [friendLink, setFriendLink] = useState("");
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  const openModal = (placement) => {
    setOpen(true);
  };

  useEffect(() => {
    setFriendLink("");
  }, []);

  return (
    <>
      <VStack>
        <Spacer></Spacer>
        <Pressable
          accessibilityLabel="More options menu"
          onPress={() => openModal("top")}
        >
          <Ionicons
            name="people"
            size={24}
            color={useColorModeValue(MainBlack, MainWhite)}
          />
        </Pressable>
        <Spacer></Spacer>
      </VStack>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setFriendLink("");
        }}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Buscar planes con amigos</Modal.Header>
          <Modal.Body>
            <Input
              placeholder="✉️ Código amigo"
              mb={4}
              onChangeText={(text) => setFriendLink(text)}
              value={friendLink}
            />
            <Button
              variant="ghost"
              bg={MainWhite}
              borderRadius="lg"
              py={3}
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
              onPress={() => {
                if (
                  friendLink !== "" &&
                  friendLink.startsWith("crane://") &&
                  friendLink.substring(8) !== user.id
                ) {
                  navigation.navigate("Matches", {
                    otherUserId: friendLink.substring(8),
                  });
                }
              }}
            >
              Buscar
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
