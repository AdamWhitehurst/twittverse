const callbackURL = "http://127.0.0.1:8080/twitter/callback";

export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN
  : "http://localhost:3000";

export const TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL
};

export const API_URL = process.env.API_URL;
