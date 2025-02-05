import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Uncomment this for file-based SQLite
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export default sequelize;
