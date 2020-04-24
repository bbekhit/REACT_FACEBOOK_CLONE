import { setAlert, removeAlert } from "../../redux/actions/alertActions";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

describe("Alert actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store = mockStore({});
  });

  it("dispatch setAlert with correct payload", async () => {
    await store.dispatch(setAlert("This is error message", "error", "1"));

    let actions = store.getActions();

    expect(actions[0].type).toEqual("SET_ALERT");
    expect(actions[0].payload.alertType).toEqual("error");
  });

  it("dispatch removeAlert", async () => {
    await store.dispatch(removeAlert());

    let actions = store.getActions();

    expect(actions[0].type).toEqual("REMOVE_ALERT");
  });
});
