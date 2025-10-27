import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const intialState = {
  socket: null,
};
export const socketSlice = createSlice({
  name: "socket",
  initialState: intialState,
  reducers: {
    initializeSocket: (state, action) => {
      state.socket = io(import.meta.env.VITE_BASE_URL_SOCKET);
    },
  },
});

export const { initializeSocket } = socketSlice.actions;
export default socketSlice.reducer;
