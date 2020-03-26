import React from "react";
import GoogleLogin from "react-google-login";
import { signinWithGoogle } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const GoogleLoginComponent = ({ signinWithGoogle, history }) => {
  const responseGoogle = async response => {
    // console.log(response);
    const tokenId = response.tokenId;
    const user = { tokenId };
    let result = await signinWithGoogle(user);
    if (result === "success") {
      history.push("/");
    }
  };
  return (
    <div>
      <div className="container">
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default connect(null, { signinWithGoogle })(
  withRouter(GoogleLoginComponent)
);
