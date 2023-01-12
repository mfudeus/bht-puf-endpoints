const express = require("express");
const router = express.Router();

const Lobbies = require("../models/lobbies");

router.get("/", async (req, res, next) => {
  try {
    const result = await Lobbies.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newLobby = {
      name: req.body.name,
    };
    const insertedLobby = await Lobbies.create(newLobby);
    res.json(insertedLobby);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
