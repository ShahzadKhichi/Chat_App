import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  getUserProfieThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "./user.thunk";
import toast from "react-hot-toast";

const intialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  userProfile: null,
  otherUsers: [],
  buttonLoading: false,
  selectedUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    //login thunk
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
    //signup thunk
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

    //logout thunk

    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.userProfile = null;
      (state.selectedUser = null), (state.otherUsers = []);
      state.buttonLoading = false;
      toast.success("logout successfull");
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
    //get profile thunk
    builder.addCase(getUserProfieThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getUserProfieThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.user;
      state.buttonLoading = false;
    });
    builder.addCase(getUserProfieThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //get other users thunk

    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsers = action.payload.users;
      state.buttonLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
