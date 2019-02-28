import React from "react";
import MUITheme from "../utils/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import withOAuth from "./OAuth";
import Grid from "./Grid";
import AppBar from "./AppBar";
import Card from "./Card";

const OAuthCard = withOAuth(Card);

class App extends React.Component {
  constructor() {
    super();
    this.exitApp = () => {
      window.close();
    };
  }
  render() {
    return (
      <MuiThemeProvider theme={MUITheme}>
        <AppBar onExit={this.exitApp} />
        <Grid>
          <OAuthCard />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
