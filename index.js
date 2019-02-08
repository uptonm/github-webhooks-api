const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const path = require("path")
require("dotenv").config();

const app = express();

mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true
  }
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));
app.use(cors());

require("./models/repo-update.model");
require("./models/repo.model");

require("./routes/repo.routes")(app);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(__dirname + "/dist"));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
