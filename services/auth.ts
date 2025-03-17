import axiosInstance from "@/lib/axiosInstance";
import { SignInSchemaType, SignUpSchemaType } from "@/lib/validation";

export const signIn = async (data: SignInSchemaType) => {
  return await axiosInstance.post("/auth/login", data);
};

export const signUp = async (data: SignUpSchemaType) => {
  return await axiosInstance.post("/auth/sign-up", data);
};

export const logout = async () => {
  return await axiosInstance.post("/auth/logout");
};

export const refreshToken = async () => {
  return await axiosInstance.post("/auth/refresh-token");
};
