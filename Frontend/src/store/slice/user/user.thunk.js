import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../components/utilities/AxiosInstance";
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await instance.post("/user/login", {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      console.error(error?.response?.data?.errMessage);
      toast.error(error?.response?.data?.errMessage);
      rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);

export const signupUserThunk = createAsyncThunk(
  "user/signupUserThunk",
  async (
    { fullname, username, password, confirmPassword, gender },
    { rejectWithValue }
  ) => {
    try {
      const res = await instance.post("/user/signup", {
        username,
        fullname,
        password,
        gender,
        confirm: confirmPassword,
      });
      return res.data;
    } catch (error) {
      console.error(error?.response?.data?.errMessage);
      toast.error(error?.response?.data?.errMessage);
      rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);
