const { Schema, model } = require("mongoose");

const HistoriesSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    win: {
      type: Boolean,
      default: false,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = model("Histories", HistoriesSchema);
