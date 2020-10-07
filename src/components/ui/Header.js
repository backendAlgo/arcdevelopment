import React, { useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import logo from "../../assets/logo.svg";
function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginRight: "25px",
    marginLeft: "50px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawer: {
    backgroundColor: theme.palette.common.blue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  drawerItemSelected: {
    opacity: 1,
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange,
  },
  tabButton: {
    opacity: 1,
  },
}));

//header-----
const Header = (props) => {
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(null);
    setSelectedIndex(index);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const tabButton = (
    <Button variant="contained" color="secondary" className={classes.button}>
      Free Estimate
    </Button>
  );
  const pathController = [
    { name: "home", link: "/", tabIndex: 0 },
    {
      name: "services",
      link: "/services",
      tabIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaHasPopUp: anchorEl ? true : undefined,
      onMouseOver: (event) => handleClick(event),
    },
    { name: "the revolution", link: "/revolution", tabIndex: 2 },
    { name: "about us", link: "/about", tabIndex: 3 },
    { name: "contact us", link: "/contact", tabIndex: 4 },
    {
      name: tabButton,
      link: "/estimate",
      tabIndex: 5,
      action: "button",
      classes: "tabButton",
    },
  ];

  const menuOptions = [
    { name: "Services", link: "/services", tabIndex: 1, menuIndex: 0 },
    {
      name: "Custom Software Development",
      link: "/customesoftware",
      tabIndex: 1,
      menuIndex: 1,
    },
    {
      name: "Mobile App Development",
      link: "/mobileapps",
      tabIndex: 1,
      menuIndex: 2,
    },
    {
      name: "Website Development",
      link: "/websites",
      tabIndex: 1,
      menuIndex: 3,
    },
  ];
  useEffect(() => {
    const currentLocation = window.location.pathname;
    [...pathController, ...menuOptions].forEach((route, index) => {
      switch (currentLocation) {
        case `${route.link}`:
          if (value !== route.tabIndex) setValue(route.tabIndex);
          if (route.menuIndex && route.menuIndex !== selectedIndex)
            setSelectedIndex(route.menuIndex);
          break;
        default:
          break;
      }
    });
  }, [value, selectedIndex, menuOptions, pathController]);

  //tabs-----
  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor={"primary"}
      >
        {pathController.map((route, index) => (
          <Tab
            key={index}
            className={
              route.classes === "tabButton"
                ? `${classes.tab} ${classes.tabButton}`
                : classes.tab
            }
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaHasPopUp}
            onMouseOver={route.onMouseOver}
          />
        ))}
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map((element, index) => {
          return (
            <MenuItem
              key={element.name}
              selected={index === selectedIndex && value === 1}
              onClick={(event) => {
                handleMenuItemClick(event, index);
                setValue(1);
                handleClose();
              }}
              component={Link}
              to={element.link}
              className={
                index === selectedIndex && value === 1
                  ? `${classes.tabButton}`
                  : null
              }
              classes={{ root: classes.menuItem }}
            >
              {element.name}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
  //end-tabs-----
  //drawer-----
  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        open={openDrawer}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
          {pathController.map(
            (route, index) =>
              index !== 5 && (
                <ListItem
                  key={`listitem-${index}`}
                  divider
                  button
                  component={Link}
                  to={route.link}
                  selected={value === route.tabIndex}
                  onClick={() => {
                    setOpenDrawer(false);
                    setValue(route.tabIndex);
                  }}
                >
                  <ListItemText
                    disableTypography
                    className={
                      value === route.tabIndex
                        ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                        : classes.drawerItem
                    }
                  >
                    {route.name}
                  </ListItemText>
                </ListItem>
              )
          )}
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            divider
            button
            component={Link}
            to="/estimate"
            selected={value === 5}
            className={classes.drawerItemEstimate}
          >
            <ListItemText
              disableTypography
              className={
                value === 5
                  ? `${classes.drawerItem} ${classes.drawerItemSelected}`
                  : classes.drawerItem
              }
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer((oldState) => setOpenDrawer(!oldState))}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              className={classes.logoContainer}
              onClick={() => {
                setValue(0);
              }}
            >
              <img src={logo} alt="company logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};
export default Header;
