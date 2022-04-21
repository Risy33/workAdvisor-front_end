import { SET_EXPERIENCES, SET_LOADING } from "./actions";

const initialState = {
  loading: null,
  allExperiences: [],
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
        loading: false,
        allExperiences: [...action.payload.experiences],
      };
    }

    default: {
      return state;
    }
  }
}
