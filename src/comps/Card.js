import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function MediaCard(props) {
  const { classes } = props;
  return <Card className={classes.card}>{props.dummy}</Card>;
}

export default withStyles(styles)(MediaCard);
