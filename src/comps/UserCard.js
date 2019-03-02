import React from "react";
import TwittSocket from "./TwittSocket";
import {
  UserCardView,
  HorizontalGroup,
  VerticalGroup,
  UserPhoto,
  TweetCard,
  TweetDivider,
  EmptyView,
  TweetButton,
  MiniButton,
  ButtonText,
  TweetText,
  DisplayText,
  DisplayTextSmall,
  Subtitle,
  TweetListItem,
  TweetList
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

  const bigImage = imgText => imgText.replace("_normal.jpg", ".jpg");
  const julianToDate = dateText => new Date(dateText).toDateString();

  const renderLoginButton = socket => (
    <EmptyView>
      <TweetButton onClick={socket.login}>
        <ButtonText>Connect Account</ButtonText>
      </TweetButton>
    </EmptyView>
  );

  const tweetToListItem = tweet => (
    // Parse tweet into a pretty.
    <TweetListItem key={tweet.id}>
      <HorizontalGroup>
        <UserPhoto src={bigImage(tweet.user.profile_image_url)} />
        <VerticalGroup>
          <DisplayTextSmall>{tweet.user.name}</DisplayTextSmall>
          <Subtitle>{julianToDate(tweet.created_at)}</Subtitle>
        </VerticalGroup>
      </HorizontalGroup>
      {/* Parse text of tweet into a pretty. */}
      <TweetText>{textToHTMLLink(tweet.full_text)}</TweetText>
      <TweetDivider />
    </TweetListItem>
  );
  const renderUserHeader = socket => (
    <HorizontalGroup>
      <UserPhoto big src={bigImage(socket.user.profile.photos[0].value)} />
      <VerticalGroup>
        <DisplayText>{socket.user.profile.displayName}</DisplayText>
        <MiniButton onClick={socket.logout}>
          <ButtonText>Logout</ButtonText>
        </MiniButton>
        <TweetDivider />
      </VerticalGroup>
      <TweetDivider />
    </HorizontalGroup>
  );
  const renderSocketError = error => (
    <HorizontalGroup>
      {/** String literal doesn't work here? */}
      <DisplayText>{"Error: " + error.message}</DisplayText>
    </HorizontalGroup>
  );

  const renderTimeline = timeline => (
    // For each tweet, if retweeted, parse that instead.
    <TweetList>
      {timeline.map(tweet =>
        tweet.retweeted
          ? tweetToListItem(tweet.retweeted_status.user)
          : tweetToListItem(tweet)
      )}
    </TweetList>
  );
  const renderUser = socket => (
    <UserCardView>
      {renderUserHeader(socket)}
      {socket.error !== null && renderSocketError(socket.error)}
      {socket.timeline !== null &&
        socket.timeline !== undefined &&
        renderTimeline(socket.timeline)}
    </UserCardView>
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
