import { DELETE_EXPERIENCE, SET_EXPERIENCES, SET_LOADING } from "./actions";

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


    default: {
      return state;
    }
  }
}
