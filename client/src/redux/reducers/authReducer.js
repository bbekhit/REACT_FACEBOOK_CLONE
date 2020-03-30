import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
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
