import React from "react";
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
import TweetBar from "./TweetBar";
import { bigImage } from "../utils/text";

export const renderLoginButton = socket => (
  <EmptyView>
    <TweetButton onClick={socket.login}>
      <ButtonText>Connect Account</ButtonText>
    </TweetButton>
  </EmptyView>
);

export const renderUserHeader = socket => (
  <HorizontalGroup>
    <UserPhoto big src={bigImage(socket.user.profile.photos[0].value)} />
    <VerticalGroup>
      <DisplayText>{socket.user.profile.displayName}</DisplayText>
      <MiniButton onClick={injectedComponent.call}>
        <ButtonText>Tweet</ButtonText>
      </MiniButton>
      <MiniButton onClick={socket.logout}>
        <ButtonText>Logout</ButtonText>
      </MiniButton>
    </VerticalGroup>
  </HorizontalGroup>
);

export const renderUser = socket => (
  <UserCardView>
    {renderUserHeader(socket)}
    <TweetBar />
    {socket.error !== null && renderError(socket.error)}
    {socket.notification !== null && renderError(socket.notification)}
    {socket.timeline !== null && socket.timeline !== undefined && (
      <TweetList timeline={socket.timeline} />
    )}
  </UserCardView>
);
