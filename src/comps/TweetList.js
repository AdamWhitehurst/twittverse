import React from "react";
import { textToHTMLLink, bigImage, julianToDate } from "../utils/text";
import {
  TweetItemList,
  TweetItem,
  HorizontalGroup,
  VerticalGroup,
  UserPhoto,
  DisplayTextSmall,
  Subtitle,
  TweetText,
  TweetDivider
} from "./TweetCardParts";

function TweetList({ timeline }) {
  const tweetToListItem = tweet => (
    // Parse tweet into a pretty.
    <TweetItem key={tweet.id}>
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
    </TweetItem>
  );

  return (
    <TweetItemList>
      {// For each tweet, if retweeted, parse that instead.
      timeline.map(tweet =>
        tweet.retweeted
          ? tweetToListItem(tweet.retweeted_status.user)
          : tweetToListItem(tweet)
      )}
    </TweetItemList>
  );
}

export default TweetList;
