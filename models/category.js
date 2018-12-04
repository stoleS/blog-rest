const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Comment schema
const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;
