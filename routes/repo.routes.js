module.exports = app => {
  app.get("/", async (req, res) => {
    res.status(200).send("API Working");
  });

  app.post("/api/github/hook", async (req, res) => {
    console.log(req.body.payload);
    // res.status(200).send("success");
  });
};
