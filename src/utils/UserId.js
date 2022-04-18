import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { userAdded } from "../redux/user/UserSlice";

export const getUserId = async () => {
  try {
    let val = await AsyncStorage.getItem("userId");
    return val;
  } catch (e) {
    return "";
  }
};

export const setUserId = async (value) => {
  try {
    await AsyncStorage.setItem("userId", value);
  } catch (e) {
    console.log(e);
  }
};

export const loadUserId = async (dispatch) => {
  let userId = await getUserId();
  if (userId == null || userId == "null") {
    userId = uuid.v4();
    await setUserId(userId);
  }
  dispatch(userAdded({ id: userId }));
};
