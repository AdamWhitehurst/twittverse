import React from "react";
import MUITheme from "../utils/theme";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import UserCard from "./UserCard";
import InputBar from "./InputBar";
import SearchCard from "./SearchCard";

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: null,
      user: null
    };
    this.headerButtons = [
      {
        text: "User",
        onClick: () => {
          this.show("User");
        }
      },
      {
        text: "Search Users",
        onClick: () => {
          this.show("Search Users");
        }
      }
    ];
    this.setUser = this.setUser.bind(this);
    this.show = this.show.bind(this);
  }

  setUser(user) {
    this.setState({ user: user });
  }

  show(panel) {
    console.log("Changing to", panel);
    this.setState({ showing: panel });
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
          <AppBar
            headerButtons={this.headerButtons}
            onExit={this.exitApp}
            onMinimize={this.minimize}
          />
          <UserCard showing={this.state.showing === "User" ? true : false} />
          <SearchCard
            showing={this.state.showing === "Search Users" ? true : false}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
