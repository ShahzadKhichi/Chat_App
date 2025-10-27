import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new errorHandler(401, "Unauthorized: No token provided"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new errorHandler(401, "Unauthorized: Invalid token"));
  }

  req.userId = decoded.id;

  next();
});
