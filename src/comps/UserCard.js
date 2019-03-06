import React from "react";
import TwittSocket from "./TwittSocket";
import { bigImage } from "../utils/text";
import {
  UserCardView,
  HorizontalGroup,
  VerticalGroup,
  UserPhoto,
  TweetDivider,
  EmptyView,
  TweetButton,
  MiniButton,
  ButtonText,
  DisplayText
} from "./TweetCardParts";
import TweetList from "./TweetList";

/**
 * @function`Renders a card which allows a user to sign into a Twitter account`
 */
function UserCard({ showing }) {
  const renderLoginButton = socket => (
    <EmptyView>
      <TweetButton onClick={socket.login}>
        <ButtonText>Connect Account</ButtonText>
      </TweetButton>
    </EmptyView>
  );

  const renderUserHeader = socket => (
    <HorizontalGroup>
      <UserPhoto big src={bigImage(socket.user.profile.photos[0].value)} />
      <VerticalGroup>
        <DisplayText>{socket.user.profile.displayName}</DisplayText>
        <TweetDivider />
        <MiniButton onClick={socket.logout}>
          <ButtonText>Logout</ButtonText>
        </MiniButton>
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

  const renderUser = socket => (
    <UserCardView>
      {renderUserHeader(socket)}
      {socket.error !== null && renderSocketError(socket.error)}
      {socket.timeline !== null && socket.timeline !== undefined && (
        <TweetList timeline={socket.timeline} />
      )}
    </UserCardView>
  );

  return (
    <TwittSocket
      render={socket => {
        if (showing === true) {
          // If !socket.user, user has not signed in
          // So render login button
          return socket.user !== null
            ? renderUser(socket)
            : renderLoginButton(socket);
        }
      }}
    />
  );
}
export default UserCard;
