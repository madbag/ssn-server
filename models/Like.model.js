const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  });

  
module.exports = model("Like", likeSchema);