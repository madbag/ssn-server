const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookmarkSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  article: { type: Schema.Types.ObjectId, ref: "Article" },
});

module.exports = model("Bookmark", bookmarkSchema);
