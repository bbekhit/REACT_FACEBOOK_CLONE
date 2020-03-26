import { LOGOUT_USER, SET_CURRENT_USER } from "./types";
import axios from "axios";
import { setAlert } from "./alertActions";

export const preSignup = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/v1/auth/pre-signup", body, config);
    return dispatch(setAlert(res.data.message, "success", "1"));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "2"));
  }
};

export const signup = (data, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/v1/auth/signup", body, config);
    dispatch(setAlert(res.data.message, "success", "3"));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const signin = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/v1/auth/signin", body, config);
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch(setCurrentUser(token));
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
    return "failed";
  }
};

export const signout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_USER
  });
  window.location.href = "/login";
};

export const setCurrentUser = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: data
    }
  };
  try {
    const res = await axios.get("/api/v1/auth/", config);
    const { user } = res.data;
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
  } catch (err) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
  }
};

export const signinWithGoogle = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(data);
  try {
    const res = await axios.post("/api/v1/auth/google-login", body, config);
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch(setCurrentUser(token));
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "4"));
  }
};

export const forgotPassword = email => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(email);
  try {
    const res = await axios.put("/api/v1/auth/forgot-password", body, config);
    dispatch(setAlert(res.data.message, "success", "5"));
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "6"));
    return "failed";
  }
};

export const resetPassword = resetInfo => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify(resetInfo);
  try {
    const res = await axios.put("/api/v1/auth/reset-password", body, config);
    dispatch(setAlert(res.data.message, "success", "allOverComponent"));
    return "success";
  } catch (err) {
    dispatch(setAlert(err.response.data.error, "error", "6"));
  }
};
// export const loginWithGoogle = user => {
// 	return fetch(`${API}/google-login`, {
// 		method: 'POST',
// 		headers: {
// 			Accept: 'application/json',
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(user),
// 	})
// 		.then(response => {
// 			return response.json();
// 		})
// 		.catch(err => console.log(err));
// };
