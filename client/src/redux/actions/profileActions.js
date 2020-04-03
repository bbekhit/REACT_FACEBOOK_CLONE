import {
  GET_CURRENT_PROFILE,
  CREATE_PROFILE,
  GET_PROFILES,
  SET_PROFILE_BY_ID,
  UPDATE_FOLLOWING,
  GET_TO_FOLLOWING,
  REMOVE_FROM_TO_FOLLOWING
} from "./types";
import { setAlert } from "./alertActions";
import axios from "axios";

export const getCurrentProfile = () => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.get(`/api/v1/profile/me`, config);
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: {}
    });
  }
};

export const createProfile = data => async dispatch => {
  const body = JSON.stringify(data);
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.post("/api/v1/profile/create", body, config);
    dispatch({
      type: CREATE_PROFILE,
      payload: res.data
    });
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error"));
  }
};

export const getProfiles = () => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let res = await axios.get("/api/v1/profile/profiles", config);
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES,
      payload: []
    });
  }
};

export const getProfileById = profileId => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    let res = await axios.get(`/api/v1/profile/${profileId}`, config);
    console.log(res.data);
    dispatch({
      type: SET_PROFILE_BY_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "error"));
    // dispatch({
    //   type: SET_PROFILE_BY_ID,
    //   payload: {}
    // });
  }
};

export const addFollowing = (
  userId,
  targetProfileId,
  targetUserId,
  userProfileId
) => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  const body = JSON.stringify({
    userId,
    targetProfileId,
    targetUserId,
    userProfileId
  });
  try {
    let res = await axios.put(`/api/v1/profile/addFollowing`, body, config);
    dispatch({
      type: UPDATE_FOLLOWING,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error"));
  }
};

export const removeFollowing = (
  userId,
  targetProfileId,
  targetUserId,
  userProfileId
) => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  const body = JSON.stringify({
    userId,
    targetProfileId,
    targetUserId,
    userProfileId
  });
  try {
    let res = await axios.put(`/api/v1/profile/removeFollowing`, body, config);
    dispatch({
      type: UPDATE_FOLLOWING,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error"));
  }
};

export const getToFollowing = profileId => async dispatch => {
  let token = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  };
  try {
    let res = await axios.get(`/api/v1/profile/following/${profileId}`, config);
    dispatch({
      type: GET_TO_FOLLOWING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_TO_FOLLOWING,
      payload: []
    });
  }
};

export const removeFromToFollowing = id => dispatch => {
  return dispatch({
    type: REMOVE_FROM_TO_FOLLOWING,
    payload: id
  });
};
