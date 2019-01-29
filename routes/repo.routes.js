const RepoUpdate = require("../models/repo-update.model");
const Repo = require("../models/repo.model");
module.exports = app => {
  app.get("/", async (req, res) => {
    res.status(200).send("API Working");
  });

  app.post("/api/github/hook", async (req, res) => {
    let payload = req.body;
    console.log(payload);
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
  });
};
