import React from "react";
import { shallow, mount } from "enzyme";
import { createMount } from "@material-ui/core/test-utils";
import { ThemeProvider } from "@material-ui/core/styles";
import { PostForm, CssTextField } from "../../components/Post/PostForm";
import expenses from "../mockData/mockData";
import theme from "../../styles/Theme";

describe("Post Form", () => {
  // let mount;

  // beforeEach(() => {
  //   mount = createMount();
  // });

  // afterEach(() => {
  //   mount.cleanUp();
  // });

  // it("should set title on input change", () => {
  //   const wrapper = mount(<PostForm />);

  //   wrapper
  //     .find("#title")
  //     .at(0)
  //     .simulate("change", {
  //       target: { value: "New Comment" },
  //     });
  //   wrapper.update();

  //   expect(wrapper.find("#title").at(0).prop("value")).toEqual("New Comment");
  // });

  // it("should set title on input change", () => {
  //   let auth = {
  //     user: {
  //       isAuthenticated: true,
  //       _id: 1,
  //       name: "Bonny",
  //       email: "bonny@bonny.com",
  //     },
  //   };
  //   let formData = {
  //     title: expenses[0].title,
  //     body: expenses[0].body,
  //     postedBy: auth.user.name,
  //   };
  //   const onSubmitSpy = jest.fn();
  //   const wrapper = shallow(
  //     <PostForm expense={expenses[1]} onSubmit={onSubmitSpy} auth={auth} />
  //   );
  //   wrapper.find("#btn").simulate("click", {
  //     preventDefault: () => {},
  //   });

  //   expect(onSubmitSpy).toHaveBeenLastCalledWith(formData);
  // });
  const setup = () => {
    const props = {};

    const wrapper = shallow(
      // <ThemeProvider theme={theme}>
      <PostForm {...props} />
      // </ThemeProvider>
    );

    return {
      props,
      wrapper,
    };
  };

  test("Shows error message when input search is empty.", () => {
    const { wrapper, props } = setup();
    wrapper
      .find("#title")
      .props("inputProps")
      .id.simulate("change", {
        target: { value: "New Comment" },
      });
    wrapper.update();

    expect(wrapper.find("#title").prop("value")).toEqual("New Comment");
  });
});

// // console.log(wrapper.find("#title").debug());
// // console.log(wrapper.dive().find("#title"));
// https://stackoverflow.com/questions/38264715/how-to-pass-context-down-to-the-enzyme-mount-method-to-test-component-which-incl?rq=1
// https://material-ui.com/components/text-fields/#text-fields
// https://dev.to/sama/testing-material-ui-form-components-1cnh
