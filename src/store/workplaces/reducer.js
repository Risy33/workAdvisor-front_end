import {
  FILTER_WORKPLACES,
  SET_LOADING,
  SET_WORK_PLACES,
  SET_WORK_PLACE_ID,
} from "./actions";
import {
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  EDIT_EXPERIENCE,
  SET_USEFUL,
} from "../experiences/actions";
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

    case ADD_EXPERIENCE: {
      console.log("reducer workplace add new exp", action.payload.experience);
      return {
        ...state,
        workPlace: {
          ...state.workPlace,
          experiences: [
            ...state.workPlace.experiences,
            { ...action.payload.experience },
          ],
        },
      };
    }
    case DELETE_EXPERIENCE: {
      const deleteExperience = state.workPlace.experiences.filter(
        (exp) => exp.id !== action.payload
      );
      return {
        ...state,
        workPlace: { ...state.workPlace, experiences: deleteExperience },
      };
    }
    case EDIT_EXPERIENCE: {
      const updatedExperiences = state.workPlace.experiences.map((e) =>
        e.id === action.payload.id ? { ...action.payload } : e
      );

      return {
        ...state,
        workPlace: {
          ...state.workPlace,
          experiences: updatedExperiences,
        },
      };
    }
    default: {
      return state;
    }
  }
}
