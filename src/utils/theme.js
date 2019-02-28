import { createMuiTheme } from "@material-ui/core/styles";

const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: "#607d8b"
    },
    secondary: {
      main: "#e0e0e0"
    },
    typography: {
      useNextVariants: true
    }
  }
});

export default MUITheme;
