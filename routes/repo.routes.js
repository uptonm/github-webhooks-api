const RepoUpdate = require("../models/repo-update.model");
const Repo = require("../models/repo.model");
module.exports = app => {
  app.get("/", async (req, res) => {
    res.status(200).send("API Working");
  });

  app.post("/api/github/hook", async (req, res) => {
    let repoUpdate;
    const update_exists = await RepoUpdate.findOne({
      update_id: req.body.commits[0].id
    });
    if (update_exists) {
      repoUpdate = update_exists;
    } else {
      repoUpdate = await new RepoUpdate({
        update_id: req.body.commits[0].id,
        timestamp: req.body.commits[0].timestamp,
        message: req.body.commits[0].message,
        url: req.body.commits[0].url,
        author: {
          name: req.body.commits[0].author.name,
          email: req.body.commits[0].author.email,
          username: req.body.commits[0].author.username
        },
        changes: {
          added: req.body.commits[0].added,
          modified: req.body.commits[0].modified,
          removed: req.body.commits[0].removed
        }
      }).save();
    }

    const exists = await Repo.findOne({ repo_id: req.body.repository.id });
    if (exists) {
      const update = await Repo.findOneAndUpdate(
        { repo_id: exists.repo_id },
        {
          repo_name: req.body.repository.name,
          url: req.body.repository.url,
          last_update: repoUpdate._id
        }
      );
      return res.status(200).send(update);
    }
    const repo = await new Repo({
      repo_id: req.body.repository.id,
      repo_name: req.body.repository.name,
      url: req.body.repository.url,
      last_update: repoUpdate._id
    }).save();
    return res.status(200).send(repo);
  });
};
