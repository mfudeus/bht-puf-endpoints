const express = require("express");
const router = express.Router();

const Users = require("../models/users");

router.get("/", async (req, res, next) => {
  try {
    const result = await Users.findOne({ _id: req.user._id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  // try {
  //   const result = await Users.findOne({ _id: req.user._id });
  //   res.json(result);
  // } catch (error) {
  //   next(error);
  // }
  res.json(req);
});

module.exports = router;
