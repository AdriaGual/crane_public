import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { Box, Text } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import CardsSwipe from "react-native-cards-swipe";
import { useDispatch, useSelector } from "react-redux";
import { classificationFromFilter } from "../constants/PlanOptions";
import { dislikedPlanAdded } from "../redux/plans/DislikedPlansSlice";
import { likedPlanAdded } from "../redux/plans/LikedPlansSlice";
import { planDeleted } from "../redux/plans/PlansSlice";
import firebase from "../routes/FirebaseConfig";
import { fetchPlans } from "../routes/TomTomAPI";
import { sleep } from "../utils/GeneralUtils";
import CardButtons from "./CardButtons";
import CraneCard from "./CraneCard";
import EmptyCards from "./EmptyCards";

export default function CardSwiper(props) {
  const dispatch = useDispatch();
  const swiper = useRef(null);
  const [repeatedPlan, setRepeatedPlan] = useState(false);
  const [likedEmoji, setLikedEmoji] = useState("🥰");
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const user = useSelector((state) => state.user);
  const plans = useSelector((state) => state.plans);
  const location = useSelector((state) => state.location);
  const likedPlans = useSelector((state) => state.likedPlans);
  const dislikedPlans = useSelector((state) => state.dislikedPlans);

  const swipedPlans = [...likedPlans, ...dislikedPlans];

  function refreshPlans() {
    for (let key in plans) {
      dispatch(planDeleted({ id: plans[key].id }));
    }

    props.setReloadedCards(props.reloadedCards + 1);
    fetchPlans(
      0,
      dispatch,
      classificationFromFilter(props.status),
      props.reloadedCards + 1,
      swipedPlans,
      location.longitude,
      location.latitude,
      1000
    );
  }

  function addLikedPlan(index) {
    setButtonsDisabled(true);
    let likedPlan = plans[index];
    likedPlan.repeatedPlan = repeatedPlan;
    let planAlreadyInLikedPlans = false;
    for (let key in likedPlans) {
      if (likedPlans[key].id == likedPlan.id) {
        planAlreadyInLikedPlans = true;
      }
    }
    if (!planAlreadyInLikedPlans) {
      dispatch(likedPlanAdded(likedPlan));
      let dbPlans = [];
      for (let dbPlan in likedPlans) {
        dbPlans.push(likedPlans[dbPlan].id);
      }
      dbPlans.push(likedPlan.id);
      firebase.db.collection("users").doc(user.id).set({ plans: dbPlans });
    }
    sleep(200).then(() => setButtonsDisabled(false));
  }

  function addDislikedPlan(index) {
    setButtonsDisabled(true);
    let dislikedPlan = plans[index];
    dislikedPlan.repeatedPlan = repeatedPlan;
    let planAlreadyInDislikedPlans = false;
    for (let key in dislikedPlans) {
      if (dislikedPlans[key].id == dislikedPlan.id) {
        planAlreadyInDislikedPlans = true;
      }
    }
    if (!planAlreadyInDislikedPlans) {
      dispatch(dislikedPlanAdded(dislikedPlan));
    }

    sleep(200).then(() => setButtonsDisabled(false));
  }

  useEffect(() => {
    if (location.latitude != undefined) {
      fetchPlans(
        0,
        dispatch,
        classificationFromFilter(props.status),
        props.reloadedCards,
        swipedPlans,
        location.longitude,
        location.latitude,
        5000
      );
    } else {
      (async () => {
        let { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let obtainedLocation = await getCurrentPositionAsync({});

        fetchPlans(
          0,
          dispatch,
          classificationFromFilter(props.status),
          props.reloadedCards,
          swipedPlans,
          obtainedLocation.coords.longitude,
          obtainedLocation.coords.latitude,
          5000
        );
      })();
    }
  }, [props.status]);

  return (
    <Box flex={1} safeAreaX={6}>
      {plans.length > 0 ? (
        <>
          <CardsSwipe
            ref={swiper}
            cards={plans}
            renderCard={(plan) =>
              plan != undefined ? (
                <CraneCard plan={plan}></CraneCard>
              ) : (
                <EmptyCards></EmptyCards>
              )
            }
            onSwipedLeft={(index) => {
              addDislikedPlan(index);
            }}
            onSwipedRight={(index) => {
              addLikedPlan(index);
            }}
            onSwipeStart={() => setLikedEmoji("🥰")}
            loop={false}
            renderYep={() => (
              <Text
                role="img"
                aria-label="Smiling Face with Hearts"
                fontSize="2xl"
                mx={5}
                my={4}
              >
                {likedEmoji}
              </Text>
            )}
            renderNope={() => (
              <Text
                role="img"
                aria-label="Expressionless Face"
                fontSize="2xl"
                mx={5}
                my={4}
              >
                😑
              </Text>
            )}
            onNoMoreCards={() => refreshPlans()}
            animDuration={300}
            onSwipeEnd={() => {
              setButtonsDisabled(false);
            }}
          />
          <CardButtons
            swiper={swiper}
            setRepeatedPlan={setRepeatedPlan}
            setLikedEmoji={setLikedEmoji}
            buttonsDisabled={buttonsDisabled}
          ></CardButtons>
        </>
      ) : (
        <EmptyCards></EmptyCards>
      )}
    </Box>
  );
}
