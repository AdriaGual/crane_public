import { Box, useColorModeValue } from "native-base";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSwiper from "../components/CardSwiper";
import { MainFilters } from "../components/MainFilters";
import { MainTopBar } from "../components/MainTopBar";
import { MainWhite } from "../constants/Styles";

function MainScreen() {
  const [status, setStatus] = useState("Todo");
  const [reloadedCards, setReloadedCards] = useState(0);
  const [linkParam, setLinkParam] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setStatusFilter = (status) => {
    setStatus(status);
  };

  return (
    <Box bg={useColorModeValue(MainWhite, "coolGray.800")} flex={1}>
      <MainTopBar status={status}></MainTopBar>
      <MainFilters
        status={status}
        setStatus={setStatus}
        setStatusFilter={setStatusFilter}
        reloadedCards={reloadedCards}
        setReloadedCards={setReloadedCards}
      ></MainFilters>
      <CardSwiper
        status={status}
        reloadedCards={reloadedCards}
        setReloadedCards={setReloadedCards}
      ></CardSwiper>
    </Box>
  );
}

export default MainScreen;
