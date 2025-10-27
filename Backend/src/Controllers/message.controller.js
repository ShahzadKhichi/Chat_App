import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import Conversation from "../Models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const senderId = req.userId;
  const receiverId = req.params.receiverId;

  if (!message || !receiverId || !senderId) {
    return next(new errorHandler(400, "All fields are required"));
  }

  let conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = await Message.create({ senderId, receiverId, message });
  conversation.messages.push(newMessage._id);
  await conversation.save();

  //socket.io logic

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    newMessage,
  });
});

export const getAllMessages = asyncHandler(async (req, res, next) => {
  const senderId = req.userId;
  const receiverId = req.params.receiverId;

  if (!receiverId || !senderId) {
    return next(new errorHandler(400, "All fields are required"));
  }

  //add pagination
  const conversation = await Conversation.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  })
    .populate("messages")
    .exec();

  if (!conversation) {
    return res.status(200).json({ messages: [], success: true });
  }

  //socket.io logic

  res.status(201).json({
    success: true,
    messages: conversation.messages,
  });
});
