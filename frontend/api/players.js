const express = require("express");
const router = express.Router();

const Users = require("../models/users");

router.get("/online", async (req, res, next) => {
  try {
    const result = await Users.find({ logged_in: true }).select("-password");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
