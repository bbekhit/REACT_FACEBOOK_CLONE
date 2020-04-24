// src/actions/users.test.js
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  getPosts,
  createPost,
  deletePost,
  editPost,
} from "../../redux/actions/postActions";
import { setAlert } from "../../redux/actions/alertActions";

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

    expect.assertions(2);
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

    expect.assertions(2);
    expect(actions[0].type).toEqual("GET_POSTS");
    expect(actions[0].payload[0].title).toEqual("title");
  });

  it("dispatches DELETE_POST", async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve());

    await store.dispatch(deletePost(1));

    let actions = store.getActions();

    expect.assertions(3);
    expect(actions[0].type).toEqual("SET_ALERT");
    expect(actions[1].type).toEqual("DELETE_POST");
    expect(actions[1].payload).toEqual(1);
  });

  it("dispatches EDIT_POST", async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve());

    await store.dispatch(editPost({ id: 1, title: "updated post" }, 1));

    let actions = store.getActions();

    expect.assertions(4);
    expect(actions[0].type).toEqual("SET_ALERT");
    expect(actions[1].type).toEqual("EDIT_POST");
    expect(actions[1].payload.postId).toEqual(1);
    expect(actions[1].payload.data.title).toEqual("updated post");
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
