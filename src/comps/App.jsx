import React from "react";
import MUITheme from "../utils/theme";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import Grid from "./Grid";
import AppBar from "./AppBar";
import UserCard from "./UserCard";

const styles = {
  app: {
    display: "flex",
    height: "100vh"
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.exitApp = () => {
      window.close();
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <MuiThemeProvider theme={MUITheme}>
          <AppBar onExit={this.exitApp} />
          <Grid>
            <UserCard />
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
