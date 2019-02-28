const passport = require("passport");
const { Strategy: TwitterStrategy } = require("passport-twitter");
const { TWITTER_CONFIG } = require("./config");

module.exports = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  // The function that is called when an OAuth provider sends back user
  // information.  Normally, you would save the user to the database here
  // in a callback that was customized for each provider.
  const callback = (accessToken, tokenSecret, profile, done) => {
    const user = { profile, accessToken, tokenSecret };
    done(null, user);
  };
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));
};
