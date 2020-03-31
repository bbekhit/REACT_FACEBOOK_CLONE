import {
  CREATE_POST,
  GET_POSTS,
  DELETE_POST,
  EDIT_POST,
  UPDATE_COMMENT,
  UPDATE_LIKE
} from "./types";
import { setAlert } from "./alertActions";
import axios from "axios";

let token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token
  }
};

export const createPost = data => async dispatch => {
  const body = JSON.stringify(data);
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.post("/api/v1/post/create", body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const getPosts = (skip, limit, previousState = []) => async dispatch => {
  const body = JSON.stringify({ skip, limit });
  try {
    let res = await axios.post("/api/v1/post/posts", body, config);
    let newState = [...previousState, ...res.data.posts];
    dispatch({
      type: GET_POSTS,
      payload: newState
    });
    return res.data.size;
  } catch (err) {
    // dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const deletePost = postId => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.delete(`/api/v1/post/${postId}`, config);
    dispatch(setAlert(res.data.message, "success", "4"));
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const editPost = (data, postId) => async dispatch => {
  console.log(typeof postId);

  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  const body = JSON.stringify(data);
  try {
    let res = await axios.put(`/api/v1/post/${postId}`, body, config);
    dispatch(setAlert(res.data.message, "success", "4"));
    dispatch({
      type: EDIT_POST,
      payload: { postId, data }
    });
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const addComment = (comment, postId) => async dispatch => {
  const body = JSON.stringify({ comment });
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.put(
      `/api/v1/post/addComment/${postId}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.delete(
      `/api/v1/post/deleteComment/${postId}/${commentId}`,
      config
    );
    dispatch({
      type: UPDATE_COMMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const addLike = postId => async dispatch => {
  const body = JSON.stringify({ postId });
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.put(`/api/v1/post/addLike/${postId}`, body, config);
    dispatch({
      type: UPDATE_LIKE,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const removeLike = postId => async dispatch => {
  const body = JSON.stringify({ postId });
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.put(
      `/api/v1/post/removeLike/${postId}`,
      body,
      config
    );
    dispatch({
      type: UPDATE_LIKE,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};
