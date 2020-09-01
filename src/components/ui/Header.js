import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import logo from "../../assets/logo.svg";
import { TextareaAutosize } from "@material-ui/core";
function ElevationScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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
    marginBottom: "0em",
  },
  logo: {
    height: "4em",
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
}));
function Header() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            <img alt="company logo" className={classes.logo} src={logo} />
            <Tabs className={classes.tabContainer}>
              <Tab className={classes.tab} label="Home"></Tab>
              <Tab className={classes.tab} label="Service"></Tab>
              <Tab className={classes.tab} label="The Revolution"></Tab>
              <Tab className={classes.tab} label="About us"></Tab>
              <Tab className={classes.tab} label="Contact us"></Tab>
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

export default Header;
