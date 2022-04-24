import axios from "axios";
import { apiUrl } from "../config/constant";

export const SET_LOADING = "workPlaces/loading";
export const SET_WORK_PLACES = "workplaces/setWorkPlaces";
export const FILTER_WORKPLACES = "workplaces/filterWorkPlaces";
export const SET_WORK_PLACE_ID = "workplaces/getWorkPlaceId";
export const FILTER_EXPERIENCES_BY_RATE = "workplaces/filterExperiencesByRate";

const startLoading = () => ({
  type: SET_LOADING,
});

const getWorkPlaces = (workplaces) => ({
  type: SET_WORK_PLACES,
  payload: { workplaces },
});
export const filterWorkplaces = (workPlace) => ({
  type: FILTER_WORKPLACES,
  payload: workPlace,
});
const getWorkPlaceId = (id) => ({
  type: SET_WORK_PLACE_ID,
  payload: { id },
});
export const filterExperiencesByRate = (experiences) => ({
  type: FILTER_EXPERIENCES_BY_RATE,
  payload: experiences,
});

export const fetchWorkPlaces = async (dispatch, getState) => {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/workplaces`);
  // console.log("workplaces", response.data.workplaces);
  dispatch(getWorkPlaces(response.data.workplaces));
};

export const fetchWorkPlaceId = (id) => async (dispatch, getState) => {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/workplaces/details/${id}`);
  console.log("workplace", response.data);
  dispatch(getWorkPlaceId(response.data));
};
