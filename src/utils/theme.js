import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: {
    main: "#607d8b",
    light: "#8eacbb",
    dark: "#34515e",
    contrastText: "#000000"
  },
  secondary: {
    main: "#e0e0e0",
    light: "#ffffff",
    dark: "#aeaeae",
    contrastText: "#000000"
  }
};

const MUITheme = createMuiTheme({
  palette: palette,
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
    }
  },
  typography: { useNextVariants: true }
});

export default MUITheme;
