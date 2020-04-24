// src/actions/users.test.js
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getPosts, createPost } from "../../redux/actions/postActions";

const mockStore = configureMockStore([thunk]);

describe("getPosts action creator", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store = mockStore({});
  });

  it("dispatches CREATE_POST action and returns data on success", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: 1,
          title: "this is the title",
          body: "this is my  first post",
        },
      })
    );

    await store.dispatch(createPost());

    let actions = store.getActions();

    expect(actions[0].type).toEqual("CREATE_POST");
    expect(actions[0].payload.title).toEqual("this is the title");
  });

  it("dispatches GET_POSTS action and returns data on success", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          posts: [
            {
              id: 1,
              title: "title",
              body: "body",
            },
          ],
        },
      })
    );
    await store.dispatch(getPosts());

    let actions = store.getActions();

    expect(actions[0].type).toEqual("GET_POSTS");
    expect(actions[0].payload[0].title).toEqual("title");
  });
});

// it("dispatches GET_POSTS action and returns []", async () => {
//   const errorMessage = "Error";
//   mockAxios.get.mockImplementationOnce(() =>
//     Promise.reject(new Error(errorMessage))
//   );
//   await store.dispatch(getPosts()).rejects.toThrow(errorMessage);
// });

// it("redirects on failure", async () => {
//   // override behaviour for this one call
//   mockAxios.get.mockImplementationOnce(() => {
//     Promise.reject(new Error("error"));
//   });
//   await store.dispatch(getPosts(5, 4));

//   const actions = store.getActions();

//   console.log(actions);
// });

// it("redirects on failure", async () => {
//   // override behaviour for this one call
//   mockAxios.post.mockImplementationOnce(() => {
//     let err = new Error("error");
//     err.response = {};
//     err.response.data = "Error data";
//     console.log(err);

//     Promise.reject(err);
//   });
//   let res = await store.dispatch(getPosts());
//   console.log("resErro", res);

//   // const actions = store.getActions();

//   // console.log(actions);
// });
