const actions = require("../controllers/repo.controller");
module.exports = app => {
  app.get("/api/repos", actions.getRepos);
  app.get("/api/repos/:id", actions.getRepo);
  app.post("/api/github/hook", actions.post);
};
