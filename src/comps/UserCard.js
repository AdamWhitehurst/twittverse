import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import TwittSocket from "./TwittSocket";
import { Typography, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";

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
  }
});

function UserCard(props) {
  const { classes } = props;

  const renderLoginButton = socket => {
    return (
      <StyledCard>
        <StyledButton onClick={socket.login}>
          <PersonAddIcon className={classes.leftIcon} />
          Connect Account
        </StyledButton>
      </StyledCard>
    );
  };
  const renderTimeline = timeline => {
    return timeline.map(tweet => (
      <ListItem key={tweet.id}>
        <Typography varient="">{tweet.text}</Typography>
      </ListItem>
    ));
  };
  const renderUser = socket => {
    return (
      <StyledCard>
        <Typography variant="h5">{socket.user.profile.displayName}</Typography>
        <StyledButton onClick={socket.logout}>
          <PersonOutlineIcon className={classes.leftIcon} />
        </StyledButton>
        {socket.timeline && (
          <List subheader={<ListItem />}>
            {renderTimeline(socket.timeline)}
          </List>
        )}
      </StyledCard>
    );
  };

  return (
    <TwittSocket
      render={socket => {
        return socket.user !== null
          ? renderUser(socket)
          : renderLoginButton(socket);
      }}
    />
  );
}

const StyledCard = withStyles(styles)(props => (
  <Card square raised className={props.classes.card}>
    {props.children}
  </Card>
));

const StyledButton = props => (
  <Button disableRipple fullWidth onClick={props.onClick}>
    {props.children}
  </Button>
);

export default withStyles(styles)(UserCard);
