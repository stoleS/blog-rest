const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false,
    default: "anonymous"
  },
  comments: { type: Schema.Types.ObjectId, ref: "comment" },
  createDate: {
    type: Date,
    required: false,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
