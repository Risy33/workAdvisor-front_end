import {
  FILTER_WORKPLACES,
  SET_LOADING,
  SET_WORK_PLACES,
  SET_WORK_PLACE_ID,
  SET_EXPERIENCES,
} from "./actions";
import { SET_USEFUL } from "../experiences/actions";
const initialState = {
  loading: null,
  workPlaces: [],
  filteredWorkPlaces: [],
  workPlace: null,
  allExperiences: [],
  experience: null,
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
    case SET_EXPERIENCES: {
      return {
        ...state,
        allExperiences: [...action.payload.experiences],
      };
    }
    case SET_USEFUL: {

      const updateExperiences = state.workPlace.experiences.map((exp) => {
        if (exp.id === parseInt(action.payload)) {
          return {
            ...exp,
            useful: exp.useful + 1,
          };
        } else {
          return exp;
        }
      });

      return {
        ...state,
        workPlace: {
          ...state.workPlace,
          experiences: [...updateExperiences],
        },
      };
    }

    default: {
      return state;
    }
  }
}
