import React from "react";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

const AlertComponent = props => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    props.alert !== null &&
    props.alert.alertMessage && (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={props.alert.id}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Slide}
        message={props.alert.alertMessage}
        ContentProps={{
          style: {
            background: props.alert.alertType === "error" ? "red" : "green"
          }
        }}
      />
    )
  );
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(AlertComponent);
