const { Schema, model } = require("mongoose");

const LobbiesSchema = new Schema(
  {
    name: {
      type: String,
      default: "Meine Lobby",
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = model("Lobbies", LobbiesSchema);
