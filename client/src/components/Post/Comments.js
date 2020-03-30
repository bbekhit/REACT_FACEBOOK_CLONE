import React, { useEffect, useState } from "react";
import {
  getPosts,
  addComment,
  deleteComment
} from "../../redux/actions/postActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Spinner from "../Spinner/Spinner";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.common.whiteColor
  },
  inline: {
    display: "inline",
    marginRight: "1rem"
  },
  wrapper: {
    width: "70vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw"
    },
    padding: "1rem",
    overflow: "hidden",
    margin: "1rem auto",
    ...theme.customBorder
  },
  btnContainer: {
    [theme.breakpoints.down("sm")]: {
      opacity: 1
    },
    opacity: 0
  },
  followBtn: {
    fontSize: ".5rem",
    textTransform: "uppercase",
    color: theme.palette.common.mainBlue,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.palette.common.mainBlue
  }
}));

const Comments = ({
  post,
  getPosts,
  addComment,
  deleteComment,
  auth: { user }
}) => {
  const [comment, setComment] = useState("");
  const onChange = e => {
    setComment(e.target.value);
  };
  const classes = useStyles();
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {post ? (
          <Grid container className={classes.wrapper}>
            <Grid item>
              <ListItem alignItems="flex-start" sm={8}>
                <ListItemAvatar>
                  <Avatar alt={post.postedBy} src="" />
                </ListItemAvatar>
                <ListItemText
                  primary={post.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {post.postedBy}
                      </Typography>
                      {post.body}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Grid>
          </Grid>
        ) : (
          <Spinner />
        )}
      </Grid>
      <Grid
        item
        className={classes.wrapper}
        container
        direction="column"
        spacing={2}
      >
        <TextField
          label="Comment"
          variant="outlined"
          id="comment"
          fullWidth
          onChange={onChange}
          value={comment}
          rows={5}
          style={{ marginBottom: ".5rem" }}
        ></TextField>
        <Button
          onClick={() => {
            addComment(comment, post._id);
            setComment("");
          }}
        >
          Add Comment
        </Button>
      </Grid>
      <Grid className={classes.wrapper} item>
        <List className={classes.root}>
          {post && post.comments.length !== 0
            ? post.comments.map((item, i) => (
                <Grid
                  container
                  direction="column"
                  className={classes.list}
                  key={`${item.name}-${i}`}
                >
                  <Grid item>
                    <ListItem alignItems="center" sm={8}>
                      <ListItemAvatar>
                        <Avatar alt={item.postedBy} src="" />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {item.postedBy}
                            </Typography>
                            {item.body}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </Grid>
                  <Grid
                    container
                    justify="flex-end"
                    style={{ paddingBottom: ".25rem" }}
                  >
                    <Grid item>
                      {user._id === item.user ? (
                        <Grid item container className={classes.btnContainer}>
                          <Grid
                            container
                            justify="flex-end"
                            style={{ cursor: "pointer" }}
                          >
                            <Grid
                              item
                              style={{ color: "blue" }}
                              component={Link}
                              to={`/edit/${item._id}`}
                            >
                              <EditOutlinedIcon />
                            </Grid>
                            <Grid
                              item
                              style={{ color: "red" }}
                              onClick={() => deleteComment(post._id, item._id)}
                            >
                              <DeleteOutlinedIcon />
                            </Grid>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              ))
            : "NO COMMENTS YET"}
        </List>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, props) => ({
  post: state.post.find(item => item._id === props.match.params.id),
  auth: state.auth
});
export default connect(mapStateToProps, {
  getPosts,
  addComment,
  deleteComment
})(Comments);
