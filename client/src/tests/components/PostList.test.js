import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { PostList } from "../../components/Post/PostList";
import posts from "../mockData/mockData";

describe("Posts List", () => {
  let auth;

  beforeEach(() => {
    auth = {
      user: {
        isAuthenticated: true,
        _id: 1,
        name: "Bonny",
        email: "bonny@bonny.com",
      },
    };
  });

  it("should render a list of posts", () => {
    let wrapper = shallow(<PostList posts={posts} auth={auth} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("should render a spinner if no posts found of posts", () => {
    let wrapper = shallow(<PostList posts={[]} auth={auth} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
