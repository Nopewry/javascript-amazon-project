// import { products } from "../data/products.js";

const { products } = require("../../data/products.js");

require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

// client.connect()
//   .then(() => console.log('✅ Connected to PostgreSQL!'))
//   .catch(err => console.error('❌ Connection error', err.stack));

async function insertProduct() {
  try {
    await client.connect();

    const query = `
      INSERT INTO products (id, image, name, rating_stars, rating_counts, price_cents)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO NOTHING
    `;

    for (const product of products) {
      await client.query(query, [
        product.id,
        product.image,
        product.name,
        product.rating.stars,
        product.rating.count,
        product.priceCents,
      ]);
    }
  } catch (error) {
    console.error("❌ Error inserting product", error.message);
  } finally {
    await client.end();
  }
}

insertProduct();
