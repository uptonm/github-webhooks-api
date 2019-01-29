const mongoose = require("mongoose");
const repoUpdateModel = require("./repo-update.model");
const { Schema } = mongoose;

const repoModel = new Schema({
  repo_id: String,
  repo_name: String,
  description: String,
  url: String,
  last_update: repoUpdateModel
});

const Repo = mongoose.model("repos", repoModel);

module.exports = Repo;
