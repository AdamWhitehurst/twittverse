import React from "react";
import MUITheme from "../utils/theme";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import TopBar from "./TopBar";
import UserCard from "./UserCard";
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
      showing: null
    };
    this.headerButtons = [
      {
        text: "Profile",
        onClick: () => {
          this.show("Profile");
        }
      },
      {
        text: "Users",
        onClick: () => {
          this.show("Users");
        }
      },
      {
        text: "Topics",
        onClick: () => {
          this.show("Topics");
        }
      }
    ];
    this.show = this.show.bind(this);
  }

  show(panel) {
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
    const { showing } = this.state;
    return (
      <div className={classes.app}>
        <MuiThemeProvider theme={MUITheme}>
          <TopBar
            headerButtons={this.headerButtons}
            onExit={this.exitApp}
            onMinimize={this.minimize}
          />
          <UserCard showing={showing === "Profile"} />
          <SearchCard user showing={showing === "Users"} />
          <SearchCard showing={showing === "Topics"} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
