const app = require("./app");
const sequelize = require("./config/database");
const net = require("net");

const DEFAULT_PORT =
  process.env.NODE_ENV === "development"
    ? parseInt(process.env.DEV_PORT, 10) || 3000
    : parseInt(process.env.PROD_PORT, 10) || 8000;

// Fungsi untuk memeriksa ketersediaan port
const checkPortAvailability = (port) =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port sedang digunakan
      } else {
        reject(err); // Kesalahan lain
      }
    });
    server.once("listening", () => {
      server.close(() => resolve(true)); // Port tersedia
    });
    server.listen(port);
  });

// Fungsi untuk mencari port yang tersedia
const findAvailablePort = async (port) => {
  let currentPort = port;
  while (!(await checkPortAvailability(currentPort))) {
    console.log(
      `Port ${currentPort} is in use. Trying port ${currentPort + 1}`
    );
    currentPort += 1; // Coba port berikutnya
  }
  return currentPort;
};

(async () => {
  try {
    // Memeriksa koneksi ke database
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    const port = await findAvailablePort(DEFAULT_PORT);

    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database or start server:", err);
  }
})();
