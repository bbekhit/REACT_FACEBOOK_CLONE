import React, { useEffect } from "react";
import {
  getProfiles,
  getCurrentProfile,
  addFollowing,
  removeFollowing
} from "../../redux/actions/profileActions";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "60%",
    textDecoration: "none"
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

const Profiles = ({
  getProfiles,
  getCurrentProfile,
  addFollowing,
  removeFollowing,
  profile: { profiles, currentProfile },
  auth: { user }
}) => {
  const classes = useStyles();
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
  }, [getProfiles, getCurrentProfile]);

  return (
    <Grid container>
      {profiles || profiles.length !== 0 ? (
        profiles.map((item, i) => (
          <Grid container justify="center" key={i}>
            <Card
              className={classes.top}
              component={Link}
              to={`/profile/${item._id}`}
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
                  {item.user.name}
                </Typography>

                <Typography variant="h5" component="h2">
                  Email
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.user.email}
                </Typography>
                <Typography variant="h5" component="h2">
                  Address
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.address}
                </Typography>
                <Typography variant="h5" component="h2">
                  Phone
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.phone}
                </Typography>
                {user._id === item.user._id ? null : (
                  <Button
                    className={classes.followBtn}
                    onClick={() => {
                      item.follower.includes(user._id)
                        ? removeFollowing(
                            user._id,
                            item._id,
                            item.user._id,
                            currentProfile._id
                          )
                        : addFollowing(
                            user._id,
                            item._id,
                            item.user._id,
                            currentProfile._id
                          );
                    }}
                    style={{
                      background: item.follower.includes(user._id)
                        ? "#c6feff"
                        : "transparent"
                    }}
                  >
                    {item.follower.includes(user._id) ? "Following" : "Follow"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Spinner />
      )}
    </Grid>
  );
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getProfiles,
  getCurrentProfile,
  addFollowing,
  removeFollowing
})(Profiles);
