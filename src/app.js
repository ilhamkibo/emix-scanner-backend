const express = require("express");
const expressWs = require("express-ws");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/v1/index.js");

dotenv.config();

const app = express();
expressWs(app); // Initialize WebSocket support

// Middleware
app.use(cors());
app.use(express.json());

// Store WebSocket connections
const websocketClients = [];

// API Routes
app.use("/api/v1", router);

// WebSocket Route
app.ws("/echo", (ws) => {
  console.log("WebSocket connection established.");
  websocketClients.push(ws); // Add to WebSocket clients list

  ws.on("message", (msg) => {
    console.log("Message received:", msg);
    ws.send(`Echo: ${msg}`);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed.");
    // Remove the closed connection from the list
    const index = websocketClients.indexOf(ws);
    if (index > -1) {
      websocketClients.splice(index, 1);
    }
  });
});

// Function to broadcast messages to WebSocket clients
const broadcastToWebSocketClients = (message) => {
  websocketClients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

module.exports = { app, broadcastToWebSocketClients };
