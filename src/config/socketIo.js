const { Server } = require("socket.io");

// Simpan referensi server Socket.IO
let io;

const initializeSocketIo = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Atur sesuai kebutuhan CORS
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected with Socket.IO");

    socket.on("message", (msg) => {
      console.log("Received message via Socket.IO:", msg);
      // Mengirim kembali pesan ke klien
      socket.emit("echo", `Echo: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected.");
    });
  });

  return io;
};

// Function untuk broadcast pesan ke semua klien Socket.IO
const broadcastToSocketClients = (event, message) => {
  if (io) {
    io.emit(event, message);
  } else {
    console.error("Socket.IO server is not initialized.");
  }
};

module.exports = { initializeSocketIo, broadcastToSocketClients };
