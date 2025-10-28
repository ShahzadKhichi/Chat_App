import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./DB/dbConfig.js";
import { errorMiddleware } from "./Middlewares/error.middleware.js";
import userRouter from "./Routes/user.routes.js";
import messageRouter from "./Routes/message.routes.js";

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// ---------- Socket.IO ----------
const io = new Server(server, {
  cors: {
    origin: "https://k-chats.netlify.app",
    credentials: true,
  },
});

const socketMap = {};
export { io };
export const getSocketIdByUserId = (userId) => socketMap[userId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (!userId) return;

  socketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(socketMap));

  socket.on("disconnect", () => {
    delete socketMap[userId];
    io.emit("onlineUsers", Object.keys(socketMap));
  });
});

// ---------- Express middlewares ----------
app.use(
  cors({
    origin: "https://k-chats.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// ---------- API routes ----------
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);

// ---------- Global error handler ----------
app.use(errorMiddleware);

// ---------- Start ----------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Backend API on port ${PORT}`));
