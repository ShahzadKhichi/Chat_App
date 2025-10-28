import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const intialState = {
  socket: null,
  onlineUsers: [],
};
export const socketSlice = createSlice({
  name: "socket",
  initialState: intialState,
  reducers: {
    initializeSocket: (state, action) => {
      state.socket = io("http://localhost:3000", {
        query: { userId: action.payload },
      });
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
