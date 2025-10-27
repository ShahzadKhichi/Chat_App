import axios from "axios";

const BASE_URL = "https://kchat-vm22w4g5.b4a.run/api/v1";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});
