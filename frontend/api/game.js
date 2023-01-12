const express = require("express");
const router = express.Router();

const Games = require("../models/games");

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Games.find({ lobby: req.params.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const newGameAction = {
      player: req.user._id,
      lobby: req.params.id,
      action: req.body.action,
    };
    const insertedGameAction = await Games.create(newGameAction);
    res.json(insertedGameAction);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
