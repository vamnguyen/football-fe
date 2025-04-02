import axiosInstance from "@/lib/axiosInstance";
import { Message } from "@/lib/interface";
import { CreateMessageParams } from "@/lib/types";

export const createMessage = async (
  roomId: string,
  createMessageParams: CreateMessageParams
): Promise<void> => {
  await axiosInstance.post(`/messages/${roomId}`, createMessageParams);
};

export const editMessage = async (
  roomId: string,
  messageId: string,
  content: string
): Promise<void> => {
  await axiosInstance.patch(`/messages/room/${roomId}/${messageId}`, {
    content,
  });
};

export const deleteMessage = async (
  roomId: string,
  messageId: string
): Promise<void> => {
  await axiosInstance.delete(`/messages/room/${roomId}/${messageId}`);
};

export const getRoomMessages = async (roomId: string): Promise<Message[]> => {
  const response = await axiosInstance.get(`/messages/room/${roomId}`);
  return response.data;
};
