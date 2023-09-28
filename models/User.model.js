// const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    unique: true,
  },
  avatar: {
    type: String,
    default: "/images/icon-avatar.png", // Relative path to image
    name: {
      type: String,
      required: true,
      trim: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    createdAt: { type: Date, default: Date.now },
  },
});

module.exports = model("User", userSchema);
