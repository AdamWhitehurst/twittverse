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

export default class TwittSocket extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(API_URL);
    this.state = {
      user: null,
      error: null,
      timeline: null,
      disabled: false,
      login: this.startAuth.bind(this),
      logout: this.resetState.bind(this),
      search: this.search.bind(this),
      getUserTweets: this.getUserTweets.bind(this)
    };

    this.getTwit = this.getTwit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getUserTweets = this.getUserTweets.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.setTimeline = this.setTimeline.bind(this);
    this.checkPopup = this.checkPopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.startAuth = this.startAuth.bind(this);
  }

  componentDidMount() {
    this.socket.on("twitter", user => {
      this.popup.close();
      this.setState({ user }, this.getUserTweets);
    });
  }

  resetState() {
    this.setState({
      user: null,
      timeline: null,
      error: null
    });
  }

  getTwit() {
    let at = this.state.user ? this.state.user.accessToken : ACCESS_TOKEN;
    let ts = this.state.user
      ? this.state.user.tokenSecret
      : ACCESS_TOKEN_SECRET;

    return new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      access_token: at,
      access_token_secret: ts,
      timeout_ms: 60 * 1000
    });
  }

  getUserTweets() {
    this.getTwit().get(
      "statuses/home_timeline",
      defaultParams,
      this.setTimeline
    );
  }

  search(term, count) {
    this.getTwit().get(
      "search/tweets",
      Object.assign({ q: term, count: count }, defaultParams),
      this.setTimeline
    );
  }

  searchUser(name, count) {
    this.getTwit().get(
      "search/tweets",
      Object.assign({ screen_name: name, count: count }, defaultParams),
      this.setTimeline
    );
  }

  setTimeline(err, data, resp) {
    // let err = [{ message: "Sorry, that page does not exist", code: 34 }];
    if (data.statuses) data = data.statuses;

    if (err) {
      console.debug("Timeline", err);
      this.setState({ error: err });
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

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: false });
      }
    }, 1000);
  }

  openPopup(url) {
    const width = 400,
      height = 300;
    const left = window.innerWidth / 2;
    const top = window.innerHeight / 2;
    return window.open(
      url,
      "",
      `location=no, directories=no, status=no, menubar=no,
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth(e) {
    if (!this.state.disabled) {
      e.preventDefault();
      const url = `${API_URL}/twitter?socketId=${this.socket.id}`;
      this.popup = this.openPopup(url);
      this.checkPopup();
      this.setState({ disabled: true });
    }
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}
