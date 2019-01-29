const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send("API Working");
});

app.post("/api/github/hook", async (req, res) => {
  console.log(req.body.payload);
  res.status(200).send("success");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
