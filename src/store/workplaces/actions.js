import axios from "axios";
import { apiUrl } from "../config/constant";

export const SET_LOADING = "workPlaces/loading";
export const SET_WORK_PLACES = "workplaces/setWorkPlaces";

const startLoading = () => ({
  type: SET_LOADING,
});

const getWorkPlaces = (workplaces) => ({
  type: SET_WORK_PLACES,
  payload: { workplaces },
});

export const fetchWorkPlaces = async (dispatch, getState) => {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/workplaces`);
  console.log("workplaces", response.data.workplaces);
  dispatch(getWorkPlaces(response.data.workplaces));
};
