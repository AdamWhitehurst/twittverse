import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {
  Typography,
  Divider,
  Avatar,
  List,
  ListItem,
  TextField
} from "@material-ui/core";

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
    paddingLeft: 0,
    marginLeft: theme.spacing.unit,
    width: 375,
    borderBottom: `1px solid ${theme.palette.secondary.dark}`
  },
  miniButton: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  buttonText: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 10%, ${
      theme.palette.primary.dark
    } 90%)`,
    borderRadius: 0,
    border: 0,
    color: "white",
    padding: "1px 10px",
    boxShadow: `0 3px 2px 1px ${theme.palette.primary.dark}50`
  },
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
    position: "relative",
    overflow: "scroll",
    maxHeight: "84vh"
  },
  input: {
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 3,
    flexGrow: 1
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

export const Input = withStyles(styles)(({ onChange, classes }) => (
  <TextField className={classes.input} onChange={onChange} />
));
export const UserPhoto = withStyles(styles)(({ src, big, classes }) =>
  big !== undefined ? (
    <Avatar className={classes.bigAvatar} src={src} />
  ) : (
    <Avatar className={classes.smallAvatar} src={src} />
  )
);

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

export const Subtitle = withStyles(styles)(
  ({ className, classes, children }) => (
    <Typography className={className} variant="subtitle2">
      {children}
    </Typography>
  )
);

export const TweetItem = withStyles(styles)(({ classes, children }) => (
  <ListItem className={classes.listItem}>{children}</ListItem>
));
export const TweetItemList = withStyles(styles)(({ classes, children }) => (
  <List className={classes.list}>{children}</List>
));
