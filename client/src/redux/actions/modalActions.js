import { OPEN_MODAL, CLOSE_MODAL } from "./types";

export const openModal = (modalName, modalProps) => {
  return {
    type: OPEN_MODAL,
    payload: {
      modalName,
      modalProps
    }
  };
};
export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
