import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const dislikedPlansSlice = createSlice({
  name: "dislikedPlans",
  initialState,
  reducers: {
    dislikedPlanAdded(state, action) {
      state.push(action.payload);
    },
    dislikedPlanUpdated(state, action) {
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
        repeatedPlan,
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
          (existingPlan.photos = photos),
          (existingPlan.repeatedPlan = repeatedPlan);
      }
    },
    dislikedPlanPhotosUpdated(state, action) {
      const { id, photos } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        existingPlan.photos = photos;
      }
    },
    dislikedPlanDeleted(state, action) {
      const { id } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        return state.filter((plan) => plan.id !== id);
      }
    },
    dislikedPlanReseted(state, action) {
      return initialState;
    },
  },
});

export const {
  dislikedPlanAdded,
  dislikedPlanUpdated,
  dislikedPlanPhotosUpdated,
  dislikedPlanDeleted,
  dislikedPlanReseted,
} = dislikedPlansSlice.actions;

export default dislikedPlansSlice.reducer;
