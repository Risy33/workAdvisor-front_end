import { SET_EXPERIENCES, SET_LOADING, FILTER_EXPERIENCES } from "./actions";

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
    case FILTER_EXPERIENCES: {
      const filteredExperiences = state.allExperiences.filter((experience) => {
        return experience.title
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      return {
        ...state,
        loading: false,
        allExperiences: filteredExperiences,
      };
    }

    default: {
      return state;
    }
  }
}
