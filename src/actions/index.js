import axios from "../apis/axios";
import { GET_SITE } from "./types";

export const getSite = (vendor, region) => async dispatch => {
  let res = null;
  try {
    res = await axios.get(region.url);
  } catch (e) {
    console.log(e);
  }
  dispatch({
    type: GET_SITE,
    payload: { vendor: vendor, region: region.name, res: res }
  });
};
