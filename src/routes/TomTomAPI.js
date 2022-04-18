import axios from "axios";
import { planAdded, planReseted } from "../redux/plans/PlansSlice";
import { CapitalizeWord } from "../utils/GeneralUtils";

const TomTomAPIKey = ["Añadir clave 1", "Añadir clave 2"];

export function nearbySearchAPIUrl(
  keyIndex,
  maxResults,
  radius,
  lat,
  lon,
  ofs,
  categorySet
) {
  return (
    "https://api.tomtom.com/search/2/nearbySearch/.json?key=" +
    TomTomAPIKey[keyIndex] +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&radius=" +
    radius +
    "&limit=" +
    maxResults +
    "&ofs=" +
    ofs * 10 +
    "&categorySet=" +
    categorySet
  );
}

export function detailsSearchAPIUrl(keyIndex, detailsId) {
  return (
    "https://api.tomtom.com/search/2/poiDetails.json?key=" +
    TomTomAPIKey[keyIndex] +
    "&sourceName=Foursquare&id=" +
    detailsId
  );
}

export function photoSearchAPIUrl(keyIndex, photoId) {
  return (
    "https://api.tomtom.com/search/2/poiPhoto?key=" +
    TomTomAPIKey[keyIndex] +
    "&id=" +
    photoId +
    "&height=1350&width=1080"
  );
}

export const fetchPlans = async (
  keyIndex,
  dispatch,
  categorySet,
  reloadedCards,
  swipedPlans,
  longitude,
  latitude,
  radius
) => {
  try {
    dispatch(planReseted());
    const response = await axios.get(
      nearbySearchAPIUrl(
        keyIndex,
        20,
        radius,
        latitude,
        longitude,
        reloadedCards,
        categorySet
      ),
      {
        responseType: "json",
      }
    );

    if (response.status === 200) {
      let totalResults = response.data.summary.totalResults;
      let maxOffset = Math.floor(totalResults / 10);
      //Empty array to start filling the cleanedPlans
      let plans = [];
      let fetchedResults = cleanFetchedResults(response.data);
      //Remove already swiped results
      fetchedResults = removeAlreadySwipedResults(fetchedResults, swipedPlans);
      //Look if there are some results

      if (fetchedResults.length > 0) {
        //Look for details of every result
        const requests = fetchedResults.map(async (plan) => {
          let fetchedPhoto = await fetchDetails(keyIndex, plan.id, false);
          //Clean all information and fill the array
          let cleanedPlan = cleanPlan(plan, fetchedPhoto);

          plans.push(cleanedPlan);
        });
        Promise.all(requests).then(() => {
          if (plans.length > 0) {
            for (let key in plans) {
              dispatch(planAdded(plans[key]));
            }
          } else {
            if (keyIndex < TomTomAPIKey.length) {
              keyIndex = keyIndex + 1;
            } else {
              keyIndex = 0;
            }
            fetchPlans(
              keyIndex,
              dispatch,
              categorySet,
              reloadedCards,
              swipedPlans,
              longitude,
              latitude,
              radius
            );
          }
        });
      } else {
        if (maxOffset > reloadedCards) {
          fetchPlans(
            keyIndex,
            dispatch,
            categorySet,
            reloadedCards + 1,
            swipedPlans,
            longitude,
            latitude,
            radius
          );
        } else {
          fetchPlans(
            keyIndex,
            dispatch,
            categorySet,
            1,
            swipedPlans,
            longitude,
            latitude,
            radius + 1000
          );
        }
      }
    }
  } catch (error) {
    if (keyIndex < TomTomAPIKey.length) {
      keyIndex = keyIndex + 1;
    } else {
      keyIndex = 0;
    }
    fetchPlans(
      keyIndex,
      dispatch,
      categorySet,
      reloadedCards,
      swipedPlans,
      longitude,
      latitude,
      1000
    );
  }
};

function cleanFetchedResults(data) {
  let fetchedResults = data.results;
  let cleanFetchedResults = [];
  fetchedResults.map((fetchedResult) => {
    if (fetchedResult.dataSources != undefined) {
      cleanFetchedResults.push(fetchedResult);
    }
  });
  return cleanFetchedResults;
}

function removeAlreadySwipedResults(fetchedResults, swipedPlans) {
  if (swipedPlans.length > 0) {
    let notRepeatedResults = [];
    fetchedResults.map((result) => {
      let notFound = swipedPlans.find((element) => element.id == result.id);
      if (notFound == undefined) {
        notRepeatedResults.push(result);
      }
    });

    return notRepeatedResults;
  } else {
    return fetchedResults;
  }
}

export async function fetchDetails(keyIndex, detailsId, allphotos) {
  try {
    const response = await axios.get(detailsSearchAPIUrl(keyIndex, detailsId), {
      responseType: "json",
    });
    if (response.status === 200) {
      //Get photos
      let fetchedPhotos = response.data.result.photos;

      let photos = [];
      if (allphotos) {
        photos = await Promise.all(
          fetchedPhotos.map(async (photo) => {
            return await fetchPhoto(keyIndex, photo.id);
          })
        );
      } else {
        let photo = await fetchPhoto(keyIndex, fetchedPhotos[0].id);
        photos.push(photo);
      }

      return photos;
    } else {
      if (keyIndex < TomTomAPIKey.length) {
        keyIndex = keyIndex + 1;
      } else {
        keyIndex = 0;
      }
      fetchDetails(keyIndex, detailsId, false);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Data fetching cancelled");
    }
  }
}

async function fetchPhoto(keyIndex, photoId) {
  try {
    const response = await axios.get(photoSearchAPIUrl(keyIndex, photoId), {
      responseType: "arraybuffer",
    });
    if (response.status === 200) {
      //Get photo
      return (
        "data:image/png;base64," +
        Buffer.from(response.data, "binary").toString("base64")
      );
    } else {
      if (keyIndex < TomTomAPIKey.length) {
        keyIndex = keyIndex + 1;
      } else {
        keyIndex = 0;
      }
      fetchPhoto(keyIndex, photoId);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Data fetching cancelled");
    }
  }
}

function cleanPlan(plan, photos) {
  let id = plan.id;
  let name = plan.poi.name;
  let phone = "undefined";
  if (plan.poi.phone) {
    phone = plan.poi.phone;
  }
  let url = "undefined";
  if (plan.poi.url) {
    url = plan.poi.url;
  }
  let city = plan.address.localName;
  let address = plan.address.freeformAddress;
  let distance = plan.dist;
  let categories = "";
  plan.poi.categories.map((category) => {
    if (categories != "") {
      categories = categories + " - " + CapitalizeWord(category);
    } else {
      categories = CapitalizeWord(category);
    }
  });
  let classification = plan.poi.classifications[0].code;
  return {
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
  };
}
