const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();
const middleware = require("./middlewares");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(middleware.checkTokenSetUser);

require("./db/connection")();

const auth = require("./auth");
const admin = require("./api/admin");
const user = require("./api/user");

const players = require("./api/players");
const lobbies = require("./api/lobbies");
const game = require("./api/game");
const histories = require("./api/histories");

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

app.use("/auth", auth);
app.use("/api/v1/admin", middleware.isLoggedIn, middleware.isAdmin, admin);
app.use("/api/v1/user", middleware.isLoggedIn, user);

app.use("/api/v1/players", middleware.isLoggedIn, players);
app.use("/api/v1/lobbies", middleware.isLoggedIn, lobbies);
app.use("/api/v1/game", middleware.isLoggedIn, game);
app.use("/api/v1/histories", middleware.isLoggedIn, histories);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

module.exports = app;
