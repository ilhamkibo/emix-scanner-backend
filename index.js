// Sequelize setup
import { Sequelize, Model, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Uncomment this for file-based SQLite
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: process.env.DB_DIALECT,
  }
);

console.log(`Your port is ${process.env.PORT}`); // undefined

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  },
  { sequelize, modelName: "user" }
);

(async () => {
  // Synchronize the database
  await sequelize.sync();

  // Delete all users
  const deleteAllUsers = await User.destroy({
    truncate: true,
  });

  console.log("Deleted all users:", deleteAllUsers);

  // Create a new user
  const jane = await User.create({
    username: "janedoe",
    birthday: new Date(1980, 6, 20),
  });

  // Log created user to the console
  console.log("Created user:", jane.toJSON());
})();
