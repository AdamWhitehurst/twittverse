const dotenv = require("dotenv");
const env = dotenv.config({ path: "./src/lib/.env" });
const http = require("http");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const socketio = require("socket.io");
const authRouter = require("./auth.router");
const passportInit = require("./passport.init");
const { CLIENT_ORIGIN } = require("./config");
const express = require("express");
const exp = express();
const server = http.createServer(exp);

exp.use(express.json());
exp.use(passport.initialize());
passportInit();

exp.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

exp.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const io = socketio(server);
exp.set("io", io);

exp.use("/twitter", authRouter);

server.listen(process.env.PORT || 8080, () => {
  console.log("tuning into 8080!");
});
