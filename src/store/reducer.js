// Redux Reducers
import { ACTION_TYPES } from "./action";
import { combineReducers } from "redux";

// Update Businesses reducer
const updateBusinessesReducer = (state = null, action) => {
  if (action.type === ACTION_TYPES.UPDATE_BUSINESSES) {
    return action.payload;
  }

  return state;
};

// Set Location Reducer
const setLocationReducer = (state = null, action) => {
  if (action.type === ACTION_TYPES.SET_LOCATION) {
    return action.payload;
  }

  return state;
};

// Set Proximity Reducer
const setProximityReducer = (state = 8046, action) => {
  if (action.type === ACTION_TYPES.SET_PROXIMITY) {
    return action.payload;
  }

  return state;
};

// Set Business Type Reducer
const setBusinessTypeReducer = (state = "restaurant", action) => {
  if (action.type === ACTION_TYPES.SET_BUSINESS_TYPE) {
    return action.payload;
  }

  return state;
};

// export combined reducers for scalability
export default combineReducers({
  businesses: updateBusinessesReducer,
  currentLocation: setLocationReducer,
  currentProximity: setProximityReducer,
  businessType: setBusinessTypeReducer,
});
