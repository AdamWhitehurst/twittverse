import React from "react";
import io from "socket.io-client";
import {
  API_URL,
  TWITTER_SECRET,
  TWITTER_KEY,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET
} from "../lib/config";
import Twit from "twit";
import { union, uniq, property } from "underscore";

const defaultParams = {
  tweet_mode: "extended"
};

const socket = io(API_URL);

export default class TwittSocket extends React.Component {
  constructor(props) {
    super(props);
    this.getTwit = this.getTwit.bind(this);
    this.getAuthTwit = this.getAuthTwit.bind(this);
    this.getUserTweets = this.getUserTweets.bind(this);
    this.search = this.search.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.setTimeline = this.setTimeline.bind(this);
    this.tweet = this.tweet.bind(this);
    this.notify = this.notify.bind(this);

    this.state = {
      io: socket,
      error: null,
      timeline: null,
      search: this.search,
      searchUser: this.searchUser,
      getUserTweets: this.getUserTweets,
      tweet: this.tweet
    };
  }

  getTwit() {
    return new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      access_token: ACCESS_TOKEN,
      access_token_secret: ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000
    });
  }

  getAuthTwit(accessToken, tokenSecret) {
    if (accessToken === undefined || tokenSecret === undefined) {
      console.debug(
        `Missing: accessToken ${accessToken}, tokenSecret ${tokenSecret})`
      );
      return this.getTwit();
    }

    return new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      access_token: accessToken,
      access_token_secret: tokenSecret,
      timeout_ms: 60 * 1000
    });
  }

  getUserTweets(at, ts) {
    this.getAuthTwit(at, ts).get(
      "statuses/home_timeline",
      defaultParams,
      this.setTimeline
    );
  }

  tweet(at, ts, msg) {
    console.debug("Sending tweet msg:", msg);
    this.getAuthTwit(at, ts).post(
      "statuses/update",
      { status: msg },
      this.notify
    );
  }

  notify(err, data, resp) {
    console.debug("Data", data);
    if (err) {
      console.debug("Notify", err);
      this.setState({ error: `Code ${err.code}: ${err.message}` });
    } else {
      this.setState({ error: null });

      setInterval(() => {
        this.setState({ notification: null });
      }, 2000);
    }
  }

  search(term, count) {
    let params = Object.assign({ q: term, count: count }, defaultParams);
    this.getTwit().get("search/tweets", params, this.setTimeline);
  }

  searchUser(name, count) {
    let params = Object.assign(
      { screen_name: name, count: count },
      defaultParams
    );
    this.getTwit().get("statuses/user_timeline", params, this.setTimeline);
  }

  setTimeline(err, data, resp) {
    // let err = [{ message: "Sorry, that page does not exist", code: 34 }];
    if (data.statuses) data = data.statuses;

    if (err) {
      console.debug("Timeline", err);
      this.setState({ error: `Code ${err.code}: ${err.message}` });
    } else {
      this.setState(prevState => {
        // Compose the unique union of the old timeline and the new data
        // using their id properties
        let newTL = uniq(
          union(data, prevState.timeline),
          false,
          property("id_str")
        );
        console.debug("New timeline:", newTL);
        return {
          timeline: newTL,
          error: null
        };
      });
    }
  }

  render() {
    // Basic render prop pattern
    return <div>{this.props.render(this.state)}</div>;
  }
}
