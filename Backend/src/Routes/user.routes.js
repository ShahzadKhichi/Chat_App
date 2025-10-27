import express from "express";
import {
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
userRouter.get("/get-profile", authMiddleware, getProfile);

export default userRouter;
