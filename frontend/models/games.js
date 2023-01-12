const { Schema, model } = require("mongoose");

const GamesSchema = new Schema(
  {
    lobby: {
      type: Schema.Types.ObjectId,
      ref: "Lobbies",
      required: true,
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    action: {
      type: String,
      default: null,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = model("Games", GamesSchema);
