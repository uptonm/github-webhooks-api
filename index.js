const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

mongoose.connect(
  process.env.DB_URI, {
    useNewUrlParser: true
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan("dev"));
app.use(cors());

require("./models/repo-update.model");
require("./models/repo.model");

require("./routes/repo.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});