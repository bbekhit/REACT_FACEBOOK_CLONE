import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (alertMessage, alertType, id) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: {
      alertType,
      alertMessage,
      id
    }
  });
  setTimeout(() => dispatch(removeAlert()), 6000);
};
export const removeAlert = () => {
  return {
    type: REMOVE_ALERT
  };
};
