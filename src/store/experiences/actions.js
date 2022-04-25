import axios from "axios";
import { apiUrl } from "../config/constant";

import { selectToken, selectUser } from "../user/selector";
import { selectWorkPlace } from "../workplaces/selectors";
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

export const setUseful = (useful) => {
  return {
    type: SET_USEFUL,
    payload: useful,
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
      dispatch(setUseful(id));
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
