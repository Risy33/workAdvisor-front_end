import axios from "axios";
import { apiUrl } from "../config/constant";
export const SET_LOADING = "experiences/loading";
export const SET_EXPERIENCES = "experiences/getExperiences";
export const FILTER_EXPERIENCES = "experiences/filterExperiences";
export const RESET_EXPERIENCES = "experiences/resetExperiences";
export const FILTER_EXPERIENCES_BY_RATE = "experiences/filterByRate";
export const SET_USEFUL = "experiences/setUseful";

const startLoading = () => ({
  type: SET_LOADING,
});

const getExperiences = (experiences) => ({
  type: SET_EXPERIENCES,
  payload: { experiences },
});
export const filterExperiencesByRate = (experiences) => ({
  type: FILTER_EXPERIENCES_BY_RATE,
  payload: experiences,
});

export const setUseful = (useful) => {
  return {
    type: SET_USEFUL,
    payload: useful + 1,
  };
};

export const fetchAllExperiences = async (dispatch, getState) => {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/experiences`);
  console.log("response", response.data);
  dispatch(getExperiences(response.data.experiences));
};
export const updateUseful = (id, useful) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading());
      const response = await axios.patch(`${apiUrl}/experiences/${id}`, {
        useful: useful + 1,
      });
      dispatch(setUseful(useful));
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };
};
