import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = () => {
  const styles = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    background: "rgba(0, 0, 0, 0.7)",
    zIndex: 1700,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div style={styles}>
      <CircularProgress style={{ zIndex: "1800" }} color="primary" />
    </div>
  );
};

export default Spinner;
