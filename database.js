var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log("Connected to the SQLite Database");
    db.run(
      `CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOiNCREMENT,
            productName TEXT,
            description TEXT,
            category TEXT,
            brand TEXT,
            expireData TEXT,
            manufacturedData TEXT,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createdDate TEXT
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = `
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
        }
      }
    );
  }
});
