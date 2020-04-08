import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./components/Spinner/Spinner";
import Landing from "./components/Layout/Landing";
import Login from "./components/Auth/Login";
import ResetPassword from "./components/Auth/ResetPassword";
import NewPassword from "./components/Auth/NewPassword";
import AcountActivate from "./components/Auth/AcountActivate";
import AddPost from "./components/Post/AddPost";
import EditPost from "./components/Post/EditPost";
import PostList from "./components/Post/PostList";
import Profile from "./components/Profile/Profile";
import AddProfile from "./components/Profile/AddProfile";
import Profiles from "./components/Profile/Profiles";
import ToFollow from "./components/Profile/ToFollow";
import Comments from "./components/Post/Comments";
import ProfileById from "./components/Profile/ProfileById";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/Theme";
import Header from "./components/Layout/Header";
import AlertComponent from "./components/Alert/AlertComponent";
import ModalManager from "./components/Modal/ModalManager";
import Signup from "./components/Auth/Signup";

const Main = withRouter(({ location, auth }) => {
  const [value, setValue] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const renderApp = auth => (
    <ThemeProvider theme={theme}>
      <div>
        {location.pathname !== "/login" && location.pathname !== "/signup" && (
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
            component={AcountActivate}
          />
          <Route exact path="/create-post" component={AddPost} />
          <Route exact path="/edit/:id" component={EditPost} />
          <Route exact path="/posts" component={PostList} />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/create-profile" component={AddProfile} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/toFollow" component={ToFollow} />
          <Route exact path="/post/:id" component={Comments} />
          <Route exact path="/profile/:id" component={ProfileById} />
        </Switch>
      </div>
    </ThemeProvider>
  );
  return <>{auth.isAuthResolved ? renderApp() : <Spinner />}</>;
});

const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Main);
