import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  post: postReducer,
  modal: modalReducer,
  profile: profileReducer
});
