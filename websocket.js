import { WebSocketServer } from "ws";
import { io as Client } from "socket.io-client";
import express from "express";
import http from "http";

const websocketSetup = (port, expressSocketURL) => {
  const app = express();

  // Tambahkan route sederhana untuk HTTP server
  app.get("/", (req, res) => {
    res.send("HTTP and WebSocket server is running");
  });

  // Buat server HTTP menggunakan Express
  const server = http.createServer(app);

  // Buat WebSocket server menggunakan server HTTP
  const wss = new WebSocketServer({ server });
  const expressSocket = Client(expressSocketURL);

  wss.on("connection", (ws) => {
    console.log("New WebSocket connection");

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        // Kirim data ke server Express.js melalui Socket.IO
        expressSocket.emit("sensorData", data);

        ws.send("Message received");
      } catch (error) {
        console.error("Failed to parse message", error);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  // Jalankan server HTTP (termasuk WebSocket)
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

export default websocketSetup;
