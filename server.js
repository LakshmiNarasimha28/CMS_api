import "dotenv/config";
// import dotenv from "dotenv";
// dotenv.config();
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";
import { registerSocketHandlers } from "./sockets/sockets.js";

const PORT = process.env.PORT || 8000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});