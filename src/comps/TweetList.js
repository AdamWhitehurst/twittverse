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
  TweetText
} from "./TweetCardParts";

function TweetList({ timeline }) {
  const parseTweet = tweet => {
    let parsedTweet = {
      id: tweet.id,
      text: textToHTMLLink(tweet.full_text || tweet.text)
    };
    if (tweet.retweeted) {
      parsedTweet.img = bigImage(tweet.retweeted_status.user.profile_image_url);
      parsedTweet.userName = tweet.retweeted_status.name;
      parsedTweet.date = julianToDate(tweet.retweeted_status.created_at);
    } else {
      parsedTweet.img = bigImage(tweet.user.profile_image_url);
      parsedTweet.userName = tweet.user.name;
      parsedTweet.date = julianToDate(tweet.created_at);
    }

    return tweetToListItem(parsedTweet);
  };
  const tweetToListItem = tweet => (
    // Parse tweet into a pretty.
    <TweetItem key={tweet.id}>
      <HorizontalGroup>
        <UserPhoto src={tweet.img} />
        <VerticalGroup>
          <DisplayTextSmall>{tweet.userName}</DisplayTextSmall>
          <Subtitle>{tweet.date}</Subtitle>
        </VerticalGroup>
      </HorizontalGroup>
      {/* Parse text of tweet into a pretty. */}
      <TweetText>{tweet.text}</TweetText>
    </TweetItem>
  );

  return (
    <TweetItemList>
      {// For each tweet, if retweeted, parse that instead.
      timeline.map(parseTweet)}
    </TweetItemList>
  );
}

export default TweetList;
