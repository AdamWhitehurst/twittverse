import React from "react";
import { API_URL } from "../lib/config";
import TwittSocket from "./TwittSocket";
import { Input, MiniButton, ButtonText, VerticalGroup } from "./TweetCardParts";

export default class TwittUser extends React.Component {
  constructor(props) {
    super(props);

    this.resetState = this.resetState.bind(this);
    this.toggleTweetBar = this.toggleTweetBar.bind(this);
    this.sendTweet = this.sendTweet.bind(this);
    this.updateMsg = this.updateMsg.bind(this);
    this.checkPopup = this.checkPopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.startAuth = this.startAuth.bind(this);
    this.finishAuth = this.finishAuth.bind(this);
    this.mergeState = this.mergeState.bind(this);

    this.state = {
      auth: null,
      profile: null,
      disabled: false,
      tweeting: false,
      logout: this.resetState,
      toggleTweetBar: this.toggleTweetBar
    };
  }

  resetState() {
    this.setState({
      auth: null,
      profile: null,
      tweeting: false,
      tweetMsg: null
    });
  }

  toggleTweetBar() {
    this.setState(prevState => ({ tweeting: !prevState.tweeting }));
  }

  updateMsg(event) {
    this.setState({ tweetMsg: event.target.value });
  }

  sendTweet(user) {
    this.toggleTweetBar();
    user.sendTweet(this.state.tweetMsg);
  }

  checkPopup() {
    // Set an interval to check whether OAuth window has somehow
    // been closed before completing Sign in
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: false });
      }
    }, 1000);
  }

  openPopup(url) {
    // Open OAuth popup window
    const width = 400;
    const height = 300;
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

  startAuth(socketId) {
    // Only initiate if OAuth window not already open
    if (!this.state.disabled) {
      // Compose the callback url that this socket will listen to
      const url = `${API_URL}/twitter?socketId=${socketId}`;
      this.popup = this.openPopup(url);
      this.checkPopup();
      this.setState({ disabled: true });
    }
  }

  finishAuth(user) {
    // Close OAuth window
    this.popup.close();
    // Save auth credentials into this state
    this.setState({
      auth: {
        accessToken: user.accessToken,
        tokenSecret: user.tokenSecret
      },
      profile: user.profile
    });
  }

  mergeState(socket) {
    // Merge this state and Twittsocket state into user state
    let user = this.state;
    user.socket = socket;

    // Listen for auth events
    user.socket.io.on("twitter", this.finishAuth);
    user.login = e => {
      e.preventDefault();
      this.startAuth(socket.io.id);
    };

    // Compose user actions that require auth
    user.getTimeline = () =>
      socket.getUserTweets(user.auth.accessToken, user.auth.tokenSecret);
    user.sendTweet = msg =>
      socket.tweet(user.auth.accessToken, user.auth.tokenSecret, msg);
    user.renderTweetBar = () => {
      if (!user.tweeting) return;
      return (
        <VerticalGroup>
          <Input onChange={this.updateMsg} />
          <MiniButton onClick={() => this.sendTweet(user)}>
            <ButtonText>SEND</ButtonText>
          </MiniButton>
        </VerticalGroup>
      );
    };

    return user;
  }

  render() {
    // Second-layer render prop
    return (
      <TwittSocket
        render={socket => {
          let user = this.mergeState(socket);
          return <div>{this.props.render(user)}</div>;
        }}
      />
    );
  }
}
