const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const articlesSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: {type: String, required: true},
  name: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: Schema.Types.ObjectId, ref: "Comment" },
});

module.exports = model("Article", articlesSchema);
