// const WebSocket = require("ws");

// const createWebSocketServer = (server) => {
//   const wss = new WebSocket.Server({ server });

//   wss.on("connection", (ws) => {
//     console.log("New WebSocket client connected.");
//     ws.on("error", console.error);

//     ws.on("message", function message(data) {
//       console.log("received: %s", data);
//     });

//     ws.on("close", () => {
//       console.log("WebSocket client disconnected.");
//     });

//     ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));
//   });

//   return wss;
// };

// // Fungsi untuk broadcast data ke semua klien WebSocket
// const broadcast = (data) => {
//   if (!wss) return;
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(JSON.stringify(data));
//     }
//   });
// };

// module.exports = { createWebSocketServer, broadcast };

const expressWs = require("express-ws");

// Store WebSocket connections
const websocketClients = [];

// Initialize WebSocket support and routes
const setupWebSocket = (app) => {
  expressWs(app); // Attach WebSocket support to the app

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
};

// Function to broadcast messages to WebSocket clients
const broadcastToWebSocketClients = (message) => {
  websocketClients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

module.exports = { setupWebSocket, broadcastToWebSocketClients };
