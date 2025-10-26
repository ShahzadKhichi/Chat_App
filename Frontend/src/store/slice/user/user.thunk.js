import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUserThunk = createAsyncThunk(
  "user/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        thunkAPI.dispatch({ type: "user/login" });
        return data;
      } else {
        return thunkAPI.rejectWithValue(data.message);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
