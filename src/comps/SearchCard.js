import React from "react";
import TwittSocket from "./TwittSocket";
import TweetList from "./TweetList";
import InputBar from "./InputBar";

function SearchCard({ showing }) {
  return (
    <TwittSocket
      render={socket => {
        if (showing === true)
          return (
            <div>
              <InputBar onComplete={socket.search} />
              {socket.timeline && <TweetList timeline={socket.timeline} />}
            </div>
          );
      }}
    />
  );
}

export default SearchCard;
