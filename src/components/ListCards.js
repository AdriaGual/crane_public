import { Heading, ScrollView, Text } from "native-base";
import React from "react";
import { reverseArr } from "../utils/GeneralUtils";
import ListCard from "./ListCard";

function ListCards(props) {
  return (
    <>
      <Heading size="md" mb={2}>
        {props.title}
      </Heading>
      {props.plans.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {reverseArr(props.plans).map((plan) => {
            return <ListCard plan={plan} key={plan.id}></ListCard>;
          })}
        </ScrollView>
      ) : (
        <Text>No tienes planes que te gusten 😔</Text>
      )}
    </>
  );
}

export default ListCards;
