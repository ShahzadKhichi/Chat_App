import axios from "axios";

const BASE_URL = "https://kchat-vydwj0wg.b4a.run/api/v1";

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
    timeout: 1000,
  },
});
