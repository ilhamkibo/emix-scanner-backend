import app from "./app.js";
import sequelize from "./config/database.js"; // Mengimpor instance sequelize

const PORT =
  process.env.APP_ENV === "development"
    ? process.env.DEV_PORT
    : process.env.PROD_PORT;

// Memeriksa koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");

    // Menyinkronkan model dengan database
    sequelize
      .sync()
      .then(() => {
        console.log("Database synced successfully.");
        // Mulai server setelah sync selesai
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch((err) => {
        console.error("Error syncing database:", err);
      });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
