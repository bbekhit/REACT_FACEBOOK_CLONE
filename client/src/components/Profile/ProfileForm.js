import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  btn: {
    ...theme.typography.submitBtn,
    width: "100%",
    "&:hover": {
      background: theme.palette.common.whiteColor,
      color: theme.palette.common.mainBlue,
      border: "1px solid #4f34ff"
    }
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

const ProfileForm = ({ onSubmit, auth, profile }) => {
  const [values, setValues] = useState({
    phone: profile ? profile.phone : "",
    address: profile ? profile.address : "",
    gender: profile ? profile.gender : ""
  });
  const [errors, setErrors] = useState({
    phoneError: "",
    addressError: "",
    genderError: ""
  });
  const { phone, address, gender } = values;
  const { phoneError, addressError, genderError } = errors;
  const classes = useStyles();
  const theme = useTheme();

  const onChange = event => {
    let valid;
    switch (event.target.id) {
      case "phone":
        setValues({ ...values, phone: event.target.value });
        valid = /^$/.test(event.target.value);
        if (valid) {
          setErrors({ ...errors, phoneError: "Phone is required" });
        } else {
          setErrors({ ...errors, phoneError: "" });
        }
        break;
      case "address":
        setValues({ ...values, address: event.target.value });
        valid = /^$/.test(event.target.value);
        if (valid) {
          setErrors({
            ...errors,
            addressError: "Address is required"
          });
        } else {
          setErrors({ ...errors, addressError: "" });
        }
        break;
      case "gender":
        setValues({ ...values, gender: event.target.value });
        valid = /^$/.test(event.target.value);
        if (valid) {
          setErrors({
            ...errors,
            genderError: "Gender is required"
          });
        } else {
          setErrors({ ...errors, genderError: "" });
        }
        break;
      default:
        break;
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const profileData = {
      ...values
    };
    onSubmit(profileData);
  };

  return (
    <div>
      <Grid container>
        <Grid
          item
          container
          direction="column"
          spacing={2}
          style={{ width: "75vw", margin: "0 auto" }}
        >
          <Grid item>
            <CssTextField
              error={!!phoneError}
              helperText={phoneError}
              className={classes.margin}
              label="Phone"
              variant="outlined"
              id="phone"
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
              value={phone}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
            />
          </Grid>
          <Grid item>
            <CssTextField
              error={!!addressError}
              helperText={addressError}
              className={classes.margin}
              label="Address"
              variant="outlined"
              id="address"
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
              value={address}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
            />
          </Grid>
          <Grid item>
            <CssTextField
              error={!!genderError}
              helperText={genderError}
              className={classes.margin}
              label="Gender"
              variant="outlined"
              id="gender"
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
              value={gender}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
            />
          </Grid>

          <Grid item>
            <Button
              className={classes.btn}
              onClick={onSubmitForm}
              disabled={
                !!phoneError ||
                !phone ||
                !!addressError ||
                !address ||
                !!genderError ||
                !gender
              }
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ProfileForm);
