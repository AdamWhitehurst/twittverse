<div align="center">
  <a href="https://electronjs.org/"><img src="https://terraine.com/wp-content/uploads/2017/02/electron-logo.png" height="96" width="96" /></a>
  <a href="https://reactjs.org/"><img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" height="96" width="96" /></a>
  <a href="http://www.passportjs.org/"><img src="https://cdn.glitch.com/project-avatar/0d184ee3-fd8d-4b94-acf4-b4e686e57375.png" height="96" width="96" /></a>
  <a href="https://material-ui.com/"><img src="https://material-ui.com/static/images/material-ui-logo.svg" height="96" width="96" /></a>
  <br>
  <h1>Twittverse</h1>
  <b>A simple desktop Twitter client using Electron, React, and Passport.js</b>
  <br>
  <img src="/imgs/Twittverse-0.3.0-1.png" height="300" width="200" />
  <img src="/imgs/Twittverse-0.3.0-2.png" height="300" width="200" />
  <img src="/imgs/Twittverse-0.3.0-3.png" height="300" width="200" />
  </div>
  <p align="justify">
  <b>Features</b>
  <br>
  1. Sign in to view your home timeline and post tweets
  <br>
  2. Search user timelines on the Users screen (no sign in required)
  <br>
  3. Search for keywords and topics on the Topics screen (no sign in required)
  <br>
    On the Users and Topics screen, one can also select how many tweets that want to display.
  
  <b> Building </b>
  <br>
  This app requires a ```config.js``` file to be placed within the ```src/lib/``` folder, [as well as a Twitter developer app so one can obtain a   twitter API consumer key, consumer secret, access token, and access secret.](https://developer.twitter.com/en/apps) The consumer key and secret are used to allow for application-user authentication, which means the app is able to allow users to sign in using the user's credentials and have the app post and recieve timelines as that user. Likewise, the access token and secret are used to allow the app to search topics and timelines for itself.
  The contents of ```config.js``` should be:
  ```javscript
  export const PORT = 8080;
  export const CALLBACK_URL = `http://127.0.0.1:${PORT}/twitter/callback`;
  export const TWITTER_KEY = "<YOUR CONSUMER KEY>";
  export const TWITTER_SECRET = "<YOUR CONSUMER SECRET>";
  export const ACCESS_TOKEN = "<YOUR ACCESS TOKEN>";
  export const ACCESS_TOKEN_SECRET = "<YOUR ACCESS TOKEN SECRET>";
  export const SESSION_SECRET = "TheSecretIsBaldBunnies";
  export const API_URL = `http://127.0.0.1:${PORT}`;

  export const TWITTER_CONFIG = {
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  callbackURL: CALLBACK_URL
  };
  ```
  With your respective keys and secrets inserted, of course.
      </p>
