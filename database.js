var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite Database");
    db.run(
      `CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            email TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT NOT NULL,
            cardNumber TEXT NOT NULL,
            expiryDate TEXT NOT NULL,
            cvv INTEGER NOT NULL,
            timeStamp TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table created or already exists");

          db.get("SELECT COUNT(*) as count FROM customers", (err, row) => {
            if (err) {
              console.error("Error checking table:", err.message);
            } else if (row.count === 0) {
              var insert = `
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
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `;
              db.run(insert, [
                "Kasun Perera",
                "No. 25, Galle Road, Colombo 03",
                "kasun.perera@example.com",
                "1995-08-15",
                "Male",
                28,
                "K. Perera",
                "4539 1234 5678 9012",
                "2026-11",
                50,
                new Date().toISOString().split("T")[0],
              ]);
              console.log("Inserted sample data");
            }
          });
        }
      }
    );
  }
});

module.exports = db;
