import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { signup } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.flexCenter,
    height: "70vh"
  },
  link: {
    ...theme.link,
    marginLeft: "1rem"
  }
}));

function AccountActivate({
  signup,
  match: {
    params: { token }
  }
}) {
  useEffect(() => {
    let decoded = jwt.decode(token);
    const { name, email, password } = decoded;
    signup({ name, email, password });
  }, [signup, token]);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h2">
        Thank you for confirming your account{" "}
      </Typography>
      <Typography variant="h2">
        <Link className={classes.link} to="/login">
          {" "}
          Sign in
        </Link>
      </Typography>
    </div>
  );
}

export default connect(null, { signup })(withRouter(AccountActivate));
