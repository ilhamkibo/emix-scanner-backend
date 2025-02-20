const net = require("net");

const TCP_PORT = process.env.TCP_PORT || 4001; // Port untuk timbangan
const TCP_HOST = process.env.TCP_HOST || "192.168.245.95"; // IP timbangan

let tcpClient;

const createTCPClient = (onDataCallback) => {
  tcpClient = new net.Socket();

  tcpClient.connect(TCP_PORT, TCP_HOST, () => {
    console.log(`Connected to TCP server at ${TCP_HOST}:${TCP_PORT}`);
  });

  tcpClient.on("data", (data) => {
    const weightValue = data.toString().trim(); // Parsing data dari timbangan
    if (onDataCallback) {
      onDataCallback(weightValue); // Kirim data berat ke callback
    }
  });

  tcpClient.on("error", (err) => {
    console.error("TCP Client Error:", err.message);
  });

  tcpClient.on("close", () => {
    console.log("TCP connection closed.");
  });

  return tcpClient;
};

module.exports = { createTCPClient, net };
