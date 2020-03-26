import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { preSignup } from "../../redux/actions/authActions";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import login from "../../assets/login.svg";
import Spinner from "../Spinner/Spinner";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column"
    }
  },
  formContainer: {
    width: "80vw",
    borderColor: theme.palette.common.mainBlue,
    borderWidth: "2px",
    borderStyle: "solid",
    padding: "1.5rem",
    borderRadius: "1.5rem",
    [theme.breakpoints.down("md")]: {
      padding: ".5rem"
    },
    [theme.breakpoints.down("sm")]: {
      padding: "1.25rem"
    }
  },
  btn: {
    ...theme.typography.submitBtn,
    alignSelf: "flex-end",
    "&:hover": {
      background: theme.palette.common.whiteColor,
      color: theme.palette.common.mainBlue,
      border: "1px solid #4f34ff"
    }
  },
  inputColor: {
    color: theme.palette.common.mainBlue
  },
  image: {
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      height: "80%"
    }
  },
  link: {
    ...theme.link
  }
}));

const CssTextField = withStyles(theme => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.common.mainBlue
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.common.mainBlue
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.common.mainBlue
      },
      "&:hover fieldset": {
        borderColor: theme.palette.common.mainBlue
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.common.mainBlue
      }
    }
  }
}))(TextField);

const Signup = ({ preSignup, isAuthenticated }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: ""
  });
  const [loading, setLoading] = useState(false);
  const { name, email, password } = values;
  const { nameError, emailError, passwordError } = errors;
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const onChange = event => {
    let valid;

    switch (event.target.id) {
      case "email":
        setValues({ ...values, email: event.target.value });
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );
        if (!valid) {
          setErrors({ ...errors, emailError: "Invalid email" });
        } else {
          setErrors({ ...errors, emailError: "" });
        }
        break;
      case "name":
        setValues({ ...values, name: event.target.value });
        valid = /^[a-zA-Z0-9]{4,}$/.test(event.target.value);

        if (!valid) {
          setErrors({
            ...errors,
            nameError: "Name too short"
          });
        } else {
          setErrors({ ...errors, nameError: "" });
        }
        break;
      case "password":
        setValues({ ...values, password: event.target.value });
        valid = /^[a-zA-Z0-9]{6,}$/.test(event.target.value);

        if (!valid) {
          setErrors({
            ...errors,
            passwordError: "At least 6 characters"
          });
        } else {
          setErrors({ ...errors, passwordError: "" });
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = { name, email, password };
    await preSignup(data);
    setValues({
      email: "",
      name: "",
      password: ""
    });
    setLoading(false);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <IconButton aria-label="Home" component={Link} to="/">
            <HomeIcon color="primary" />
          </IconButton>
          <div className={classes.container}>
            <Grid
              container
              className={classes.formContainer}
              justify="space-around"
            >
              <Grid
                item
                sm={6}
                container
                direction="column"
                justify="center"
                spacing={4}
              >
                <Grid item>
                  <CssTextField
                    className={classes.margin}
                    error={!!nameError}
                    helperText={nameError}
                    label="Name"
                    variant="outlined"
                    id="name"
                    fullWidth
                    InputProps={{
                      className: classes.inputColor
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.common.mainBlue
                      }
                    }}
                    value={name}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item>
                  <CssTextField
                    className={classes.margin}
                    error={!!emailError}
                    helperText={emailError}
                    label="Email"
                    variant="outlined"
                    id="email"
                    fullWidth
                    InputProps={{
                      className: classes.inputColor
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.common.mainBlue
                      }
                    }}
                    value={email}
                    onChange={onChange}
                    // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
                  />
                </Grid>
                <Grid item>
                  <CssTextField
                    className={classes.margin}
                    error={!!passwordError}
                    helperText={passwordError}
                    label="Password"
                    variant="outlined"
                    id="password"
                    type="password"
                    fullWidth
                    InputProps={{
                      className: classes.inputColor
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.common.mainBlue
                      }
                    }}
                    value={password}
                    onChange={onChange}
                  />
                </Grid>
                <Grid
                  item
                  style={{
                    alignSelf: theme.floatRight
                  }}
                >
                  <Button
                    size={matchesMD ? "small" : "large"}
                    className={classes.btn}
                    onClick={onSubmit}
                    disabled={
                      !!nameError ||
                      !name ||
                      !!emailError ||
                      !email ||
                      !!passwordError ||
                      !password
                    }
                  >
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Have an account, please
                    <span>
                      {" "}
                      <Link className={classes.link} to="/login">
                        Login
                      </Link>{" "}
                    </span>
                    here
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.imageContainer} sm={6}>
                <img
                  src={login}
                  alt="login icon"
                  style={{ width: "100%", height: "100%" }}
                  className={classes.image}
                />
              </Grid>
            </Grid>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { preSignup })(Signup);
