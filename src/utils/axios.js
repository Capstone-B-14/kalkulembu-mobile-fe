import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.EXPO_PUBLIC_API_URL,
  // any other default settings you want
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (accessToken && refreshToken) {
      config.headers.Cookie = `accessToken=${accessToken}; refreshToken=${refreshToken}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
