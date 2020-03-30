import React, { useState } from "react";
import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/postActions";
import { closeModal } from "../../redux/actions/modalActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmModal = props => {
  const [open, setOpen] = useState(props.isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action can't be undone, all deleted posts can't be retreived
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              props.closeModal();
            }}
            color="primary"
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              handleClose();
              props.deletePost(props.postId);
              props.closeModal();
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, { deletePost, closeModal })(ConfirmModal);
