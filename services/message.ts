import axiosInstance from "@/lib/axiosInstance";
import { Message } from "@/lib/interface";
import { CreateMessageParams } from "@/lib/types";

export const createMessage = async (
  roomId: string,
  createMessageParams: CreateMessageParams
): Promise<Message> => {
  const response = await axiosInstance.post(
    `/messages/${roomId}`,
    createMessageParams
  );
  return response.data;
};

export const getRoomMessages = async (roomId: string): Promise<Message[]> => {
  const response = await axiosInstance.get(`/messages/room/${roomId}`);
  return response.data;
};
