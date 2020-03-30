import React from "react";
import img1 from "../../assets/landing-1.svg";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Landing = () => {
  return (
    <Grid
      container
      style={{
        minHeight: "100vh",
        background: "#c6feff",
        marginTop: "-3rem",
        padding: "2rem"
      }}
      justify="space-around"
      alignItems="center"
    >
      <Grid item sm>
        <Typography variant="h3" color="primary">
          Welcome to the, PARTY
        </Typography>
      </Grid>
      <Grid item sm>
        <img
          src={img1}
          alt="landing"
          style={{ height: "100%", width: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Landing;
