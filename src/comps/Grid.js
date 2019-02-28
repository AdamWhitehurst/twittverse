import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    margin: 0,
    backgroundColor: theme.palette.secondary.main
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main
  }
});

function UnstyledGrid(props) {
  const { classes } = props;

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={24}
    >
      {props.children}
      {props.children}
      {props.children}
      {props.children}
    </Grid>
  );
}

export default withStyles(styles)(UnstyledGrid);
