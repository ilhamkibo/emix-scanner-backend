const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes/v1/index.js");
const {
  setupWebSocket,
  broadcastToWebSocketClients,
} = require("./config/websocket");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1", router);

// Setup WebSocket
setupWebSocket(app);

module.exports = { app, broadcastToWebSocketClients };
