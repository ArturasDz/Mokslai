const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

const testConnection = async () => {
  try {
    await sql`SELECT 1 AS result`;
    console.log("Connection to database is successfull");
    
  } catch (error) {
    console.log("Connection to database failed:", error.message);
    throw error; //re-throw the error to handle it in the server file
  }
};


// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     role VARCHAR(50) NOT NULL DEFAULT 'patient'
// );

// CREATE TABLE appointments (
//     id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users(id),
//     pet_name VARCHAR(255) NOT NULL,
//     date DATE NOT NULL,
//     time TIME NOT NULL,
//     notes TEXT,
//     status VARCHAR(50) DEFAULT 'pending',
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );



module.exports = { sql, testConnection };
