import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    planAdded(state, action) {
      state.push(action.payload);
    },
    planUpdated(state, action) {
      const {
        id,
        name,
        phone,
        url,
        city,
        address,
        distance,
        categories,
        classification,
        photos,
      } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        existingPlan.name = name;
        (existingPlan.id = id),
          (existingPlan.name = name),
          (existingPlan.phone = phone),
          (existingPlan.url = url),
          (existingPlan.city = city),
          (existingPlan.address = address),
          (existingPlan.distance = distance),
          (existingPlan.categories = categories),
          (existingPlan.classification = classification),
          (existingPlan.photos = photos);
      }
    },
    planPhotosUpdated(state, action) {
      const { id, photos } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        existingPlan.photos = photos;
      }
    },
    planDeleted(state, action) {
      const { id } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        return state.filter((plan) => plan.id !== id);
      }
    },
    planReseted(state, action) {
      return initialState;
    },
  },
});

export const {
  planAdded,
  planUpdated,
  planPhotosUpdated,
  planDeleted,
  planReseted,
} = plansSlice.actions;

export default plansSlice.reducer;
