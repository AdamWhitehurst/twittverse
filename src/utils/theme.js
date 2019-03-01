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
      text: {
        // Some CSS
        background: `linear-gradient(45deg, ${palette.primary.main} 30%, ${
          palette.primary.dark
        } 90%)`,
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
      }
    }
  },
  typography: { useNextVariants: true }
});

export default MUITheme;
