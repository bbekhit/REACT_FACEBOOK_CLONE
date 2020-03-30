import React, { useEffect } from "react";
import PostForm from "./PostForm";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editPost, getPosts } from "../../redux/actions/postActions";

const EditPost = ({
  editPost,
  getPosts,
  post,
  history,
  auth: { isAuthenticated }
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const onSubmitEdit = async data => {
    let result = await editPost(data, post._id);
    if (result === "success") {
      history.push("/posts");
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <PostForm onSubmit={data => onSubmitEdit(data)} post={post} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  post: state.post.find(item => item._id === props.match.params.id),
  auth: state.auth
});
export default connect(mapStateToProps, { editPost, getPosts })(EditPost);
