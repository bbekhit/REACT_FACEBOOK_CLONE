import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Landing from "../../components/Layout/Landing";

test("should render Landing page correctly", () => {
  const wrapper = shallow(<Landing />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
