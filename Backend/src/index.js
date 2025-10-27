import dotenv from "dotenv";
dotenv.config();

import connectDB from "./DB/dbConfig.js";

import express from "express";
import userRouter from "./Routes/user.routes.js";
import { errorMiddleware } from "./Middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
