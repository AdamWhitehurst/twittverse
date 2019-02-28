const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = (req, res) => {
  const io = req.app.get("io");
  const user = {
    accessToken: req.user.accessToken,
    tokenSecret: req.user.tokenSecret,
    profile: Object.assign(
      { photos: req.user.profile.photos[0].value.replace(/_normal/, "") },
      req.user.profile
    )
  };
  console.log(user);
  io.in(req.session.socketId).emit("twitter", user);
};

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate("twitter");
// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to
// the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client
router.get("/", addSocketIdtoSession, twitterAuth);

// Routes that are triggered by callbacks from OAuth providers once
// the user has authenticated successfully
router.get("/callback", twitterAuth, authController);

module.exports = router;
