import React from "react";
import { connect } from "react-redux";
import ConfirmModal from "./ConfirmModal";

const modalList = {
  ConfirmModal
};

const ModalManager = ({ currentModal }) => {
  let renderedModal;
  if (currentModal) {
    const { modalProps, modalName } = currentModal;
    const ModalComponent = modalList[modalName];
    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <div>{renderedModal}</div>;
};

const mapStateToProps = state => ({
  currentModal: state.modal
});
export default connect(mapStateToProps)(ModalManager);
