import React from "react";
import io from "socket.io-client";
import { API_URL } from "../lib/config";

export default function withOAuth(Component) {
  return class extends React.Component {
    constructor() {
      super();
      this.socket = io(API_URL);
      this.state = { user: {}, disabled: "", dummy: "DUMMY DATA" };
    }

    componentDidMount() {
      this.socket.on("twitter", user => {
        this.popup.close();
        this.setState({ user });
      });
    }
    checkPopup() {
      const check = setInterval(() => {
        const { popup } = this;
        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(check);
          this.setState({ disabled: "" });
        }
      }, 1000);
    }

    // Launches the popup by making a request to the server and then
    // passes along the socket id so it can be used to send back user
    // data to the appropriate socket on the connected client.
    openPopup() {
      const width = 400,
        height = 300;
      const left = window.innerWidth / 2;
      const top = window.innerHeight / 2;
      const url = `${API_URL}/twitter?socketId=${this.socket.id}`;

      return window.open(
        url,
        "",
        `location=no, directories=no, status=no, menubar=no,
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
      );
    }

    // Kicks off the processes of opening the popup on the server and listening
    // to the popup. It also disables the login button so the user can not
    // attempt to login to the provider twice.
    startAuth(e) {
      if (!this.state.disabled) {
        e.preventDefault();
        this.popup = this.openPopup();
        this.checkPopup();
        this.setState({ disabled: "disabled" });
      }
    }

    closeCard() {
      this.setState({ user: {} });
    }
    render() {
      return <Component {...this.state} />;
    }
  };
}
