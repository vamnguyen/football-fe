import axiosInstance from "@/lib/axiosInstance";
import { ChatRoom, PaginatedResponse } from "@/lib/interface";
import { CreateRoomParams, PaginationParams } from "@/lib/types";

export const createRoom = async (
  matchId: string,
  createRoomParams: CreateRoomParams
): Promise<ChatRoom> => {
  const response = await axiosInstance.post(
    `/rooms/${matchId}`,
    createRoomParams
  );
  return response.data;
};

export const getRooms = async (
  paginationDto: PaginationParams
): Promise<PaginatedResponse<ChatRoom>> => {
  const response = await axiosInstance.get("/rooms", {
    params: paginationDto,
  });
  return response.data;
};

export const getRoomById = async (roomId: string): Promise<ChatRoom> => {
  const response = await axiosInstance.get(`/rooms/${roomId}`);
  return response.data;
};
