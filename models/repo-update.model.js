const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const RepoUpdateModel = new Schema({
  update_id: String,
  timestamp: String,
  message: String,
  url: String,
  author: {
    name: String,
    email: String,
    username: String,
    avatar_url: String
  },
  changes: {
    added: Array,
    modified: Array,
    removed: Array
  }
});

const RepoUpdate = mongoose.model("repo_updates", RepoUpdateModel);
module.exports = RepoUpdate;