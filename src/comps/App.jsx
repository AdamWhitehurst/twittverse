import React, { useState } from "react";
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

const App = ({ classes }) => {
  const [showing, setShowing] = useState("Profile");

  const exitApp = () => {
    window.close();
  };

  const minimize = () => {
    require("electron")
      .remote.BrowserWindow.getFocusedWindow()
      .minimize();
  };

  const headerButtons = [
    {
      text: "Profile",
      onClick: () => {
        setShowing("Profile");
      }
    },
    {
      text: "Users",
      onClick: () => {
        setShowing("Users");
      }
    },
    {
      text: "Topics",
      onClick: () => {
        setShowing("Topics");
      }
    }
  ];

  return (
    <div className={classes.app}>
      <MuiThemeProvider theme={MUITheme}>
        <TopBar
          headerButtons={headerButtons}
          onExit={exitApp}
          onMinimize={minimize}
        />
        <UserCard showing={showing === "Profile"} />
        <SearchCard user showing={showing === "Users"} />
        <SearchCard showing={showing === "Topics"} />
      </MuiThemeProvider>
    </div>
  );
};

export default withStyles(styles)(App);
