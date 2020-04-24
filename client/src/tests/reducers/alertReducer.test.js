import alertReducer from "../../redux/reducers/alertReducer";

describe("Alert Reducer", () => {
  it("should render an alert", () => {
    let action = {
      type: "SET_ALERT",
      payload: {
        alertType: "error",
        alertMessage: "this is an error message",
        id: 1,
      },
    };
    const state = alertReducer(undefined, action);
    expect(state).toEqual({
      alertType: "error",
      alertMessage: "this is an error message",
      id: 1,
    });
  });

  it("should remove alert", () => {
    let action = {
      type: "REMOVE_ALERT",
    };
    const state = alertReducer(
      {
        alertType: "error",
        alertMessage: "this is an error message",
        id: 1,
      },
      action
    );

    expect(state).toEqual(null);
  });

  it("should return state on default", () => {
    let action = {
      type: "default",
    };
    const state = alertReducer(
      {
        alertType: "error",
        alertMessage: "this is an error message",
        id: 1,
      },
      action
    );

    expect(state).toEqual({
      alertType: "error",
      alertMessage: "this is an error message",
      id: 1,
    });
  });
});
