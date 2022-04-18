import { Box, useColorModeValue } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import ListCards from "../components/ListCards";
import MatchesTopBar from "../components/MatchesTopBar";
import ShareButton from "../components/ShareButton";
import { MainWhite } from "../constants/Styles";
function ShareScreen() {
  const likedPlans = useSelector((state) => state.likedPlans);

  return (
    <Box
      bg={useColorModeValue(MainWhite, "coolGray.800")}
      flex={1}
      safeAreaX={6}
      safeAreaTop={16}
    >
      <MatchesTopBar></MatchesTopBar>
      <ShareButton></ShareButton>

      <ListCards
        plans={likedPlans}
        title="Planes que me gustaría hacer"
      ></ListCards>
    </Box>
  );
}

export default ShareScreen;
