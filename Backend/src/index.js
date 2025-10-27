import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

import connectDB from "./DB/dbConfig.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorMiddleware } from "./Middlewares/error.middleware.js";

//routers
import userRouter from "./Routes/user.routes.js";
import messageRouter from "./Routes/message.routes.js";
console.log(process.env.CLIENT_URL);
connectDB();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    credentials: true,
  },
});

const socketMap = {};
export { io };
export const getSocketIdByUserId = (userId) => {
  return socketMap[userId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  socketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(socketMap));
  console.log(Object.keys(socketMap));

  socket.on("disconnect", () => {
    delete socketMap[userId];
    console.log(Object.keys(socketMap));
  });
});

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/message", messageRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
