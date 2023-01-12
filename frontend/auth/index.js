const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const middleware = require("../middlewares");

const Users = require("../models/users");

const router = express.Router();

const defaultLoginError = "Unable to login";
const signInError = "That username is not unique. Please choose another one.";

const createTokenSendResponse = (user, res, next) => {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
    active: user.active,
  };
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1h",
    },
    (err, token) => {
      if (err) {
        res.status(422);
        const error = Error(defaultLoginError);
        next(error);
      } else {
        res.json({ token });
      }
    }
  );
};

const validateUser =
  (defaultErrorMessage = "") =>
  async (req, res, next) => {
    try {
      const checkUser = new Users(req.body);
      await checkUser.validate();
      next();
    } catch (err) {
      const error = defaultErrorMessage ? new Error(defaultErrorMessage) : err;
      res.status(422);
      next(error);
    }
  };

const findUser =
  (defaultLoginError, isError, errorCode = 422) =>
  async (req, res, next) => {
    try {
      const user = await Users.findOne({
        username: req.body.username,
      });
      if (isError(user)) {
        res.status(errorCode);
        next(new Error(defaultLoginError));
      } else {
        req.loggingInUser = user;
        next();
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  };

router.get("/", (req, res) => {
  res.json({
    message: "Hello Auth! 🔐",
  });
});

router.post(
  "/signup",
  validateUser(),
  findUser(signInError, (user) => user, 409),
  async (req, res, next) => {
    try {
      const hashed = await bcrypt.hash(req.body.password, 12);
      const newUser = {
        username: req.body.username,
        password: hashed,
        role: "user",
        active: true,
      };
      const insertedUser = await Users.create(newUser);
      createTokenSendResponse(insertedUser, res, next);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
);

router.post(
  "/login",
  validateUser(defaultLoginError),
  findUser(defaultLoginError, (user) => !(user && user.active)),
  async (req, res, next) => {
    try {
      const result = await bcrypt.compare(
        req.body.password,
        req.loggingInUser.password
      );
      if (result) {
        await Users.findOneAndUpdate(
          { _id: req.loggingInUser._id },
          { logged_in: true }
        );
        createTokenSendResponse(req.loggingInUser, res, next);
      } else {
        res.status(422);
        throw new Error(defaultLoginError);
      }
    } catch (error) {
      res.status(res.statusCode === 200 ? 500 : res.statusCode);
      next(error);
    }
  }
);

router.post("/logout", middleware.isLoggedIn, async (req, res, next) => {
  try {
    const result = await Users.findOneAndUpdate(
      { _id: req.user._id },
      { logged_in: false },
      { new: true }
    ).select("-password");
    res.json(result);
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    next(error);
  }
});

module.exports = router;
