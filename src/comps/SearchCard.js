import React from "react";
import renderError from "./errorRenderer";
import TwittSocket from "./TwittSocket";
import TweetList from "./TweetList";
import InputBar from "./InputBar";
import { Divider } from "@material-ui/core";

function SearchCard({ showing, user }) {
  return (
    <TwittSocket
      render={socket => {
        if (showing === true)
          return (
            <div>
              <InputBar onComplete={user ? socket.searchUser : socket.search} />
              {socket.error && renderError(socket.error)}
              <Divider />
              {socket.timeline && <TweetList timeline={socket.timeline} />}
            </div>
          );
      }}
    />
  );
}

export default SearchCard;
