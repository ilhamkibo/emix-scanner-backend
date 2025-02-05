import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";
import bcrypt from "bcrypt"; // Make sure bcrypt is imported

dotenv.config();

// Sequelize setup for database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: process.env.DB_DIALECT, // e.g., 'mysql', 'postgres', etc.
  }
);

// Define User model
class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: "User",
  }
);

// Async function to handle database operations
(async () => {
  try {
    // Synchronize the database (creates tables if not exist)
    await sequelize.sync();

    // Delete all users (if you need to truncate the table)
    const deleteAllUsers = await User.destroy({
      truncate: true,
    });

    console.log("Deleted all users:", deleteAllUsers);

    // Create a new user
    const jane = await User.create({
      firstName: "janedoe",
      lastName: "jane",
      email: "jane@doe",
      password: bcrypt.hashSync("password", 10),
    });

    console.log("Created user:", jane.toJSON());
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the Sequelize connection after operations
    await sequelize.close();
  }
})();
