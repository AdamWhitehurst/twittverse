import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { textChangeRangeNewSpan } from "typescript";

const styles = theme => ({
  grid: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 8,
    flexGrow: 1,
    overflowX: "scroll",
    backgroundColor: theme.palette.secondary.main
  }
});

function UnstyledGrid(props) {
  const { classes } = props;

  return (
    <Grid className={classes.grid} container direction="row" spacing={24}>
      {props.children}
    </Grid>
  );
}

export default withStyles(styles)(UnstyledGrid);
