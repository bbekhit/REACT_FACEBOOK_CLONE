import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import modalReducer from "./modalReducer";
import profileReducer from "./profileReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  post: postReducer,
  modal: modalReducer,
  profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
