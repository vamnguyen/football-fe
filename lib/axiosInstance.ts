import axios from "axios";
import { refreshToken } from "@/services/auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 300000, // 5 minutes
});

let refreshTokenPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 410) {
      location.href = "/login";
    }

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .catch(() => {
            location.href = "/login";
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      return refreshTokenPromise.then(() => {
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
