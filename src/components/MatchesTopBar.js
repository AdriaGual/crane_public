import { Flex, Heading, Spacer } from "native-base";
import React from "react";

function MatchesTopBar() {
  return (
    <Flex direction="row" alignItems="center">
      <Heading size="lg">Compartir planes</Heading>
      <Spacer></Spacer>
    </Flex>
  );
}

export default MatchesTopBar;
