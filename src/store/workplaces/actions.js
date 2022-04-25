import { selectToken, selectUser } from "../user/selector";
import { selectWorkPlace } from "../workplaces/selectors";
import axios from "axios";
import { apiUrl } from "../config/constant";

export const SET_LOADING = "workPlaces/loading";
export const SET_WORK_PLACES = "workplaces/setWorkPlaces";
export const FILTER_WORKPLACES = "workplaces/filterWorkPlaces";
export const SET_WORK_PLACE_ID = "workplaces/getWorkPlaceId";
export const SET_EXPERIENCES = "experiences/getExperiences";
export const FILTER_EXPERIENCES = "experiences/filterExperiences";
export const RESET_EXPERIENCES = "experiences/resetExperiences";
export const FILTER_EXPERIENCES_BY_RATE = "experiences/filterByRate";
export const SET_USEFUL = "experiences/setUseful";

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

const getExperiences = (experiences) => ({
  type: SET_EXPERIENCES,
  payload: { experiences },
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
      dispatch(fetchAllExperiences);
      dispatch(setUseful(useful));
      console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const createExperience = (
  title,
  description,
  image,
  status,
  useful,
  userId
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoading);
      const token = selectToken(getState());
      const user = selectUser(getState());
      const workplace = selectWorkPlace(getState());
      console.log("title", title, description, image, status, userId);

      await axios.post(
        `${apiUrl}/experiences/newExperience`,
        {
          title,
          description,
          image,
          status,
          userId: user.id,
          workPlaceId: workplace.id,
          useful: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "experiences/newExperience",
        payload: { title, description, image, useful },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
};
