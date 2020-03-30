import React from "react";
import PostForm from "./PostForm";
import { createPost } from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const AddPost = ({ createPost, history, auth: { isAuthenticated } }) => {
  const onSubmitAdd = async post => {
    let result = await createPost(post);
    if (result === "success") {
      history.push("/posts");
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div style={{ margin: "5rem auto" }}>
      <PostForm onSubmit={post => onSubmitAdd(post)} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { createPost })(AddPost);
