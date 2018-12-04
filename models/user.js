const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User schema
const postSchema = new Schema({
  name: {
    type: String,
    required: false,
    default: ""
  },
  username: {
    type: String,
    required: false,
    default: "defaultusername"
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  loginDate: {
    type: Date,
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  favCategories: {
    type: [{ type: String }],
    required: false
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }]
});

const User = mongoose.model("user", postSchema);
module.exports = User;
