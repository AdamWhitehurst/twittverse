import React from "react";
import MUITheme from "../utils/theme";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import UserCard from "./UserCard";

const styles = {
  app: {
    paddingTop: 20,
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  }
};

class App extends React.Component {
  constructor() {
    super();
  }
  exitApp() {
    window.close();
  }
  minimize() {
    require("electron")
      .remote.BrowserWindow.getFocusedWindow()
      .minimize();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <MuiThemeProvider theme={MUITheme}>
          <AppBar onExit={this.exitApp} onMinimize={this.minimize} />
          <UserCard />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
