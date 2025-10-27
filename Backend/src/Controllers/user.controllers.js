import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";

export const signup = asyncHandler(async (req, res, next) => {
  const { fullname, username, gender, password, confirm } = req.body;
  if (!fullname || !username || !gender || !password || confirm !== password) {
    return next(new errorHandler(400, "All fields are required"));
  }

  const existingUser = await User.findOne({ $or: [{ username }] });
  if (existingUser) {
    return next(new errorHandler(400, "User already exist"));
  }

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar =
    "https://avatar.iran.liara.run/public/" +
    avatarType +
    "?username=" +
    username +
    ".png";
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    username,
    avatar,
    gender,
    password: hashedPassword,
  });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new errorHandler(400, "All fields are required"));
  }

  const user = await User.findOne({ username });
  if (!user) {
    return next(new errorHandler(404, "User not found"));
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new errorHandler(401, "Invalid credentials"));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ success: true, message: "Login successful", token, user });
});

export const logout = asyncHandler(async (req, res) => {
  res.status(200).cookie("token", "", { maxAge: Date.now() }).json({
    success: true,
    message: "Logout successfull",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return next(new errorHandler(404, "User not found"));
  }

  res.status(200).json({ success: true, user });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const users = await User.find({ _id: { $ne: userId } }).select("-password");
  res.status(200).json({ success: true, users });
});
