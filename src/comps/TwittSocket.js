import React from "react";
import io from "socket.io-client";
import { API_URL, TWITTER_SECRET, TWITTER_KEY } from "../lib/config";
import Twit from "twit";
import { union, uniq, property } from "underscore";

export default class TwittSocket extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(API_URL);
    this.state = {
      user: null,
      twit: null,
      error: null,
      timeline: null,
      disabled: false,
      login: this.startAuth.bind(this),
      logout: this.closeUser.bind(this)
    };
    this.setTimeline = this.setTimeline.bind(this);
    this.getNewTweets = this.getNewTweets.bind(this);
    this.initTimelinePoll = this.initTimelinePoll.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({ user: null, twit: null, timeline: null, error: null });
  }

  componentDidMount() {
    this.socket.on("twitter", user => {
      this.popup.close();
      this.setState({ user }, this.initTwit);
    });
  }

  initTwit() {
    let twit = new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      access_token: this.state.user.accessToken,
      access_token_secret: this.state.user.tokenSecret,
      timeout_ms: 60 * 1000
    });
    this.setState({ twit }, this.initTimelinePoll);
  }

  initTimelinePoll() {
    console.debug(this.state.user);
    this.getNewTweets();
    this.pollTimeline = setInterval(this.getNewTweets, 10000);
  }

  getNewTweets() {
    this.state.twit.get(
      "statuses/home_timeline",
      {
        user_id: this.state.user.profile.id,
        since_id: this.state.latestID,
        tweet_mode: "extended"
      },
      this.setTimeline
    );
  }

  setTimeline(err, data, resp) {
    // let err = [{ message: "Sorry, that page does not exist", code: 34 }];
    if (err) {
      console.debug("Timeline", err);
      this.setState({ error: err });
    } else {
      console.debug("Timeline data:", data);
      this.setState(prevState => {
        // Compose the unique union of the old timeline and the new data
        // using their id properties
        let newTL = uniq(
          union(prevState.timeline, data),
          false,
          property("id")
        );
        let latestID = newTL[0].id;
        let oldestID = newTL[newTL.length - 1].id;
        console.debug("New timeline:", newTL.length, latestID, oldestID);
        return {
          latestID: latestID,
          oldestID: oldestID,
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
  closeUser() {
    if (this.pollTimeline !== undefined) clearInterval(this.pollTimeline);
    this.resetState();
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}
