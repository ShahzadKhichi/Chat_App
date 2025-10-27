import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../components/utilities/AxiosInstance";
import toast from "react-hot-toast";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async ({ token, receiverId, message }, { rejectWithValue }) => {
    try {
      const res = await instance.post(
        `/message/send/${receiverId}`,
        {
          message,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error?.response?.data?.errMessage);
      toast.error(error?.response?.data?.errMessage);
      rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);

export const getMessagesThunk = createAsyncThunk(
  "message/getMessagesThunk",
  async ({ token, receiverId }, { rejectWithValue }) => {
    try {
      const res = await instance.get(
        `/message/all/${receiverId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error?.response?.data?.errMessage);
      toast.error(error?.response?.data?.errMessage);
      rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);
