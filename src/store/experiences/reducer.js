import { SET_EXPERIENCES, SET_LOADING, FILTER_EXPERIENCES, RESET_EXPERIENCES } from "./actions";

const initialState = {
  loading: null,
  allExperiences: [],
  filteredExperiences: [],
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
        filteredExperiences: [...action.payload.experiences],
      };
    }
    case FILTER_EXPERIENCES: {
      const filteredExperiences = state.allExperiences.filter((experience) => {
        return experience.title
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      return {
        ...state,
        filteredExperiences: filteredExperiences,
      };
    }
    case RESET_EXPERIENCES: {
      return {
        ...state,
        filteredExperiences: [...state.allExperiences],
      };
    }

    default: {
      return state;
    }
  }
}
