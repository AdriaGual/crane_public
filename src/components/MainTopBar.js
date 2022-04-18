import { Flex, Heading, HStack, Spacer } from "native-base";
import { default as React } from "react";
import { MainOptionModal } from "./MainOptionModal";
import { OpenFriendLink } from "./OpenFriendLink";

export function MainTopBar(props) {
  return (
    <Flex direction="row" alignItems="center" safeAreaX={6} safeAreaTop={16}>
      <Heading size="lg">Explorar</Heading>
      <Spacer></Spacer>
      <HStack space={4}>
        <OpenFriendLink></OpenFriendLink>
        <MainOptionModal status={props.status}></MainOptionModal>
      </HStack>
    </Flex>
  );
}
