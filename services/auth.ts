import axiosInstance from "@/lib/axiosInstance";
import { SignInSchemaType, SignUpSchemaType } from "@/lib/validation";
import { User } from "@/lib/interface";

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

export const getMe = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const updateProfile = async (data: {
  firstName?: string | null;
  lastName?: string | null;
  favoriteTeam?: string | null;
}) => {
  const response = await axiosInstance.patch("/auth/profile", data);
  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await axiosInstance.patch("/auth/password", data);
  return response.data;
};
