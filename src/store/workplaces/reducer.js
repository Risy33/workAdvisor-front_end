import { FILTER_WORKPLACES, SET_LOADING, SET_WORK_PLACES } from "./actions";

const initialState = {
  loading: null,
  workPlaces: [],
  filteredWorkPlaces: [],
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
        filteredWorkPlaces: [...action.payload.workplaces],
      };
    }
    case FILTER_WORKPLACES: {
      const filteredWorkPlaces = state.workPlaces.filter((workPlace) => {
        return workPlace.name
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      return {
        ...state,
        filteredWorkPlaces: filteredWorkPlaces,
      };
    }
    default: {
      return state;
    }
  }
}
