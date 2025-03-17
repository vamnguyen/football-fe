import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { refreshToken } from "@/services/auth";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 300000, // 5 minutes
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      location.href = "/sign-in";
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request này đã được thử retry
      if (!refreshTokenPromise) {
        // Tạo promise refresh token nếu chưa có
        refreshTokenPromise = refreshToken()
          .then((res) => {
            // Trích xuất access token mới từ response
            return res.data?.accessToken;
          })
          .catch(() => {
            // Nếu refresh token thất bại, chuyển hướng về trang login
            location.href = "/sign-in";
          })
          .finally(() => {
            // Reset promise để lần sau có thể refresh token lại
            refreshTokenPromise = null;
          });
      }

      // Đợi promise refresh token hoàn thành, sau đó retry lại request gốc
      return refreshTokenPromise.then(() => {
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
