const mongoose = require("mongoose");
const { Schema } = mongoose;

const repoUpdateModel = new Schema({
  updateid: String,
  timestamp: String,
  message: String,
  url: String,
  author: {
    name: String,
    email: String,
    username: String
  },
  changes: {
    added: Number,
    removed: Number,
    modified: Number
  }
});

module.exports = repoUpdateModel;
