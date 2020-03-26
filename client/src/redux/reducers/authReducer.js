import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
