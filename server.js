var express = require("express");
var db = require("./database.js");
var bodyParser = require("body-parser");

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
      expireDate,
      manufacturedDate,
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
                expireDate,
                manufacturedDate,
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
      expireDate,
      manufacturedDate,
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

app.get("/api/products", (req, res) => {
  var sql = "SELECT * FROM products";
  var params = [];

  db.all(sql, params, (err, rows) => {
    try {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        res.json({
          data: rows,
          message: "success",
        });
      }
    } catch (err) {
      res.send(400).send(err);
    }
  });
});

app.put("/api/products/", (req, res, next) => {
  const {
    id,
    productName,
    description,
    category,
    brand,
    expireDate,
    manufacturedDate,
    batchNumber,
    unitPrice,
    quantity,
    createdDate,
  } = req.body;

  db.run(
    `UPDATE products SET 
        productName = ?, 
        description = ?, 
        category = ?, 
        brand = ?,
        expireDate = ?,
        manufacturedDate = ?,
        batchNumber = ?,
        unitPrice = ?,
        quantity = ?,
        createdDate = ?
    WHERE id = ?`,
    [
      productName,
      description,
      category,
      brand,
      expireDate,
      manufacturedDate,
      batchNumber,
      unitPrice,
      quantity,
      createdDate,
      id,
    ],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        res.status(200).json({ updated: this.changes });
      }
    }
  );
});

app.delete("/api/products/:id", (req, res, next) => {
  try {
    db.run(
      "DELETE FROM products WHERE id = ?",
      req.params.id,
      function (err, result) {
        if (err) {
          res.status(400).json({ error: err, message });
          return;
        } else {
          res.json({ message: "deleted", rows: this.changes });
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
});
