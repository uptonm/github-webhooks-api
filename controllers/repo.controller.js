const RepoUpdate = require("../models/repo-update.model");
const Repo = require("../models/repo.model");

// Root route for API
exports.test = async (req, res) => {
  res.status(200).send("API Working");
};

// Get route for all repos
exports.getRepos = async (req, res) => {
  Repo.find()
    .populate("last_update")
    .exec((err, repos) => {
      if (err) {
        res.writeHead(500, err.message);
      }
      res.send(repos);
    });
};

exports.getRepo = async (req, res) => {
  Repo.findById(req.params.id)
    .populate("last_update")
    .exec((err, repo) => {
      if (err) {
        res.status(500).send(err.message);
      }
      res.send(repo);
    });
};

// Post route for API to service GitHub Repo Webhooks
exports.post = async (req, res) => {
  let payload = req.body;
  let repoUpdate;
  const update_exists = await RepoUpdate.findOne({
    update_id: payload.commits[0].id
  });
  if (update_exists) {
    repoUpdate = update_exists;
  } else {
    repoUpdate = await new RepoUpdate({
      update_id: payload.commits[0].id,
      timestamp: payload.commits[0].timestamp,
      message: payload.commits[0].message,
      url: payload.commits[0].url,
      author: {
        name: payload.commits[0].author.name,
        email: payload.commits[0].author.email,
        username: payload.commits[0].author.username
      },
      changes: {
        added: payload.commits[0].added,
        modified: payload.commits[0].modified,
        removed: payload.commits[0].removed
      }
    }).save();
  }

  const exists = await Repo.findOne({ repo_id: payload.repository.id });
  if (exists) {
    const update = await Repo.findOneAndUpdate(
      { repo_id: exists.repo_id },
      {
        repo_name: payload.repository.name,
        url: payload.repository.url,
        last_update: repoUpdate._id
      }
    );
    return res.status(200).send(update);
  }
  const repo = await new Repo({
    repo_id: payload.repository.id,
    repo_name: payload.repository.name,
    url: payload.repository.url,
    last_update: repoUpdate._id
  }).save();
  return res.status(200).send(repo);
};
