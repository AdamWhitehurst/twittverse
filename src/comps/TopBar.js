import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import MinimizeIcon from "@material-ui/icons/Remove";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";

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
  headerbar: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    minHeight: 0,
    maxHeight: 20,
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 10%, ${
      theme.palette.secondary.main
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
  },
  headerButton: {
    WebkitAppRegion: "no-drag",
    margin: 8,
    padding: 1,
    paddingLeft: 3,
    paddingRight: 3
  },
  headerText: {
    borderRadius: 0,
    border: 0,
    fontWeight: "bold",
    color: theme.palette.primary.dark,
    padding: 0
  }
});

function TopBar(props) {
  const { classes, onExit, onMinimize, headerButtons } = props;

  const renderHeaderButtons = buttons =>
    buttons.map(btn => (
      <Button
        key={btn.text}
        className={classes.headerButton}
        aria-label={btn.text}
        onClick={btn.onClick}
      >
        <Typography className={classes.headerText}>{btn.text}</Typography>
      </Button>
    ));

  return (
    <AppBar position="relative" className={classes.appbar}>
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
      <Toolbar variant="dense" className={classes.headerbar}>
        {renderHeaderButtons(headerButtons)}
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(TopBar);
