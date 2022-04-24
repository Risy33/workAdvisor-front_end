import { SET_EXPERIENCES, SET_LOADING, SET_USEFUL } from "./actions";

const initialState = {
  loading: null,
  allExperiences: [],
  experience: [],
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
        experience: [...action.payload.experiences],
      };
    }
    case SET_USEFUL: {
      return {
        ...state,
        loading: false,
        experience: { ...state.experience, useful: action.payload },
      };
    }

    default: {
      return state;
    }
  }
}
