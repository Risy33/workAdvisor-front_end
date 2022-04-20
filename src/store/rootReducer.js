import { combineReducers } from "redux";
import user from "./user/reducer";
import experiencesReducer from "./experiences/reducer";
import workPlacesReducer from "./workplaces/reducer";
export default combineReducers({
  user,
  experiencesReducer,
  workPlacesReducer,
});
