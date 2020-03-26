import React, { useState, useEffect } from "react";
import { signout } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const ElevationScroll = props => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem"
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25rem"
    }
  },
  colorBtn: {
    background: theme.palette.common.myColor
  },
  logo: {
    height: "7rem",
    [theme.breakpoints.down("md")]: {
      height: "6rem"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5rem"
    }
  },
  tabsContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  logoContainer: {
    // padding: 0,
    "&:hover": {
      background: "transparent"
    }
  },
  menu: {
    background: theme.palette.common.mainBlue,
    borderRadius: 0
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.mainBlue,
    [theme.breakpoints.down("xs")]: {
      width: "60vw"
    }
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

const Header = props => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles(props);
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const routes = [
    { name: "Home", link: "/", activeIndex: 0, auth: "all" },
    { name: "Posts", link: "/posts", activeIndex: 1, auth: "all" }
  ];

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  useEffect(() => {
    [...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [props.value, routes, props]);

  const authTabs = (
    <Tab
      label="Logout"
      className={classes.tab}
      onClick={() => props.signout()}
    />
  );

  const notAuthTabs = [
    { label: "Login", to: "/login" },
    { label: "Sign Up", to: "/signup" }
  ].map(item => (
    <Tab
      label={item.label}
      className={classes.tab}
      component={Link}
      to={item.to}
      key={item.label}
    />
  ));
  const tabs = (
    <>
      <Tabs
        value={props.value}
        onChange={handleChange}
        aria-label="Header tabs"
        className={classes.tabsContainer}
      >
        <Tab label="Home" className={classes.tab} component={Link} to="/" />
        <Tab
          label="Posts"
          className={classes.tab}
          component={Link}
          to="/posts"
        />
        {props.auth.isAuthenticated ? authTabs : notAuthTabs}
      </Tabs>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {routes.map(route => (
            <ListItem
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        {props.auth.isAuthenticated ? (
          <ListItem
            className={classes.drawerItem}
            onClick={() => props.signout()}
            button
            divider
            classes={{ selected: classes.drawerItemSelected }}
          >
            <ListItemText
              className={classes.drawerItem}
              style={{ color: "red" }}
            >
              Logout
            </ListItemText>
          </ListItem>
        ) : (
          [
            { name: "Login", link: "/login", activeIndex: 2, auth: false },
            { name: "Sign Up", link: "/signup", activeIndex: 3, auth: false }
          ].map(route => (
            <ListItem
              divider
              key={`${route}${route.activeIndex}`}
              button
              component={Link}
              to={route.link}
              selected={props.value === route.activeIndex}
              classes={{ selected: classes.drawerItemSelected }}
              onClick={() => {
                setOpenDrawer(false);
                props.setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem}>
                {route.name}
              </ListItemText>
            </ListItem>
          ))
        )}
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );
  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => props.setValue(0)}
              disableRipple
            >
              MyFaceApp
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signout })(Header);
