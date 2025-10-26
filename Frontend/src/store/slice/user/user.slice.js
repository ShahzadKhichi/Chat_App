import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

const intialState = {
  token: localStorage.getItem("token")
    ? JSON.stringify(localStorage.getItem("token"))
    : null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
};
export const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.entities.push(action.payload);
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
