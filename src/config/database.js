const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Uncomment this for file-based SQLite
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: console.log, // Atau false jika tidak ingin logging
  }
);

module.exports = sequelize;
