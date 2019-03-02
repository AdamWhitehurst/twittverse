import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Typography, Divider, Avatar, List, ListItem } from "@material-ui/core";

const styles = theme => ({
  userCard: {
    display: "flex",
    flexDirection: "column"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  horizontalGroup: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    width: "100%"
  },
  verticalGroup: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 600
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.unit,
    width: 383
  },
  miniButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  buttonText: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${
      theme.palette.primary.dark
    } 90%)`,
    borderRadius: 0,
    border: 0,
    color: "white",
    padding: "1px 10px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  divider: {},
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  smallAvatar: {
    margin: 10
  },
  displayText: {
    fontWeight: "bold"
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "scroll",
    maxHeight: "84vh"
  }
});

export const HorizontalGroup = withStyles(styles)(({ children, classes }) => (
  <div className={classes.horizontalGroup}>{children}</div>
));

export const VerticalGroup = withStyles(styles)(({ children, classes }) => (
  <div className={classes.verticalGroup}>{children}</div>
));

export const EmptyView = withStyles(styles)(({ children, classes }) => (
  <Card square className={classes.empty}>
    {children}
  </Card>
));
export const UserPhoto = withStyles(styles)(({ src, big, classes }) =>
  big !== undefined ? (
    <Avatar className={classes.bigAvatar} src={src} />
  ) : (
    <Avatar className={classes.smallAvatar} src={src} />
  )
);
export const TweetDivider = withStyles(styles)(({ classes }) => (
  <Divider variant="fullWidth" className={classes.divider} />
));

export const UserCardView = withStyles(styles)(({ children, classes }) => (
  <Card square className={classes.userCard}>
    {children}
  </Card>
));
export const TweetCard = withStyles(styles)(({ children, classes }) => (
  <Card square raised className={classes.card}>
    {children}
  </Card>
));

export const TweetButton = withStyles(styles)(({ onClick, children }) => (
  <Button disableRipple onClick={onClick}>
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

export const ButtonText = withStyles(styles)(({ children, classes }) => (
  <Typography
    color="secondary"
    variant="caption"
    className={classes.buttonText}
  >
    {children}
  </Typography>
));

export const TweetText = withStyles(styles)(({ children }) => (
  <Typography
    variant="body2"
    dangerouslySetInnerHTML={{ __html: `${children}` }}
  />
));

export const DisplayText = withStyles(styles)(({ classes, children }) => (
  <Typography variant="h5" className={classes.displayText}>
    {children}
  </Typography>
));

export const DisplayTextSmall = withStyles(styles)(({ classes, children }) => (
  <Typography variant="subtitle1" className={classes.displayText}>
    {children}
  </Typography>
));

export const Subtitle = withStyles(styles)(({ classes, children }) => (
  <Typography variant="subtitle2">{children}</Typography>
));

export const TweetListItem = withStyles(styles)(({ classes, children }) => (
  <ListItem className={classes.listItem}>{children}</ListItem>
));
export const TweetList = withStyles(styles)(({ classes, children }) => (
  <List className={classes.list} subheader={<TweetListItem />}>
    {children}
  </List>
));
