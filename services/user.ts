import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/lib/interface";

export const updateProfile = async (data: Partial<User>) => {
  const response = await axiosInstance.patch("/users/update", data);
  return response.data;
};
