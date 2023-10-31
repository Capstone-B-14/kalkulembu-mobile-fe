import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // any other default settings you want
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = SecureStore.getItemAsync("accessToken");
    const refreshToken = SecureStore.getItemAsync("refreshToken");

    if (accessToken && refreshToken) {
      config.headers.Cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
