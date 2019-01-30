const mongoose = require("mongoose");
const {
  Schema
} = mongoose;

const repoModel = new Schema({
  repo_id: String,
  repo_name: String,
  description: String,
  url: String,
  language: String,
  last_update: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "repo_updates"
  }
});

const Repo = mongoose.model("repos", repoModel);

module.exports = Repo;