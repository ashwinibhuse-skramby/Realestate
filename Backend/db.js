const { Client } = require("pg");

const db = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "realestate"
});

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch((err) => console.error("DB Connection Error:", err));

module.exports = db;
