import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAdded(state, action) {
      return action.payload;
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existinguser = state.find((user) => user.id === id);
      if (existinguser) {
        return state.filter((user) => user.id !== id);
      }
    },
  },
});

export const { userAdded, userDeleted } = userSlice.actions;
export default userSlice.reducer;
