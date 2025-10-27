import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user/user.slice.js";
import messageReducer from "../message/message.slice.js";
import socketReducer from "./socket.slice.js";

export const store = configureStore({
  reducer: { userReducer, messageReducer, socketReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
