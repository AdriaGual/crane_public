export const defaultPlan = {
  id: "1",
  name: "",
  phone: "",
  url: "",
  city: "",
  distance: "",
  categories: "",
  classification: "",
  photos: [
    "https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png",
  ],
};

export const allCategories =
  "7320,7315,7360,7342,9927,9362,7376,8099,9361032,9361030";

export const SPORTS_CENTER_CATEGORY = "7320";
export const RESTAURANT_CATEGORY = "7315";
export const CAMPGROUND_CATEGORY = "7360";
export const MOVIE_THEATER_CATEGORY = "7342";
export const AQUATIC_ZOO_CATEGORY = "9927";
export const PARK_AND_RECREATION_CATEGORY = "9362";
export const TOURIST_ATTRACTION_CATEGORY = "7376";
export const GEOGRAPHIC_FEATURE_CATEGORY = "8099";
export const GARDEN_AND_CENTERS_CATEGORY = "9361032";
export const DO_IT_YOURSELF_CATEGORY = "9361030";

export function iconFromClassification(classification) {
  switch (classification) {
    case "SPORTS_CENTER":
      return "american-football";
    case "RESTAURANT":
      return "restaurant";
    case "CAMPGROUND":
      return "bonfire";
    case "MOVIE_THEATER":
    case "CINEMA":
      return "videocam";
    case "AQUATIC_ZOO":
      return "paw";
    case "PARK_AND_RECREATION":

    case "TOURIST_ATTRACTION":
      return "ice-cream";
    case "GEOGRAPHIC_FEATURE":
    case "IMPORTANT_TOURIST_ATTRACTION":
    case "PARK_RECREATION_AREA":
      return "map";
    case "GARDEN_AND_CENTERS":
      return "rose";
    case "DO_IT_YOURSELF":
      return "build";
    default:
      return "restaurant";
  }
}

export function classificationFromFilter(filter) {
  switch (filter) {
    case "Todo":
      return allCategories;
    case "Comida":
      return RESTAURANT_CATEGORY;
    case "Turismo":
      return (
        MOVIE_THEATER_CATEGORY +
        "," +
        TOURIST_ATTRACTION_CATEGORY +
        "," +
        PARK_AND_RECREATION_CATEGORY
      );
    case "Deportes":
      return SPORTS_CENTER_CATEGORY;
    case "Aventura":
      return (
        GEOGRAPHIC_FEATURE_CATEGORY +
        "," +
        GARDEN_AND_CENTERS_CATEGORY +
        "," +
        CAMPGROUND_CATEGORY +
        "," +
        PARK_AND_RECREATION_CATEGORY
      );
  }
}
