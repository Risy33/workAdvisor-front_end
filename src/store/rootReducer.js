import { combineReducers } from "redux";
import user from "./user/reducer";
import experiencesReducer from "./experiences/reducer";
export default combineReducers({
  user,
 experiencesReducer
});
