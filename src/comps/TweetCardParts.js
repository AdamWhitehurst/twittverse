import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.unit,
    width: 345
  },
  miniButton: {
    height: 30,
    width: 50
  }
});

export const TweetCard = withStyles(styles)(({ children, classes }) => (
  <Card square raised className={classes.card}>
    {children}
  </Card>
));

export const TweetButton = withStyles(styles)(({ onClick, children }) => (
  <Button disableRipple fullWidth onClick={onClick}>
    {children}
  </Button>
));

export const MiniButton = withStyles(styles)(
  ({ classes, children, onClick }) => (
    <Button
      size="small"
      className={classes.miniButton}
      disableRipple
      onClick={onClick}
    >
      {children}
    </Button>
  )
);

export const ButtonText = withStyles(styles)(({ children }) => (
  <Typography color="secondary" variant="caption">
    {children}
  </Typography>
));

export const TweetText = withStyles(styles)(({ children }) => (
  <Typography
    variant="body1"
    dangerouslySetInnerHTML={{ __html: `${children}` }}
  />
));

export const DisplayText = withStyles(styles)(({ children }) => (
  <Typography variant="h5">{children}</Typography>
));
