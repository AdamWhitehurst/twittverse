import React from "react";
import TwittSocket from "./TwittSocket";
import { bigImage } from "../utils/text";
import {
  UserCardView,
  HorizontalGroup,
  VerticalGroup,
  UserPhoto,
  EmptyView,
  TweetButton,
  MiniButton,
  ButtonText,
  DisplayText
} from "./TweetCardParts";
import renderError from "./errorRenderer";
import TweetList from "./TweetList";
import TwittUser from "./TwittUser";

/**
 * @function`Renders a card which allows a user to sign into a Twitter account`
 */
function UserCard({ showing }) {
  const renderLoginButton = user => (
    <EmptyView>
      <TweetButton onClick={user.login}>
        <ButtonText>Connect Account</ButtonText>
      </TweetButton>
    </EmptyView>
  );

  const renderUserHeader = user => (
    <HorizontalGroup>
      <UserPhoto big src={bigImage(user.profile.photos[0].value)} />
      <VerticalGroup>
        <DisplayText>{user.profile.displayName}</DisplayText>
        <HorizontalGroup>
          <MiniButton onClick={user.getTimeline}>
            <ButtonText>Refresh</ButtonText>
          </MiniButton>
          <MiniButton onClick={user.toggleTweetBar}>
            <ButtonText>{user.tweeting ? "Close" : "Tweet"}</ButtonText>
          </MiniButton>
          <MiniButton onClick={user.logout}>
            <ButtonText>Logout</ButtonText>
          </MiniButton>
        </HorizontalGroup>
      </VerticalGroup>
    </HorizontalGroup>
  );

  const renderUser = user => (
    <UserCardView>
      {renderUserHeader(user)}
      {user.renderTweetBar()}
      {user.socket.error && renderError(user.socket.error)}
      {user.socket.notification && renderError(user.socket.notification)}
      {user.socket.timeline && <TweetList timeline={user.socket.timeline} />}
    </UserCardView>
  );

  return (
    <TwittUser
      render={user => {
        if (showing === true) {
          return user.auth !== null
            ? renderUser(user)
            : renderLoginButton(user);
        }
      }}
    />
  );
}
export default UserCard;
