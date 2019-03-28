import { combineReducers } from "redux";

import { GET_SITE } from "../actions/types";

const siteReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SITE:
      const { vendor, region } = action.payload;
      return { ...state, [`${vendor}-${region}`]: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  sites: siteReducer
});
