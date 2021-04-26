// Redux Actions
import { firestore } from "../config/firebase";
const businessRatingsRef = firestore.collection("ratings");

export const ACTION_TYPES = {
  UPDATE_BUSINESSES: "UPDATE_BUSINESSES",
  SET_LOCATION: "SET_LOCATION",
  SET_PROXIMITY: "SET_PROXIMITY",
  SET_BUSINESS_TYPE: "SET_BUSINESS_TYPE",
};

// Action for updating businesses
export const updateBusinesses = (businesses) => (dispatch) => {
  Promise.all(
    businesses.map((business) => {
      business["ratings"] = []; // initialize with empty array
      return businessRatingsRef
        .where("businessId", "==", business.reference) // look through business Id
        .get()
        .then((snapshot) => {
          // query for the ratings of the given business id
          if (snapshot.docs.length > 0) {
            // check it doesnt return empty
            let totalRatings = 0;
            snapshot.docs.forEach((doc) => {
              // go through each document
              const rating = doc.data();
              business.ratings.push(rating); // adding the rating to list
              totalRatings += rating.rating;
            });
            business["averageRating"] = ( // updating the average rating
              totalRatings / snapshot.docs.length
            ).toFixed(1); // calculating the new average rating and rounding to 1 decimal point
          }
          return business;
        });
    })
  ).then((results) => {
    // dispatch results
    dispatch({ type: ACTION_TYPES.UPDATE_BUSINESSES, payload: results });
  });
};

// Action for setting the user's current location
export const setCurrentLocation = (lat, lng) => {
  return {
    type: ACTION_TYPES.SET_LOCATION,
    payload: { lat, lng },
  };
};

// Action for setting the user's desire proximity
export const setCurrentProximity = (milesDistance) => {
  const metersDistance = Math.floor(milesDistance * 1690); // converting the miles to meters

  return {
    type: ACTION_TYPES.SET_PROXIMITY,
    payload: metersDistance,
  };
};

// Action for setting the user's desired business type
export const setCurrentBusinessType = (businessType) => {
  return {
    type: ACTION_TYPES.SET_BUSINESS_TYPE,
    payload: businessType,
  };
};
