var express = require("express");
var db = require("./database.js");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server is running on ${HTTP_PORT}`);
});

app.post("/api/customers", (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const creditCardRegex = /^\d{13,19}$/;

  try {
    var errors = [];

    if (!req.body) {
      errors.push("An invalid input");
    }

    const {
      name,
      address,
      email,
      dateOfBirth,
      gender,
      age,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      timeStamp,
    } = req.body;

    if (!emailRegex.test(email)) {
      errors.push("Email is not valid");
    }

    cardNumber = cardNumber.replace(/\D/g, "");
    if (!creditCardRegex.test(cardNumber)) {
      errors.push("Credit card is not valid");
    }

    if (errors.length > 0) {
      res.status(400).json({ error: errors });
      return;
    }

    var sql = `
            INSERT INTO customers (
              name,
              address,
              email,
              dateOfBirth,
              gender,
              age,
              cardHolderName,
              cardNumber,
              expiryDate,
              cvv,
              timeStamp
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
          `;

    var params = [
      name,
      address,
      email,
      dateOfBirth,
      gender,
      age,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      timeStamp,
    ];

    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      } else {
        res.status(201).json({
          message: `customer ${name} has registered`,
          id: this.lastID,
        });
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/api/customers/", (req, res) => {
  try {
    db.all("SELECT * FROM customers", function (err, row) {
      if (err) {
        res.status(400).json({ error: err.message });
      }

      res.status(200).json({ message: "Success", data: row });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
