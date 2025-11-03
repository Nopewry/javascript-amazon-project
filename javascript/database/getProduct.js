require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

async function getProducts() {
  await client.connect();
  const result = await client.query('SELECT * FROM products');
  await client.end();
  return result.rows;
}

// ✅ Export it for other files
module.exports = { getProducts };