const WebSocket = require("ws");

const createWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("New WebSocket client connected.");
    ws.on("error", console.error);

    ws.on("message", function message(data) {
      console.log("received: %s", data);
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected.");
    });

    ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));
  });

  return wss;
};

// Fungsi untuk broadcast data ke semua klien WebSocket
const broadcast = (data) => {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { createWebSocketServer, broadcast };
