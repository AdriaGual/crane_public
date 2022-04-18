import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const likedPlansSlice = createSlice({
  name: "likedPlans",
  initialState,
  reducers: {
    likedPlanAdded(state, action) {
      const existingPlan = state.find((plan) => plan.id === action.payload.id);
      if (!existingPlan) {
        state.push(action.payload);
      }
    },
    likedPlanUpdated(state, action) {
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
    likedPlanPhotosUpdated(state, action) {
      const { id, photos } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        existingPlan.photos = photos;
      }
    },
    likedPlanDeleted(state, action) {
      const { id } = action.payload;
      const existingPlan = state.find((plan) => plan.id === id);
      if (existingPlan) {
        return state.filter((plan) => plan.id !== id);
      }
    },
    likedPlanReseted(state, action) {
      return initialState;
    },
  },
});

export const {
  likedPlanAdded,
  likedPlanUpdated,
  likedPlanPhotosUpdated,
  likedPlanDeleted,
  likedPlanReseted,
} = likedPlansSlice.actions;

export default likedPlansSlice.reducer;
