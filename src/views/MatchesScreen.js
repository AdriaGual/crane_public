import {
  Box,
  useColorModeValue,
  Text,
  Heading,
  ScrollView,
  Flex,
  Center,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { MainWhite } from "../constants/Styles";
import { useSelector } from "react-redux";
import ListCard from "./../components/ListCard";
import { reverseArr } from "../utils/GeneralUtils";
import firebase from "../routes/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { MainBlack } from "../constants/Styles";
import { useNavigation } from "@react-navigation/native";

function MatchesScreen(route) {
  const likedPlans = useSelector((state) => state.likedPlans);
  const [commonPlans, setCommonPlans] = useState([]);
  const otherUserId = route.route.params.otherUserId;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      {
        let otherUsersInfo = await firebase.db.collection("users").get();
        let info = otherUsersInfo.docs;
        let otherUserPlans = [];
        for (let key in info) {
          if (info[key].id == otherUserId) {
            otherUserPlans = info[key].data().plans;
          }
        }

        let matchPlans = [];
        for (let key in likedPlans) {
          if (otherUserPlans.indexOf(likedPlans[key].id) > -1) {
            matchPlans.push(likedPlans[key]);
          }
        }
        if (matchPlans != undefined) {
          setCommonPlans(matchPlans);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      bg={useColorModeValue(MainWhite, "coolGray.800")}
      flex={1}
      safeAreaX={6}
      safeAreaTop={16}
    >
      <Flex direction="row" alignItems="center" mb={2}>
        <Pressable
          mr={6}
          accessibilityLabel="Back button"
          onPress={() => navigation.navigate("Main", { screen: "Inicio" })}
        >
          <Ionicons
            name="chevron-back"
            size={32}
            color={useColorModeValue(MainBlack, MainWhite)}
          />
        </Pressable>
        <Heading size="md">Planes en común 🤗</Heading>
      </Flex>

      {commonPlans.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {reverseArr(commonPlans).map((commonPlan) => {
            return <ListCard plan={commonPlan} key={commonPlan.id}></ListCard>;
          })}
        </ScrollView>
      ) : (
        <Text>Parece que no tenéis planes en común</Text>
      )}
    </Box>
  );
}

export default MatchesScreen;
