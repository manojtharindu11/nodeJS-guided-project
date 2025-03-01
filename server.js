var express = require("express");
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");
const send = require("send");

var app = express();

app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on ${HTTP_PORT}`);
});

app.post("/api/products", (req, res, next) => {
  try {
    var errors = [];

    if (!req.body) {
      errors.push("An invalid input");
    }

    const {
      productName,
      description,
      category,
      brand,
      expireData,
      manufacturedData,
      batchNumber,
      unitPrice,
      quantity,
      createdDate,
    } = req.body;

    var sql = `
            INSERT INTO products (
                productName,
                description,
                category,
                brand,
                expireData,
                manufacturedData,
                batchNumber,
                unitPrice,
                quantity,
                createdDate
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
    var params = [
      productName,
      description,
      category,
      brand,
      expireData,
      manufacturedData,
      batchNumber,
      unitPrice,
      quantity,
      createdDate,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        res.json({
          message: "Success",
          data: req.body,
          id: this.lastID,
        });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
