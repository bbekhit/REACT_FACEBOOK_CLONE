import {
  GET_CURRENT_PROFILE,
  GET_PROFILES,
  GET_TO_FOLLOWING,
  REMOVE_FROM_TO_FOLLOWING,
  UPDATE_FOLLOWING
} from "../actions/types";

const initialState = {
  profiles: [],
  currentProfile: {},
  toFollow: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile._id === action.payload._id
            ? (profile = action.payload)
            : profile
        )
      };
    case GET_TO_FOLLOWING:
      return {
        ...state,
        toFollow: action.payload
      };
    case REMOVE_FROM_TO_FOLLOWING:
      return {
        ...state,
        toFollow: state.toFollow.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
};

export default profileReducer;
