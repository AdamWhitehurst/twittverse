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

/**
 * @function`Renders a card which allows a user to sign into a Twitter account`
 */
function UserCard(props) {
  const { classes } = props;

  const textToHTMLLink = text =>
    // Replace all @ mentions and http text with external links
    text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('$&');">$&</a>`
      )
      .replace(
        /[@]([\w]*)/g,
        `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('https://twitter.com/$&');">$&</a>`
      );

  const tweetTextToTypography = tweetText => (
    // Parse text of tweet into a pretty.
    <Typography
      variant="body1"
      dangerouslySetInnerHTML={{ __html: `${textToHTMLLink(tweetText)}` }}
    />
  );

  const renderLoginButton = socket => (
    //
    <StyledCard>
      <StyledButton onClick={socket.login}>
        <PersonAddIcon className={classes.leftIcon} />
        Connect Account
      </StyledButton>
    </StyledCard>
  );

  const tweetToListItem = tweet => (
    // Parse tweet into a pretty.
    <ListItem key={tweet.id}>{tweetTextToTypography(tweet.full_text)}</ListItem>
  );
  const renderTimeline = timeline =>
    // For each tweet, if retweeted, parse that.
    timeline.map(tweet =>
      tweet.retweeted
        ? tweetToListItem(tweet.retweeted_status)
        : tweetToListItem(tweet)
    );
  const renderUser = socket => (
    <StyledCard>
      <Typography variant="h5">{socket.user.profile.displayName}</Typography>
      <StyledButton onClick={socket.logout}>
        <PersonOutlineIcon className={classes.leftIcon} />
      </StyledButton>
      {socket.timeline && (
        <List subheader={<ListItem />}>{renderTimeline(socket.timeline)}</List>
      )}
    </StyledCard>
  );

  return (
    <TwittSocket
      render={socket =>
        // If !socket.user, user has not signed in
        // So render login button
        socket.user !== null ? renderUser(socket) : renderLoginButton(socket)
      }
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
