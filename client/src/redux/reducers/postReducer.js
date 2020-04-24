import {
  CREATE_POST,
  GET_POSTS,
  DELETE_POST,
  EDIT_POST,
  UPDATE_COMMENT,
  UPDATE_LIKE,
} from "../actions/types";

const initialState = [];

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case GET_POSTS:
      return action.payload;
    case DELETE_POST:
      return state.filter(item => item._id !== action.payload);
    case EDIT_POST:
      return state.map(post =>
        post._id === action.payload.postId ? (post = action.payload.data) : post
      );
    case UPDATE_COMMENT:
      return state.map(post =>
        post._id === action.payload._id ? (post = action.payload) : post
      );
    case UPDATE_LIKE:
      return state.map(post =>
        post._id === action.payload._id ? (post = action.payload) : post
      );
    default:
      return state;
  }
};

export default postReducer;
