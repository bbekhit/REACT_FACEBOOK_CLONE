import React, { useEffect, useState } from "react";
import { getPosts, addLike, removeLike } from "../../redux/actions/postActions";
import { openModal } from "../../redux/actions/modalActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Spinner from "../Spinner/Spinner";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.common.whiteColor
  },
  inline: {
    display: "inline",
    marginRight: "1rem"
  },
  list: {
    ...theme.customBorder,
    borderRadius: "1rem",
    marginBottom: "1rem",
    textDecoration: "none",
    padding: ".5rem",
    color: "black",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer",
      "& $btnContainer": {
        opacity: 1
      }
    }
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

const PostList = ({
  getPosts,
  posts,
  addLike,
  removeLike,
  openModal,
  auth: { user }
}) => {
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(Infinity);
  const classes = useStyles();

  useEffect(() => {
    getPosts(skip, limit);
  }, [getPosts]);

  const loadMore = async () => {
    let newSkip = skip + limit;
    let size = await getPosts(newSkip, limit, posts);
    setSize(size);
    setSkip(newSkip);
  };

  return (
    <Grid container style={{ padding: "2rem" }} className={classes.wrapper}>
      <List className={classes.root}>
        {posts ? (
          posts.map((item, i) => (
            <Grid
              container
              direction="column"
              className={classes.list}
              key={`${item.name}-${i}`}
            >
              <Grid item>
                <ListItem alignItems="flex-start" sm={8}>
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
                justify="space-around"
                style={{ paddingBottom: ".25rem" }}
              >
                <Grid item>
                  <Button
                    component={Link}
                    to={`/post/${item._id}`}
                    className={classes.followBtn}
                  >
                    Comments
                  </Button>
                </Grid>
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
                          onClick={() =>
                            openModal("ConfirmModal", {
                              isOpen: true,
                              postId: item._id
                            })
                          }
                        >
                          <DeleteOutlinedIcon />
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                </Grid>
                <Grid item style={{ alignSelf: "center" }}>
                  <ThumbUpAltIcon
                    onClick={() => {
                      item.likes.includes(user._id)
                        ? removeLike(item._id)
                        : addLike(item._id);
                    }}
                    color={
                      item.likes.includes(user._id) ? "primary" : "inherit"
                    }
                  />
                  <span
                    style={{
                      marginLeft: "3px",
                      position: "relative",
                      bottom: "5px"
                    }}
                  >
                    {item.likes.length !== 0 ? item.likes.length : null}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          ))
        ) : (
          <Spinner />
        )}
      </List>
      <Grid container justify="flex-end">
        {size > 0 && size >= limit ? (
          <Button className={classes.followBtn} onClick={loadMore}>
            Load More
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getPosts,
  openModal,
  addLike,
  removeLike
})(PostList);
