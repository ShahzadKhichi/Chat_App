import { createSlice } from "@reduxjs/toolkit";

import { getMessagesThunk, sendMessageThunk } from "./message.thunk";

const intialState = {
  messages: [],
};
export const messageSlice = createSlice({
  name: "message",
  initialState: intialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    //send messege thunk
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages.push(action.payload.newMessage);
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //get All message of conversation
    builder.addCase(getMessagesThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = action.payload.messages;
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { addNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
