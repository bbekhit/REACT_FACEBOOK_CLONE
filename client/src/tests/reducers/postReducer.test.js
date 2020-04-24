import postReducer from "../../redux/reducers/postReducer";
import posts from "../mockData/mockData";

describe("Post reducers", () => {
  it("should set up default values for posts", () => {
    const state = postReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual([]);
  });

  it("should add a post", () => {
    let post = {
      _id: 3,
      title: "Title-3",
      body: "Body-3",
      postedBy: "3",
    };
    let action = {
      type: "CREATE_POST",
      payload: post,
    };
    const state = postReducer(posts, action);

    expect(state).toEqual([...posts, post]);
  });

  it("should get all posts", () => {
    let action = { type: "GET_POSTS", payload: posts };
    const state = postReducer(undefined, action);

    expect(state).toEqual([...posts]);
  });

  it("should delete a post", () => {
    let action = { type: "DELETE_POST", payload: posts[0]._id };
    const state = postReducer(posts, action);

    expect(state).toEqual([posts[1]]);
  });

  it("should not delete a post if no id provided", () => {
    let action = { type: "DELETE_POST", payload: -1 };
    const state = postReducer(posts, action);

    expect(state).toEqual([...posts]);
  });

  it("should update a post", () => {
    let title = "Updated";
    let data = {
      postId: posts[0]._id,
      data: {
        title,
      },
    };
    let action = { type: "EDIT_POST", payload: data };
    const state = postReducer(posts, action);

    expect(state[0].title).toEqual(title);
  });

  it("should not update a post if no id is provided", () => {
    let title = "Updated";
    let data = {
      postId: -1,
      data: {
        title,
      },
    };
    let action = { type: "EDIT_POST", payload: data };
    const state = postReducer(posts, action);

    expect(state).toEqual(posts);
  });
});
