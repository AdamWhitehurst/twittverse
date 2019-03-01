import React from "react";
import TwittSocket from "./TwittSocket";
import { List, ListItem } from "@material-ui/core";
import {
  TweetCard,
  TweetButton,
  MiniButton,
  ButtonText,
  TweetText,
  DisplayText
} from "./TweetCardParts";

/**
 * @function`Renders a card which allows a user to sign into a Twitter account`
 */
function UserCard(props) {
  const textToHTMLLink = text =>
    // Parse text into html
    text
      // Replace newline characters with break tags
      .replace(/(\r\n|\n|\r)/gm, "<br/>")
      // Replace all @ mentions with external links
      .replace(
        /(https?:\/\/[^\s]+)/g,
        `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('$&');">$&</a>`
      )
      // Replace all http text with external links
      .replace(
        /[@]([\w]*)/g,
        `<a class="external-link" href="javascript:void(0);" onclick="require('electron').shell.openExternal('https://twitter.com/$&');">$&</a>`
      );

  const tweetTextToTypography = tweetText => (
    // Parse text of tweet into a pretty.
    <TweetText>{textToHTMLLink(tweetText)}</TweetText>
  );

  const renderLoginButton = socket => (
    <TweetCard>
      <TweetButton onClick={socket.login}>
        <ButtonText>Connect Account</ButtonText>
      </TweetButton>
    </TweetCard>
  );

  const tweetToListItem = tweet => (
    // Parse tweet into a pretty.
    <ListItem key={tweet.id}>{tweetTextToTypography(tweet.full_text)}</ListItem>
  );
  const renderUserTitle = socket => (
    <div>
      <DisplayText>{socket.user.profile.displayName}</DisplayText>
      <MiniButton onClick={socket.logout}>
        <ButtonText>Logout</ButtonText>
      </MiniButton>
    </div>
  );
  const renderTimeline = timeline =>
    // For each tweet, if retweeted, parse that.
    timeline.map(tweet =>
      tweet.retweeted
        ? tweetToListItem(tweet.retweeted_status)
        : tweetToListItem(tweet)
    );
  const renderUser = socket => (
    <TweetCard>
      {renderUserTitle(socket)}
      {socket.timeline && (
        <List subheader={<ListItem />}>{renderTimeline(socket.timeline)}</List>
      )}
    </TweetCard>
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
export default UserCard;
