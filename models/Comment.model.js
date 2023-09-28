const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  name: { type: Schema.Types.ObjectId, ref: "User" },
  article: { type: Schema.Types.ObjectId, ref: "Article", required: true },
  content: { type: String, required: true },
});

module.exports = model("Comment", commentSchema);
