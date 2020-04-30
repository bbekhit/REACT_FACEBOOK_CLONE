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
      border: "1px solid #4f34ff",
    },
  },
}));

const CssTextField = withStyles(theme => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.common.mainBlue,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.common.mainBlue,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.common.mainBlue,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.common.mainBlue,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.common.mainBlue,
      },
    },
  },
}))(TextField);

export const PostForm = ({ onSubmit, auth, post }) => {
  const [values, setValues] = useState({
    title: post ? post.title : "",
    body: post ? post.body : "",
  });
  const [errors, setErrors] = useState({
    titleError: "",
    bodyError: "",
  });
  const { title, body } = values;
  const { titleError, bodyError } = errors;
  const classes = useStyles();
  const theme = useTheme();

  const onChange = event => {
    let valid;
    switch (event.target.id) {
      case "title":
        setValues({ ...values, title: event.target.value });
        valid = /^$/.test(event.target.value);
        if (valid) {
          setErrors({ ...errors, titleError: "Title required" });
        } else {
          setErrors({ ...errors, titleError: "" });
        }
        break;
      case "body":
        setValues({ ...values, body: event.target.value });
        valid = /^$/.test(event.target.value);
        if (valid) {
          setErrors({
            ...errors,
            bodyError: "Post is required",
          });
        } else {
          setErrors({ ...errors, bodyError: "" });
        }
        break;
      default:
        break;
    }
  };

  const onSubmitForm = e => {
    e.preventDefault();
    const postData = {
      ...values,
      postedBy: auth.user.name,
    };
    onSubmit(postData);
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
              error={!!titleError}
              helperText={titleError}
              className={classes.margin}
              label="Title"
              variant="outlined"
              id="title"
              fullWidth
              InputProps={{
                className: classes.inputColor,
              }}
              InputLabelProps={{
                style: {
                  color: theme.palette.common.mainBlue,
                },
              }}
              onChange={onChange}
              value={title}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
              inputProps={{
                id: "titleInput",
              }}
            />
          </Grid>
          <Grid item>
            <CssTextField
              error={!!bodyError}
              helperText={bodyError}
              className={classes.margin}
              label="Enter your post here..."
              variant="outlined"
              id="body"
              fullWidth
              multiline
              rows={10}
              InputProps={{
                className: classes.inputColor,
              }}
              InputLabelProps={{
                style: {
                  color: theme.palette.common.mainBlue,
                },
              }}
              onChange={onChange}
              value={body}
              // inputProps={{ style: { fontFamily: 'nunito', color: 'white'}}}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.btn}
              onClick={onSubmitForm}
              disabled={!!titleError || !title || !!bodyError || !body}
              id="btn"
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
  auth: state.auth,
});
export default connect(mapStateToProps)(PostForm);
