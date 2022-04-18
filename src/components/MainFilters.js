import { Button, ScrollView, useColorModeValue } from "native-base";
import { default as React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterOptions } from "../constants/FilterOptions";
import {
  BrandMainColor,
  LightGray,
  MainGray,
  MainWhite,
  SecondaryGray,
} from "../constants/Styles";
import { planDeleted } from "../redux/plans/PlansSlice";
import { MainBlack } from "./../constants/Styles";

export function MainFilters(props) {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans);

  return (
    <ScrollView
      horizontal={true}
      maxHeight={10}
      showsHorizontalScrollIndicator={false}
      my={4}
      ml={6}
    >
      {filterOptions.map((e) => (
        <Button
          key={e.status}
          onPress={() => {
            if (props.status !== e.status) {
              props.setStatusFilter(e.status);
              for (let key in plans) {
                dispatch(planDeleted({ id: plans[key].id }));
              }
              props.setReloadedCards(0);
            }
          }}
          variant={props.status === e.status ? "solid" : "ghost"}
          bg={useColorModeValue(
            props.status === e.status ? BrandMainColor : MainWhite,
            props.status === e.status ? BrandMainColor : SecondaryGray
          )}
          borderRadius="xl"
          px={6}
          mr={4}
          borderWidth={2}
          borderColor={useColorModeValue(
            props.status === e.status ? MainWhite : "gray.100",
            props.status === e.status ? MainWhite : MainGray
          )}
          _text={{
            fontWeight: "700",
            color: useColorModeValue(
              props.status === e.status ? MainWhite : SecondaryGray,
              props.status === e.status ? MainWhite : LightGray
            ),
          }}
          _pressed={{
            bg: useColorModeValue(
              props.status === e.status ? BrandMainColor : LightGray,
              props.status === e.status ? BrandMainColor : MainBlack
            ),
            borderColor: useColorModeValue(
              props.status === e.status ? MainWhite : "gray.400",
              props.status === e.status ? MainWhite : MainGray
            ),
          }}
        >
          {e.status}
        </Button>
      ))}
    </ScrollView>
  );
}
