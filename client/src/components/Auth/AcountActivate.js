import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { signup } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container className={classes.container}>
      <Grid item style={{ padding: "2rem" }}>
        <Typography
          variant="subtitle1"
          style={{ fontSize: matchesMD ? "1.5rem" : "3rem" }}
        >
          Thank you for confirming your account{" "}
          <span>
            <Link to="/login" className={classes.link}>
              {" "}
              Sign in
            </Link>
          </span>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default connect(null, { signup })(withRouter(AccountActivate));
