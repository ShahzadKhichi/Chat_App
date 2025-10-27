import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signupUserThunk } from "./user.thunk";
import toast from "react-hot-toast";

const intialState = {
  token: localStorage.getItem("token")
    ? JSON.stringify(localStorage.getItem("token"))
    : null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userProfile: null,
  buttonLoading: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userProfile = action.payload.user;
      state.buttonLoading = false;
      toast.success("Login successfull");
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    builder.addCase(signupUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(signupUserThunk.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.userProfile = action.payload.user;
      state.buttonLoading = false;
      toast.success("signup successfull");
    });
    builder.addCase(signupUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
