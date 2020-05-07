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
import AddPost from "./components/Post/AddPost";
import PostList from "./components/Post/PostList";
import ModalManager from "./components/Modal/ModalManager";
import EditPost from "./components/Post/EditPost";
import Profile from "./components/Profile/Profile";
import AddProfile from "./components/Profile/AddProfile";
import Profiles from "./components/Profile/Profiles";
import ToFollow from "./components/Profile/ToFollow";
import Comments from "./components/Post/Comments";
import PostListDND from "./components/Post/PostListDND";

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
          <ModalManager />
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
            <Route
              path="/auth/account/activate/:token"
              exact
              component={AccountActivate}
            />
            <Route exact path="/create-post" component={AddPost} />
            <Route exact path="/edit/:id" component={EditPost} />
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/dnd" component={PostListDND} />
            <Route exact path="/me" component={Profile} />
            <Route exact path="/create-profile" component={AddProfile} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/toFollow" component={ToFollow} />
            <Route exact path="/toFollow" component={ToFollow} />
            <Route exact path="/post/:id" component={Comments} />
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
