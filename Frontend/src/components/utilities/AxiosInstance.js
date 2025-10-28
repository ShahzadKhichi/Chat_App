import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});
