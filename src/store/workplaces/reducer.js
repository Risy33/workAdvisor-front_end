import { SET_LOADING, SET_WORK_PLACES } from "./actions";

const initialState = {
  loading: null,
  workPlaces: [],
};

export default function workPlacesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_WORK_PLACES: {
      return {
        ...state,
        workPlaces: [...action.payload.workplaces],
      };
    }
    default: {
      return state;
    }
  }
}
