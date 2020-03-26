import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setCurrentUser } from "./redux/actions/authActions";
import store from "./redux/store";
import theme from "./styles/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Layout/Header";
import Landing from "./components/Layout/Landing";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AccountActivate from "./components/Auth/AcountActivate";
import AlertComponent from "./components/Alert/AlertComponent";
import ResetPassword from "./components/Auth/ResetPassword";
import NewPassword from "./components/Auth/NewPassword";

const Main = withRouter(({ location }) => {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div>
          {location.pathname !== "/login" &&
            location.pathname !== "/signup" && (
              <Header
                value={value}
                setValue={setValue}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            )}
          <AlertComponent />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route
              exact
              path="/auth/password/reset/:token"
              component={NewPassword}
            />
            {/* <Route
              exact
              path="/auth/password/reset/:token"
              component={() => <>Hello</>}
            /> */}
            <Route
              path="/auth/account/activate/:token"
              exact
              component={AccountActivate}
            />
          </Switch>
        </div>
      </Provider>
    </ThemeProvider>
  );
});

function App() {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(setCurrentUser(localStorage.token));
    }
  }, []);
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
