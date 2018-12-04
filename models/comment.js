const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Comment schema
const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false,
    default: "anonymous"
  },
  createDate: {
    type: String,
    required: false,
    default: Date.now
  }
});

const Comment = mongoose.model("comment", postSchema);
module.exports = Comment;
