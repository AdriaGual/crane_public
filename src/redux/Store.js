import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import dislikedPlansSlice from "./plans/DislikedPlansSlice";
import likedPlansSlice from "./plans/LikedPlansSlice";
import plansSlice from "./plans/PlansSlice";
import locationSlice from "./user/LocationSlice";
import userSlice from "./user/UserSlice";

const reducers = combineReducers({
  user: userSlice,
  plans: plansSlice,
  likedPlans: likedPlansSlice,
  dislikedPlans: dislikedPlansSlice,
  location: locationSlice,
});

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export default store;
