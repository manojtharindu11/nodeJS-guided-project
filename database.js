var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite Database");
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            brand TEXT NOT NULL,
            expireDate TEXT,
            manufacturedDate TEXT,
            batchNumber INTEGER,
            unitPrice INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            createdDate TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table created or already exists");

          db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
            if (err) {
              console.error("Error checking table:", err.message);
            } else if (row.count === 0) {
              var insert = `
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
              db.run(insert, [
                "White Basmathi Rice",
                "Premium quality Basmathi rice",
                "Grains",
                "Brand A",
                "2025-12-31",
                "2023-01-15",
                123456,
                200,
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
