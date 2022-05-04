import { EDIT_EXPERIENCE, SET_EXPERIENCES, SET_LOADING } from "./actions";
import { DELETE_EXPERIENCE } from "../experiences/actions";

const initialState = {
  loading: null,
  allExperiences: [],
  experience: null,
};

export default function experiencesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_EXPERIENCES: {
      return {
        ...state,
        allExperiences: [...action.payload.experiences],
      };
    }
    case DELETE_EXPERIENCE: {
      const deleteExperience = state.allExperiences.filter(
        (exp) => exp.id !== action.payload
      );
      return {
        ...state,
        allExperiences: deleteExperience,
      };
    }
  
    default: {
      return state;
    }
  }
}
