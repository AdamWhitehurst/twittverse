const http = require("http");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const socketio = require("socket.io");
const authRouter = require("./auth.router");
const passportInit = require("./passport.init");
const { SESSION_SECRET } = require("./config");
const express = require("express");

const exp = express();
const server = http.createServer(exp);

exp.use(express.json());
exp.use(passport.initialize());
passportInit();

exp.use(
  cors({
    origin: "http://localhost:3000"
  })
);

exp.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

const io = socketio(server);
exp.set("io", io);

exp.use("/twitter", authRouter);

server.listen(8080).on("error", err => {
  if (err.code == "EADDRINUSE") console.log("Server already running");
  else console.log(err);
});
