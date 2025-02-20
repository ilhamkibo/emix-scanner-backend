const { app, broadcastToWebSocketClients } = require("./app");
const sequelize = require("./config/database");
const { net, createTCPClient } = require("./config/tcpClient");

const DEFAULT_PORT =
  process.env.NODE_ENV === "development"
    ? parseInt(process.env.DEV_PORT, 10) || 3000
    : parseInt(process.env.PROD_PORT, 10) || 8000;

// Check Port Availability
const checkPortAvailability = (port) =>
  new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false); // Port is in use
      } else {
        reject(err); // Other error
      }
    });
    server.once("listening", () => {
      server.close(() => resolve(true)); // Port available
    });
    server.listen(port);
  });

// Find Available Port
const findAvailablePort = async (port) => {
  let currentPort = port;
  while (!(await checkPortAvailability(currentPort))) {
    console.log(
      `Port ${currentPort} is in use. Trying port ${currentPort + 1}`
    );
    currentPort += 1; // Try next port
  }
  return currentPort;
};

(async () => {
  try {
    // Database Connection
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    const port = await findAvailablePort(DEFAULT_PORT);

    // TCP Client Setup
    createTCPClient((data) => {
      const weightValue = data.toString().trim();
      const parsedData = weightValue.split("k");
      const parsedWeight = parseFloat(parsedData[0]);

      // console.log("Received weight value:", parsedWeight);

      // Broadcast weight value to WebSocket clients
      broadcastToWebSocketClients(JSON.stringify({ weight: parsedWeight }));
    });

    // Start Server
    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database or start server:", err);
  }
})();
