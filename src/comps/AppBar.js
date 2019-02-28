import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";

const styles = theme => ({
  root: {
    minHeight: 48,
    WebkitAppRegion: "drag",
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  toolbar: {
    WebkitAppRegion: "drag"
  },
  menuButton: {
    WebkitAppRegion: "no-drag",
    marginLeft: theme.spacing.unit / 10,
    marginRight: theme.spacing.unit / 10
  },
  exitButton: {
    WebkitAppRegion: "no-drag",
    float: "right",
    marginLeft: theme.spacing.unit / 10,
    marginRight: theme.spacing.unit / 10
  }
});

function UnstyledAppBar(props) {
  const { classes, onExit } = props;
  return (
    <div id="root" className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense" className={classes.toolbar}>
          <IconButton
            disableRipple
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Twittverse
          </Typography>
          <IconButton
            disableRipple
            className={classes.exitButton}
            color="inherit"
            aria-label="Exit"
            onClick={onExit}
          >
            <ClearIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(UnstyledAppBar);
