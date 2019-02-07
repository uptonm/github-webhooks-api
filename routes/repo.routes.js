const actions = require("../controllers/repo.controller");
module.exports = app => {
  app.get("/api/repos", canAccessRoute, actions.getRepos);
  app.get("/api/repos/:id", canAccessRoute ,actions.getRepo);
  app.post("/api/github/hook", actions.post);
};

canAccessRoute = (req, res, next) => {
  if(req.get("Authorization") === process.env.AUTHORIZATION_TOKEN) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}