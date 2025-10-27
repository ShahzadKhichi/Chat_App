import express from "express";
import {
  getOtherUsers,
  getProfile,
  login,
  logout,
  signup,
} from "../Controllers/user.controllers.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", authMiddleware, logout);
userRouter.get("/profile", authMiddleware, getProfile);
userRouter.get("/others", authMiddleware, getOtherUsers);

export default userRouter;
