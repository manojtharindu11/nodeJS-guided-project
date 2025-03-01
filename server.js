var express = require("express");
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");

var app = express();

app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on ${HTTP_PORT}`);
});
