import React from "react";
import io from "socket.io-client";
import { API_URL } from "../lib/config";
import Twit from "twit";

export default class TwittSocket extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(API_URL);
    this.state = {
      user: null,
      twit: null,
      disabled: false,
      login: this.startAuth.bind(this),
      logout: this.closeUser.bind(this)
    };
  }

  componentDidMount() {
    this.socket.on("twitter", user => {
      this.popup.close();
      this.setState({ user }, this.initTwit);
    });
  }

  initTwit() {
    let twit = new Twit({
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret: process.env.TWITTER_SECRET,
      access_token: this.state.user.accessToken,
      access_token_secret: this.state.user.tokenSecret,
      timeout_ms: 60 * 1000
    });
    this.setState({ twit }, this.getTimeline);
  }

  getTimeline() {
    this.state.twit.get(
      "statuses/user_timeline",
      { user_id: this.state.user.profile.id, tweet_mode: "extended" },
      this.setTimeline.bind(this)
    );
  }

  setTimeline(err, data, resp) {
    console.log(data);
    this.setState({ timeline: data });
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
    this.setState({ user: null, twit: null });
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}
