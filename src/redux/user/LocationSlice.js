import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    locationAdded(state, action) {
      return action.payload;
    },
    locationReseted(state, action) {
      return initialState;
    },
  },
});

export const { locationAdded, locationReseted } = locationSlice.actions;
export default locationSlice.reducer;
