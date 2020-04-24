import authReducer from "../../redux/reducers/authReducer";

describe("Auth Reducer", () => {
  let user = {
    id: 1,
    name: "Boutros",
  };
  it("sets up current user", () => {
    let action = {
      type: "SET_CURRENT_USER",
      payload: user,
    };
    const state = authReducer({}, action);
    expect(state).toEqual({
      isAuthenticated: true,
      user,
    });
  });
  it("logout user", () => {
    let action = {
      type: "LOGOUT_USER",
      payload: {},
    };
    const state = authReducer({}, action);
    expect(state).toEqual({
      isAuthenticated: false,
      user: {},
    });
  });
});
