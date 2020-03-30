import { OPEN_MODAL, CLOSE_MODAL } from "../actions/types";

const initialState = null;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalName, modalProps } = action.payload;
      return {
        modalName: modalName,
        modalProps: modalProps
      };
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
