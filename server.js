var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var User = require("./src/app/routes/User");

app.use("/api", User);

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
