require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }  // Render DB requires SSL
});

client.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("DB Connection Error:", err));

module.exports = client;
