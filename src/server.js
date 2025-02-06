const app = require("./app");
const sequelize = require("./config/database");

const PORT =
  process.env.NODE_ENV === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

// Memeriksa koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
