import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { forgotPassword } from "../../redux/actions/authActions";
import { connect } from "react-redux";

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

const useStyles = makeStyles(theme => ({
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
  link: {
    ...theme.link
  },
  container: {
    height: "40vh",
    width: "80vw",
    borderRadius: "2rem",
    borderColor: theme.palette.common.mainBlue,
    borderStyle: "solid",
    margin: "0 auto",
    padding: "2rem"
  }
}));

const ResetPassword = ({ forgotPassword, history }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const onChange = event => {
    let valid;

    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailError("Invalid email");
        } else {
          setEmailError("");
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    let result = await forgotPassword({ email });
    if (result === "success") {
      setEmail("");
      history.push("/");
    }
  };

  return (
    <Grid
      className={classes.container}
      container
      justify="center"
      direction="column"
      spacing={2}
    >
      <Grid item>
        <Typography variant="subtitle1" color="primary">
          Enter Email to reset password
        </Typography>
      </Grid>
      <Grid item>
        <CssTextField
          error={!!emailError}
          helperText={emailError}
          className={classes.margin}
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
          onChange={onChange}
          value={email}
          // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
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
          disabled={!!emailError || !email}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(null, { forgotPassword })(ResetPassword);
