import React, { useState } from "react";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { resetPassword } from "../../redux/actions/authActions";
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

const NewPassword = ({
  resetPassword,
  match: {
    params: { token }
  },
  history
}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  const onChange = event => {
    let valid;

    switch (event.target.id) {
      case "password":
        setPassword(event.target.value);
        valid = /^[a-zA-Z0-9]{6,}$/.test(event.target.value);

        if (!valid) {
          setPasswordError("At least 6 characters");
        } else {
          setPasswordError("");
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    const data = {
      resetPasswordLink: token,
      newPassword: password
    };
    let result = await resetPassword(data);
    if (result === "success") {
      history.push("/login");
    }
  };

  return (
    <Grid
      className={classes.container}
      container
      justify="center"
      direction="column"
      spacing={2}
      style={{ margin: "5rem auto" }}
    >
      <Grid item>
        <Typography variant="subtitle1" color="primary">
          Enter new password here
        </Typography>
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
          onChange={onChange}
          value={password}
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
          disabled={!!passwordError || !password}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect(null, { resetPassword })(NewPassword);
