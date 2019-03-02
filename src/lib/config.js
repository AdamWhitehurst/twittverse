export const PORT = 8080;
export const CALLBACK_URL = `http://127.0.0.1:${PORT}/twitter/callback`;
export const API_URL = `http://127.0.0.1:${PORT}`;

export const TWITTER_CONFIG = {
  consumerKey: TWITTER_KEY,
  consumerSecret: TWITTER_SECRET,
  callbackURL: CALLBACK_URL
};
