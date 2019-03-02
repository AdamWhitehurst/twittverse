import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import MinimizeIcon from "@material-ui/icons/Remove";

const styles = theme => ({
  appbar: {
    WebkitAppRegion: "drag"
  },
  toolbar: {
    display: "flex",
    flexDirection: "row-reverse",
    padding: 0,
    minHeight: 0,
    maxHeight: 20,
    WebkitAppRegion: "drag",
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 10%, ${
      theme.palette.primary.main
    } 100%)`
  },
  menuButton: {
    WebkitAppRegion: "no-drag",
    marginLeft: theme.spacing.unit / 10,
    marginRight: theme.spacing.unit / 10
  },
  exitButton: {
    WebkitAppRegion: "no-drag",
    float: "right",
    minHeight: 0,
    maxHeight: 20,
    padding: 2,
    marginLeft: theme.spacing.unit / 10,
    marginRight: theme.spacing.unit / 10
  },
  icon: {
    fontSize: "1rem"
  }
});

function UnstyledAppBar(props) {
  const { classes, onExit, onMinimize } = props;
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton
          className={classes.exitButton}
          aria-label="Exit"
          onClick={onExit}
        >
          <ClearIcon fontSize="small" className={classes.icon} />
        </IconButton>
        <IconButton
          className={classes.exitButton}
          aria-label="Minimize"
          onClick={onMinimize}
        >
          <MinimizeIcon fontSize="small" className={classes.icon} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(UnstyledAppBar);
