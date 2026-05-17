import axios from "axios";
import { BASE_URL } from "./apipath.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      if (
        error.response.status === 401 &&
        window.location.pathname !== "/login"
      ) {
        localStorage.removeItem("token");
        window.location.replace("/login");
      }

      if (error.response.status === 500) {
        console.log("Server error occurred");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
