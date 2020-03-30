import React, { useEffect } from "react";
import {
  getCurrentProfile,
  getToFollowing
} from "../../redux/actions/profileActions.js";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  top: {
    marginTop: "2rem",
    width: "60%"
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

const Profile = ({
  getCurrentProfile,
  profile: { currentProfile },
  getToFollowing
}) => {
  const classes = useStyles();
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div>
      {!currentProfile || Object.keys(currentProfile).length === 0 ? (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Card style={{ margin: "2rem auto", width: "75%" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Oops!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Looks that you didn't create a profile yet, please go ahead
                    and create one!
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to="/create-profile"
                >
                  Create profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Grid container justify="center">
            <Card
              className={classes.root}
              style={{ margin: "2rem auto", width: "75%" }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  Name
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {currentProfile.user.name}
                </Typography>

                <Typography variant="h5" component="h2">
                  Email
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {currentProfile.user.email}
                </Typography>
                <Typography variant="h5" component="h2">
                  Address
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {currentProfile.address}
                </Typography>
                <Typography variant="h5" component="h2">
                  Phone
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {currentProfile.phone}
                </Typography>
                {/* {!(user._id === item.user._id) ? null : ( */}
                <Grid
                  container
                  justify="space-between"
                  style={{ marginTop: ".5rem" }}
                >
                  <Button
                    className={classes.followBtn}
                    component={Link}
                    to="/create-post"
                  >
                    Post
                  </Button>
                  <Button
                    className={classes.followBtn}
                    component={Link}
                    to="/toFollow"
                    onClick={() => getToFollowing(currentProfile._id)}
                  >
                    People to follow
                  </Button>
                  <Button
                    className={classes.followBtn}
                    component={Link}
                    to="/me"
                  >
                    Followers
                  </Button>
                </Grid>
                {/* )} */}
              </CardContent>
            </Card>
          </Grid>
        </div>
      )}
    </div>
  );
};

const mapStateToPrps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToPrps, { getCurrentProfile, getToFollowing })(
  Profile
);
