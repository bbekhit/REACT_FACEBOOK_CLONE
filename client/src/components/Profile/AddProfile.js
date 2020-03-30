import React from "react";
import ProfileForm from "./ProfileForm";
import { createProfile } from "../../redux/actions/profileActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../redux/actions/alertActions";

const AddProfile = ({ createProfile, history, auth: { isAuthenticated } }) => {
  const onSubmitAdd = async profile => {
    let result = await createProfile(profile);
    if (result === "success") {
      history.push("/profiles");
      setAlert("Profile created successful", "success");
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div style={{ margin: "5rem auto" }}>
      <ProfileForm onSubmit={profile => onSubmitAdd(profile)} />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { createProfile })(AddProfile);
