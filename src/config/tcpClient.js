const net = require("net");

const TCP_PORT = process.env.TCP_PORT || 4001; // Port untuk timbangan
const TCP_HOST = process.env.TCP_HOST || "192.168.245.95"; // IP timbangan
const RECONNECT_INTERVAL = 5000; // Interval reconnect dalam milidetik

let tcpClient;

const createTCPClient = (onDataCallback) => {
  const connectToServer = () => {
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
      console.log("TCP connection closed. Attempting to reconnect...");
      setTimeout(connectToServer, RECONNECT_INTERVAL); // Coba reconnect
    });
  };

  connectToServer(); // Inisialisasi koneksi pertama kali
  return tcpClient;
};

module.exports = { createTCPClient, net };
