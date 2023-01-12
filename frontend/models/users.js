const { Schema, model } = require("mongoose");

const UsersSchema = new Schema(
  {
    username: {
      type: String,
      validate: {
        validator: function (v) {
          return /(^[a-zA-Z0-9_]*$)/.test(v);
        },
        message: (props) => `${props.value} is not valid!`,
      },
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    logged_in: {
      type: Boolean,
      default: false,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = model("Users", UsersSchema);
