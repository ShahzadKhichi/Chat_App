import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import {
  getAllMessages,
  sendMessage,
} from "../Controllers/message.controller.js";
const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", authMiddleware, sendMessage);
messageRouter.get("/all/:receiverId", authMiddleware, getAllMessages);

export default messageRouter;
