import {
  GET_CURRENT_PROFILE,
  GET_PROFILES,
  GET_TO_FOLLOWING,
  SET_PROFILE_BY_ID,
  REMOVE_FROM_TO_FOLLOWING,
  UPDATE_FOLLOWING,
} from "../actions/types";

const initialState = {
  profiles: [],
  currentProfile: {},
  profileById: {},
  toFollow: [],
  loading: true,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        loading: false,
        currentProfile: action.payload,
      };
    case SET_PROFILE_BY_ID:
      return {
        ...state,
        profileById: action.payload,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    case UPDATE_FOLLOWING:
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile._id === action.payload._id
            ? (profile = action.payload)
            : profile
        ),
      };
    case GET_TO_FOLLOWING:
      return {
        ...state,
        toFollow: action.payload,
      };
    case REMOVE_FROM_TO_FOLLOWING:
      return {
        ...state,
        toFollow: state.toFollow.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default profileReducer;
