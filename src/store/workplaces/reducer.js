import {
  FILTER_WORKPLACES,
  SET_LOADING,
  SET_WORK_PLACES,
  SET_WORK_PLACE_ID,
  FILTER_EXPERIENCES_BY_RATE,
} from "./actions";

const initialState = {
  loading: null,
  workPlaces: [],
  filteredWorkPlaces: [],
  workPlace: null,
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
    case SET_WORK_PLACE_ID: {
      return {
        ...state,
        workPlace: { ...action.payload.id },
      };
    }

    default: {
      return state;
    }
  }
}
