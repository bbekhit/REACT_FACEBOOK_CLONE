import {
  SET_CURRENT_USER,
  LOGOUT_USER,
  RESOLVE_AUTH,
  RESET_AUTH,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isAuthResolved: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        // isAuthResolved: true,
        user: { ...action.payload },
        // user: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: {},
      };
    case RESOLVE_AUTH:
      return {
        ...state,
        isAuthResolved: true,
      };
    case RESET_AUTH:
      return {
        ...state,
        isAuthResolved: false,
      };
    default:
      return state;
  }
};
