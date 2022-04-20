import axios from "axios";
import { apiUrl } from "../config/constant";

export const SET_LOADING = "experiences/loading";
export const SET_EXPERIENCES = "experiences/getExperiences";
export const FILTER_EXPERIENCES = "experiences/filterExperiences";
export const RESET_EXPERIENCES = "experiences/resetExperiences";

const startLoading = () => ({
  type: SET_LOADING,
});

const getExperiences = (experiences) => ({
  type: SET_EXPERIENCES,
  payload: { experiences },
});

export const filterExperiences = (experiences) => ({
  type: FILTER_EXPERIENCES,
  payload: experiences,
});

export const resetExperiences = () => ({
  type: RESET_EXPERIENCES,
  
});

export const fetchAllExperiences = async (dispatch, getState) => {
  dispatch(startLoading());
  const response = await axios.get(`${apiUrl}/experiences`);
  console.log("response", response.data);
  dispatch(getExperiences(response.data.experiences));
};
