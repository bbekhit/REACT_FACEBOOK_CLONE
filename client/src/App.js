import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  setCurrentUser,
  resolveAuth,
  resetAuth,
} from "./redux/actions/authActions";
import store from "./redux/store";
import Main from "./Main";

function App() {
  // useEffect(() => {
  //   store.dispatch(resetAuth());
  //   if (localStorage.token) {
  //     store.dispatch(setCurrentUser(localStorage.token));
  //   } else {
  //     store.dispatch(resolveAuth());
  //   }
  // }, []);
  useEffect(() => {
    store.dispatch(resetAuth());
    setTimeout(() => {
      store.dispatch(resolveAuth());
    }, 300);
    if (localStorage.token) {
      store.dispatch(setCurrentUser(localStorage.token));
    }
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
