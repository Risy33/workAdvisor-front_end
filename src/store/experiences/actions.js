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
export const ADD_EXPERIENCE = "experiences/newExperience";
export const DELETE_EXPERIENCE = "experiences/deleteStory";
export const EDIT_EXPERIENCE = "experiences/editExperience";

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

      const res = await axios.post(
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
        payload: { experience: res.data },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const deleteStory = (storyId) => ({
  type: DELETE_EXPERIENCE,
  payload: storyId,
});

export const deleteMyExperience = (id) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    const { token } = selectUser(getState());

    try {
      const response = await axios.delete(`${apiUrl}/experiences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`experience deleted?`, response.data);
      dispatch(deleteStory(id));
    } catch (e) {
      console.log(e.message);
    }
  };
};

const editExperience = (title, description, image) => ({
  type: EDIT_EXPERIENCE,
  payload: { title, description, image },
});

export const editMyExperience = (id, title, image, description) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const { token } = selectUser(getState());
    try {
      const response = await axios.patch(
        `${apiUrl}/experiences/${id}`,
        {
          title,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(`experience edited?`, response.data);
      dispatch(editExperience(title, description, image));
    } catch (e) {
      console.log(e.message);
    }
  };
};
