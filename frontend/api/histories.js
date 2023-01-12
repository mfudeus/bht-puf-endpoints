const express = require("express");
const router = express.Router();

const Histories = require("../models/histories");

router.get("/", async (req, res, next) => {
  try {
    const result = await Histories.findOne({ user: req.user._id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const result = await Histories.find({}).populate("user", "-password");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newHistory = {
      user: req.user._id,
      win: req.body.win,
      points: req.body.points,
    };
    const insertedHistory = await Histories.create(newHistory);
    res.json(insertedHistory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
