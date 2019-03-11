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
  With your respective keys and secrets inserted, of course.<br>
<b>Design Goals</b><br>
  This week-long was built with the intention of experimenting with web technologies within native applications. Moreover, it was excellent introductions to OAuth2 protocol. The necessary features are those listed above, as well as being to drag, drop, minimize, and run multiple windows at once. These features are a given in a native application, with the last being a tricky procedure due to the need for simulating one-and-only-one "backend server" for the passport authentication. However, this also makes it easy to extend the functionality to store and retrieve saved user sessions using a mongoDB server, if you so have one.<br>
 <b> Implementation Details </b><br>
   The use of Electron as a native application framework was straightforward and well-suited for this task, with the drawbacks being: there no way to safely store one's consumer api keys without first retrieving from an external server, as well as poor performance, but what do you expect from running javascript in a webview on an outdated chromium version inside windows?<br>
   The actual performance flaw is due to JavaScript itself. Since JavaScript (currently) implements every integer as a float, numbers only support up to 53 bits of information. This make JavaScript incapable of handling the common practice of 64-bit UID's, which the Twitter API implements to support timeline paging.<br>
   React is pleasant as ever to work with. The main drawbacks being the lack of babel. Many recent ECMAScript features were unavailable, and after a short attempt at implementing it, the interaction with electron-compile packages and the refactoring necessary turn out to be more time commitment than I had available in the week for this project.<br>
   The most obvious of these missing features will be public class fields, so ```this.function = this.function.bind(this)``` are rampant. I also miss my spread/rest operators, but it was a nice exercise to learn the old-fashion approaches. On the 'server' side (as electron-compile does its own transpilation of react), import/export statements were also not available.<br>
   I was able use common component patterns, like higher-order functions and render props, but in the end, React's newest feature of hooks was able to outperform both these patterns in terms of simplicity and performance. React hooks are used for the App component, render props are used in the Twittsocket and Twittuser compoents, and higher-order functions are implemented by Material-ui's package.<br>
<b>Conclusion</b><br>
  Overall, the application is successful in meeting its requirements, while the project as a whole was even more successful due to the knowledge gained. It is very important to know early on which version of ECMAScript are supported by your dependencies, since later implmentation and refactorization will be time-consuming. Moreover, security is not as high with a Native application using Javascript-simulated servers within the app. Thus for features using OAuth, it is best to communicate with a real server that has better security. <br>
</p>
